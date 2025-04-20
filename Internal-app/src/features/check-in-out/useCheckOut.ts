import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

interface CheckOutType {
  bookingId: string;
}

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkoutMutate, isPending: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }: CheckOutType) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: [data.isPaid] });
      queryClient.invalidateQueries({ queryKey: [data.status] });
    },
    onError: () => toast.error("There was an error while checking out"),
  });
  return { checkoutMutate, isCheckingOut };
}
