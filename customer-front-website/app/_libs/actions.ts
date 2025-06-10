"use server";

import { revalidatePath } from "next/cache";
import { UpdatedGuest } from "../_types/Guest";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./api-service";
import { CreateBooking, UpdateBooking } from "../_types/Booking";
import { redirect } from "next/navigation";

export async function signInAction(): Promise<void> {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("You must be logged In");

  const countryNameWithFlag = formData.get("nationality") as string;
  const nationalID = formData.get("nationalID") as string;
  const guestId = formData.get("guestId") as string;
  const [nationality, countryFlag] = countryNameWithFlag.split("%");

  // validating a national ID with alphanumeric characters between 6-12 characters:
  const nationalIdRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!nationalIdRegex.test(nationalID)) {
    throw new Error("Only alphanumeric characters (A-Z, a-z, 0-9) are allowed");
  }

  const updatedData: UpdatedGuest = {
    nationality,
    nationalID,
    countryFlag,
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  // Clear the old cache & refetch the data
  revalidatePath("/account/profile");
}

export const deleteReservation = async (bookingId: string): Promise<void> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("You must be logged In");
  const guestBookings = await getBookings(session.user?.id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  // Only allowing this guest to delete their own reservations
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allow to delete this booking");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
};

export const updateReservationAction = async (
  formData: FormData
): Promise<void> => {
  const bookingId = formData.get("bookingId") as string;
  const numGuests = Number(formData.get("numGuests"));
  const observations = (formData.get("observations") as string).slice(0, 1000);

  const updatedBooking: UpdateBooking = {
    numGuests,
    observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedBooking)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/${bookingId}`);

  redirect("/account/reservations");
};

export const createReservation = async (formData: FormData): Promise<void> => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("You must be logged in");

  // Extract values from FormData
  const cabinId = formData.get("cabinId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const numNights = Number(formData.get("numNights"));
  const cabinPrice = Number(formData.get("cabinPrice"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations") as string;

  const newBookingData: CreateBooking = {
    cabinId,
    startDate,
    endDate,
    numNights,
    cabinPrice,
    numGuests,
    observations,
    guestId: session.user.id,
    extrasPrice: 0,
    totalPrice: cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBookingData]);

  if (error) {
    console.error("Supabase error details:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error details:", error.details);
    console.error("Error hint:", error.hint);
    throw new Error(`Booking could not be created: ${error.message}`);
  }

  revalidatePath("/cabins");
  revalidatePath(`/cabins/${cabinId}`);
};
