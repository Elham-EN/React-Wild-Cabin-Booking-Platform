import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useGetBookings() {
  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    // This will identify the data, for query here, if later we use
    // query again on another page, with this exact key, then the data
    // would be read from the cache
    queryKey: ["bookings"],
    // Fetching the data from the API
    queryFn: getAllBookings,
  });

  return { isPending, bookings, error };
}
