import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export type FilterType = {
  field: string;
  value: string | null;
  methodOperation: "eq" | "gt" | "gte" | "lt" | "lte";
} | null;

export type SortType = {
  field: string;
  direction: "asc" | "desc";
} | null;

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : ({ field: "status", value: filterValue } as FilterType);

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    // Whenever this filter object changes, react query wii refetch the data
    queryKey: ["bookings", filter],
    // Fetching the data from the API
    queryFn: () => getAllBookings({ filter }),
  });

  return { isPending, bookings, error };
}
