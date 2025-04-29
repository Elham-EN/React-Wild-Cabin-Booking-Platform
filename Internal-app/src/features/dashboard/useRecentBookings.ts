import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { BookingsAfterDate } from "../../types/booking";

export function useRecentBookings() {
  // For how many days in the past we want to get our data (e.g. 7 days or 90 days)
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  const bookings = data as BookingsAfterDate[] | undefined;

  return { isLoading, bookings };
}
