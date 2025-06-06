import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { PAGE_SIZE } from "../../utils/contants";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  // Handle pagination errors with useEffect
  useEffect(() => {
    if (error) {
      // Check for Supabase pagination error
      const errorMessage = String(error);
      if (
        errorMessage.includes("Requested range not satisfiable") ||
        errorMessage.includes("PGRST103")
      ) {
        // Reset to page 1
        searchParams.set("page", "1");
        setSearchParams(searchParams);
      }
    }
  }, [error, searchParams, setSearchParams]);

  const bookings = data?.bookingsData;
  const count = data?.count;

  // Pre-Fetching -  load data in the background before a user actually requests it.
  // The data gets stored in the cache so it's immediately available when needed.
  const pageTotal = Math.ceil(count! / PAGE_SIZE);
  if (page < pageTotal) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isPending, bookings, count, error };
}
