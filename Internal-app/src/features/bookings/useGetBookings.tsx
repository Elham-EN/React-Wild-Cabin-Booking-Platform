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

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isPending, error } = useQuery({
    // Whenever this filter object changes, react query will refetch the data
    queryKey: ["bookings", filter, sortBy, page],
    // Fetching the data from the API
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });

  const bookings = data?.bookingsData;
  const count = data?.count;

  return { isPending, bookings, count, error };
}
