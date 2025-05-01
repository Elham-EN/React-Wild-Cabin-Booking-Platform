import { ReactElement } from "react";
import Button from "../../ui/Button/Button";
import { useCheckOut } from "./useCheckOut";

interface CheckoutBtnProps {
  bookingId: string;
}

function CheckoutButton({ bookingId }: CheckoutBtnProps): ReactElement {
  const { checkoutMutate, isCheckingOut } = useCheckOut();

  const handleCheckout = () => {
    checkoutMutate({ bookingId });
  };

  return (
    <Button
      variation="primary"
      size="small"
      onClick={handleCheckout}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
