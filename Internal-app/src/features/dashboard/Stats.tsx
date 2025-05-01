import { ReactElement } from "react";
import { Booking, BookingsAfterDate } from "../../types/booking";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineSortAscending } from "react-icons/hi";

interface StatsProps {
  bookings: BookingsAfterDate[] | undefined;
  stays: Booking[] | undefined;
  numDays: number;
  cabinCount: number;
}

function Stats({
  bookings,
  stays: confirmedStays,
  numDays,
  cabinCount,
}: StatsProps): ReactElement {
  const numBookings = bookings?.length;
  // Adding together all the total prices from all bookings. Accumulator start
  // from 0 & then in each iteration add the current total price of each booking
  const totalSales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays?.length;
  const occupation = !confirmedStays
    ? 0
    : confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) /
      (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={!numBookings ? "NaN" : numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={!totalSales ? "NaN" : formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={!checkins ? "NaN" : checkins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineSortAscending />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
