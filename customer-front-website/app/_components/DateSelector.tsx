"use client";

import React, { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { isWithinInterval } from "date-fns";
import { Setting } from "../_types/Setting";
import { Cabin } from "../_types/Cabin";

function isAlreadyBooked(range: DateRange, datesArr: Date[]): boolean {
  if (!range?.from || !range?.to || datesArr.length === 0) {
    return false;
  }
  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}

interface DateSelectorProps {
  settings: Setting;
  bookedDates: Date[];
  cabin: Cabin;
}

export default function DateSelector({
  settings,
  bookedDates,
  cabin,
}: DateSelectorProps): React.ReactElement {
  const [range, setRange] = useState<DateRange | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Format the date range for display
  const formatDateRange = () => {
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

  // Detect screen size for responsive calendar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle date selection
  const handleSelect = (range: DateRange | undefined) => {
    setRange(range);
  };

  return (
    <div
      className="flex flex-col justify-center items-center p-4 md:p-6 
        bg-primary-800 rounded-t-lg md:rounded-t-none md:rounded-l-lg 
          shadow-inner h-full"
    >
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
      <h2 className="text-xl font-semibold mb-4 text-primary-800">
        Select Your Dates
      </h2>
      <DayPicker
        className="rdp custom-day-picker"
        mode="range"
        min={settings.minBookingLength + 1}
        max={settings.maxBookingLength}
        selected={range}
        onSelect={handleSelect}
        captionLayout="dropdown"
        numberOfMonths={isMobile ? 1 : 2}
        startMonth={new Date()}
        hidden={new Date(new Date().setMonth(new Date().getMonth() + 6))}
        modifiersClassNames={{
          selected: "bg-primary-800 text-black",
          today: "bg-accent-100 font-bold text-accent-800",
        }}
      />
      {range?.from && (
        <p className="mt-4 text-primary-800 text-sm">
          {range.to ? (
            <>
              Selected: {range.from.toLocaleDateString()} to{" "}
              {range.to.toLocaleDateString()}
            </>
          ) : (
            <>Select end date</>
          )}
        </p>
      )}
    </div>
  );
}
