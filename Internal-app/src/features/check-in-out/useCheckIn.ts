import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface BreakFast {
  hasBreakfast: boolean;
  extrasPrice: number;
  totalPrice: number;
}

interface CheckInType {
  bookingId: string;
  breakfast?: BreakFast;
}

export function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkinMutate, isPending } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckInType) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast }),
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
