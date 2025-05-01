import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import { Booking } from "../../types/booking";

export function useTodayActivity() {
  const { isLoading, data } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  const stays = data as Booking[];
  return { isLoading, stays };
}
