"use client";

import React, { useState, ReactElement } from "react";
import { Cabin } from "../_types/Cabin";
import { useReservation } from "../_libs/contexts";
import { differenceInDays } from "date-fns";
import { createReservation } from "../_libs/actions";

interface ReservationFormProps {
  cabin: Cabin;
}

function ReservationForm({ cabin }: ReservationFormProps): ReactElement {
  const [numGuests, setNumGuests] = useState<string>("");
  const [observations, setObservations] = useState<string>("");
  const { range, resetRange } = useReservation();

  // Check if dates are selected
  const hasValidDates = range.from && range.to;

  // Only calculate when we have valid dates - safely handle undefined
  const startDate = range.from;
  const endDate = range.to;
  const numNights = hasValidDates ? differenceInDays(endDate!, startDate!) : 0;
  const cabinPrice = hasValidDates
    ? numNights * (cabin.regularPrice - cabin.discount)
    : 0;

  // Format the date range for display
  const formatDateRange = (): string => {
    if (!range?.from) return "Select dates first";

    const fromDate = range.from.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const toDate = range.to
      ? range.to.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "...";

    return `${fromDate} to ${toDate}`;
  };

  // Generate options for guest selection
  const guestOptions = [];
  for (let i = 1; i <= cabin.maxCapacity; i++) {
    guestOptions.push(
      <option key={i} value={i}>
        {i} {i === 1 ? "guest" : "guests"}
      </option>
    );
  }

  return (
    <div className="h-full rounded-r-lg overflow-hidden">
      <div
        className="bg-primary-800 text-primary-300 px-4 md:px-8 py-4 flex flex-col 
            sm:flex-row justify-between items-center w-full"
      >
        <p className="text-sm sm:text-base font-medium">
          <span className="opacity-75 mr-1">Booking for:</span>
          <span>Guest</span>
        </p>
        <p className="text-sm sm:text-base font-medium mt-2 sm:mt-0">
          <span className="opacity-75 mr-1">Dates:</span>
          <span>{formatDateRange()}</span>
        </p>
      </div>
      <form
        action={async (formData: FormData) => {
          await createReservation(formData);
          setObservations("");
          resetRange();
        }}
        className="bg-primary-800 py-8 px-4 md:px-8 text-lg flex gap-6 flex-col"
      >
        {/* Hidden inputs for reservation data - only render when dates are valid */}
        {hasValidDates && (
          <>
            <input
              type="hidden"
              name="startDate"
              value={range.from!.toISOString()}
            />
            <input
              type="hidden"
              name="endDate"
              value={range.to!.toISOString()}
            />
            <input
              type="hidden"
              name="numNights"
              value={numNights.toString()}
            />
            <input
              type="hidden"
              name="cabinPrice"
              value={cabinPrice.toString()}
            />
            <input type="hidden" name="cabinId" value={cabin.id} />
          </>
        )}
        <div>
          <label
            htmlFor="numGuests"
            className="block mb-2 text-primary-300 font-medium"
          >
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            required
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm 
                  rounded-md border border-primary-700 focus:outline-none focus:ring-2 
                  focus:ring-accent-500"
          >
            <option value="">Select number of guests...</option>
            {guestOptions}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="observations"
            className="block mb-2 text-primary-300 font-medium"
          >
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm 
              rounded-md border border-primary-700 focus:outline-none focus:ring-2 
              focus:ring-accent-500 min-h-[120px]"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div
          className="flex flex-col sm:flex-row sm:justify-end items-center gap-4 
              sm:gap-6 mt-4"
        >
          <button
            type="submit"
            disabled={!hasValidDates}
            className="bg-accent-500 px-6 py-3 text-primary-800 font-semibold rounded-md
               hover:bg-accent-600 transition-all disabled:cursor-not-allowed 
               disabled:bg-gray-500 disabled:text-gray-300 w-full sm:w-auto"
          >
            {!hasValidDates ? "Select dates first" : "Reserve now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
