import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkinMutate, isPending } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: [data.isPaid] });
      queryClient.invalidateQueries({ queryKey: [data.status] });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });
  return { checkinMutate, isPending };
}
