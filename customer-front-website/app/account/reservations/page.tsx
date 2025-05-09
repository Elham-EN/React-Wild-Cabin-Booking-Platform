import ReservationCard from "@/app/_components/ReservationCard";
import { dummyBookings } from "@/app/_data/dummiesData";
// import { Booking } from "@/app/_types/Booking";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Reservations",
};

export default function Page(): React.ReactElement {
  //   const bookings: Booking[] = [];
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      {dummyBookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {dummyBookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
