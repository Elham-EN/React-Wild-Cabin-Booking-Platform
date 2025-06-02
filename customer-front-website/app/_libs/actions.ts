"use server";

import { revalidatePath } from "next/cache";
import { UpdatedGuest } from "../_types/Guest";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./api-service";

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
