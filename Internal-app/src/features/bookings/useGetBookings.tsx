import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export type FilterType = {
  field: string;
  value: string | null;
  method?: "eq" | "gt" | "gte" | "lt" | "lte";
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
      : ({ field: "status", value: filterValue, method: "eq" } as FilterType);

  // SORTING
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction } as SortType;

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    // Whenever this filter object changes, react query will refetch the data
    queryKey: ["bookings", filter, sortBy],
    // Fetching the data from the API
    queryFn: () => getAllBookings({ filter, sortBy }),
  });

  return { isPending, bookings, error };
}
