/**
 * API Service Module
 *
 * This module provides functions for interacting with external APIs and database services.
 * It centralizes all data fetching operations for consistency and easier maintenance.
 */

import { supabase } from "@/app/_libs/supabase";
import { notFound } from "next/navigation";
import { Cabin } from "@/app/_types/Cabin";
import { Country } from "@/app/_types/Country";
import { Setting } from "@/app/_types/Setting";
import { Booking } from "../_types/Booking";
import { eachDayOfInterval } from "date-fns";
import { CreateGuest, Guest } from "../_types/Guest";

/**
 * Fetches all cabins from the database
 *
 * @returns {Promise<Cabin[]>} A promise that resolves to an array of cabin objects
 * @throws {Error} If cabins cannot be loaded from the database
 *
 * Details:
 * - Selects only necessary fields for cabin listings (id, name, capacity, pricing, and image)
 * - Orders results alphabetically by cabin name
 * - Returns typed data as Cabin[] for better type safety throughout the application
 */
export const getCabins = async (): Promise<Cabin[]> => {
  // Query the cabins table with selected fields and ordering
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  // Handle error case with appropriate error message
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  // Cast and return the data with proper typing
  const cabinsData = data as Cabin[];
  return cabinsData;
};

/**
 * Fetches a single cabin by its ID
 *
 * @param {string} id - The unique identifier of the cabin to fetch
 * @returns {Promise<Cabin>} A promise that resolves to a single cabin object
 * @throws {notFound} Triggers Next.js 404 page if cabin with given ID doesn't exist
 *
 * Details:
 * - Selects all cabin properties (using *)
 * - Uses the .single() method to expect exactly one result
 * - Redirects to 404 page if cabin is not found, using Next.js notFound() function
 */
export const getCabin = async (id: string): Promise<Cabin> => {
  // Query the cabins table for a single cabin matching the provided ID
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // If cabin not found or any error occurs, trigger 404 not found page
  if (error) {
    console.log(error);
    notFound();
  }

  // Cast and return the data with proper typing
  const cabinData = data as Cabin;
  return cabinData;
};

/**
 * Fetches country data from an external REST API
 *
 * @returns {Promise<Country[]>} A promise that resolves to an array of country objects
 * @throws {Error} If countries cannot be fetched from the external API
 *
 * Details:
 * - Uses the REST Countries API (https://restcountries.com)
 * - Requests only necessary fields (name, flag) to minimize payload size
 * - Results are typed as Country[] for type safety
 */
export const getCountries = async (): Promise<Country[]> => {
  try {
    // Make a GET request to the REST Countries API, requesting only needed fields
    const res = await fetch(
      `https://restcountries.com/v3.1/all?fields=name,flag,`
    );

    // Parse JSON response and cast to Country type
    const countries = (await res.json()) as Country[];
    return countries;
  } catch {
    // Provide a user-friendly error message if the fetch fails
    throw new Error("Could not fetch countries");
  }
};

/**
 * Fetch settings from the database
 *
 */
export const getSettings = async (): Promise<Setting> => {
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) {
    console.log(error);
    throw new Error("Settings could not be loaded");
  }
  const settingsData = data as Setting;
  return settingsData;
};

/**
 * Fetch list of dates booked on that cabin for that time period
 *
 */
export const getBookedDatesByCabinId = async (
  cabinId: string
): Promise<Date[]> => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const strToday = today.toISOString();

  // Get all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${strToday},status.eq.checked-in`);

  if (error) {
    console.log(error);
    throw new Error("bookings could not be loaded");
  }

  const bookings = data as Booking[];

  // Converting to actual datas to be displaed in the date picker
  const bookedDates = bookings
    .map((booking) => {
      // generates an array of all dates within a given time period
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat(); // "flattens" this into one single array:

  return bookedDates;
};

export const getGuest = async (email: string): Promise<Guest> => {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here. We handle the possibility of no guest
  // in the sign in callback
  const guestData = data as Guest;
  return guestData;
};

export const createGuest = async (newGuest: CreateGuest) => {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  const guestData = data as unknown as Guest;
  return guestData;
};
