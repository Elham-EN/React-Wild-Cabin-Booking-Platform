import React from "react";
import Image from "next/image";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Booking } from "@/app/_types/Booking";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

interface ReservationCardProps {
  booking: Booking;
}

/**
 * ReservationCard component displays a booking with cabin image, details, and action buttons.
 * Fully responsive across all device sizes.
 */
function ReservationCard({
  booking,
}: ReservationCardProps): React.ReactElement {
  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 rounded-sm overflow-hidden shadow-sm">
      {/* Cabin image - full width on mobile, fixed width on tablet/desktop */}
      <div className="relative w-full sm:w-auto">
        <Image
          src={booking.cabins.image}
          alt={`Cabin ${booking.cabins.name}`}
          width={300}
          height={300}
          className="w-full h-48 sm:h-auto sm:w-[200px] md:w-[300px] object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      {/* Booking details - grows to fill available space */}
      <div className="flex flex-col flex-grow px-4 sm:px-6 py-3 space-y-2 sm:space-y-1">
        {/* Header with booking title and status */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg sm:text-xl font-semibold">
            {booking.numNights} nights in Cabin {booking.cabins.name}
          </h3>
          {isPast(new Date(booking.startDate)) ? (
            <span
              className="bg-yellow-800 text-yellow-200 h-7 px-3 
                uppercase text-xs font-bold flex items-center rounded-sm"
            >
              past
            </span>
          ) : (
            <span
              className="bg-green-800 text-green-200 h-7 px-3 
                uppercase text-xs font-bold flex items-center rounded-sm"
            >
              upcoming
            </span>
          )}
        </div>

        {/* Booking dates */}
        <p className="text-base sm:text-lg text-primary-300">
          {format(new Date(booking.startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(booking.startDate))
            ? "Today"
            : formatDistanceFromNow(booking.startDate)}
          ) &mdash; {format(new Date(booking.endDate), "EEE, MMM dd yyyy")}
        </p>

        {/* Booking details and creation date */}
        <div className="flex flex-wrap gap-2 sm:gap-5 mt-1 sm:mt-auto items-baseline">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">
            ${booking.totalPrice}
          </p>
          <p className="text-primary-300 hidden sm:block">&bull;</p>
          <p className="text-base sm:text-lg text-primary-300">
            {booking.numGuests} guest{booking.numGuests > 1 && "s"}
          </p>
          <p className="w-full sm:w-auto sm:ml-auto text-xs sm:text-sm text-primary-400">
            Booked {format(new Date(booking.created_at), "MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Action buttons - fixed width on desktop, full width on mobile */}
      <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800 sm:w-[100px]">
        {!isPast(booking.startDate) ? (
          <>
            {" "}
            <Link
              href={`/account/reservations/edit/${booking.id}`}
              className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 sm:border-b border-primary-800 flex-grow px-3 py-3 sm:py-4 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <div className="border-l sm:border-l-0 border-primary-800 flex-grow h-full flex">
              <DeleteReservation bookingId={booking.id} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
