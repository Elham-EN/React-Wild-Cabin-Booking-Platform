import ReservationCard from "@/app/_components/ReservationCard";
import { getBookings } from "@/app/_libs/api-service";
import { auth } from "@/app/_libs/auth";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Reservations",
};

/**
 * Reservations page that displays a user's bookings
 * Fully responsive to work well with the ReservationCard component
 */
export default async function Page(): Promise<React.ReactElement> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error(
      "Cannot access this reservation page if you are not logged in"
    );
  }
  const bookings = await getBookings(session?.user?.id);
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 sm:mb-7">
        Your reservations
      </h2>
      {bookings.length === 0 ? (
        <div className="bg-primary-950 p-6 rounded-sm">
          <p className="text-base sm:text-lg mb-4">
            You have no reservations yet. Check out our luxury cabins to book
            your next getaway.
          </p>
          <Link
            className="inline-block bg-accent-500 text-primary-800 font-semibold px-4 py-2 rounded-sm hover:bg-accent-600 transition-colors"
            href="/cabins"
          >
            Explore cabins &rarr;
          </Link>
        </div>
      ) : (
        <ul className="space-y-4 sm:space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
