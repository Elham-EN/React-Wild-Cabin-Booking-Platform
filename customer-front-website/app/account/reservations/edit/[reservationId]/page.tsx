import ReservationEditForm from "@/app/_components/ReservationEditForm";
import { getBooking, getCabin } from "@/app/_libs/api-service";
import React from "react";

interface PageProps {
  params: Promise<{ reservationId: string }>;
}

async function page({ params }: PageProps): Promise<React.ReactElement> {
  // Get the current booking that you want to update based on the id
  const { reservationId } = await params;
  const bookingData = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(bookingData.cabinId);
  // Display the value of the current booking into the form

  // Action: Update the form

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl text-accent-400 font-semibold">
        Update reservation #{reservationId}
      </h1>
      <ReservationEditForm booking={bookingData} maxCapcity={maxCapacity} />
    </div>
  );
}

export default page;
