"use client";

import React, { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import {
  // isWithinInterval,
  differenceInDays,
  isPast,
  isSameDay,
} from "date-fns";
import { Setting } from "../_types/Setting";
import { Cabin } from "../_types/Cabin";
import { useReservation } from "../_libs/contexts";

// function isAlreadyBooked(range: DateRange, datesArr: Date[]): boolean {
//   if (!range?.from || !range?.to || datesArr.length === 0) {
//     return false;
//   }
//   return datesArr.some((date) =>
//     isWithinInterval(date, { start: range.from!, end: range.to! })
//   );
// }

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
  const { range, setRange, resetRange } = useReservation();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Get the number of full day periods between two dates
  // Only calculate when we have valid dates
  const hasValidDates = range.from && range.to;
  const numNights = hasValidDates
    ? differenceInDays(range.to!, range.from!)
    : 0;
  const cabinPrice = hasValidDates
    ? numNights * (cabin.regularPrice - cabin.discount)
    : 0;

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
  const handleSelect = (rangeArg: DateRange | undefined) => {
    if (rangeArg?.from) {
      setRange({ from: rangeArg.from, to: rangeArg.to });
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center p-4 md:p-6 
        bg-primary-800 rounded-t-lg md:rounded-t-none md:rounded-l-lg 
          shadow-inner h-full"
    >
      <h2 className="text-xl font-semibold mb-4 text-primary-100">
        Select Your Dates
      </h2>
      <DayPicker
        className="rdp custom-day-picker"
        mode="range"
        min={settings.minBookingLength}
        max={settings.maxBookingLength}
        selected={range}
        onSelect={handleSelect}
        captionLayout="dropdown"
        numberOfMonths={isMobile ? 1 : 2}
        startMonth={new Date()}
        endMonth={new Date(new Date().setMonth(new Date().getMonth() + 3))}
        modifiersClassNames={{
          selected: "bg-primary-800 text-black",
          today: "bg-accent-800 font-bold text-accent-100 rounded-4xl",
        }}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDates.some((date) => isSameDay(date, currDate))
        }
      />

      <div
        className="flex items-center justify-between px-8 mb-8 
        bg-accent-500 text-primary-800 h-[72px]"
      >
        <div className="flex items-center gap-6">
          <p className="flex gap-2 items-baseline">
            {cabin.discount > 0 ? (
              <>
                <span className="text-2xl">
                  ${cabin.regularPrice - cabin.discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${cabin.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${cabin.regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>

          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl w-20 text-center">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total Price</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>
      </div>
      {range?.from && (
        <div className="flex justify-around items-center w-full">
          <p className="text-primary-100 text-sm">
            {range.to ? (
              <>
                Selected: {range.from.toLocaleDateString()} to{" "}
                {range.to.toLocaleDateString()}
              </>
            ) : (
              <>Select end date</>
            )}
          </p>
          <button
            onClick={resetRange}
            className="border border-accent-500 py-1 px-2 rounded-lg 
          hover:bg-accent-500 cursor-pointer text-sm sm:text-[16px]"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
