import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Layouts/Row";
import Heading from "../../ui/Headers/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import { ReactElement, useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useFetchSettings } from "../settings/useFetchSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking(): ReactElement | null {
  const { data, isLoading } = useGetBooking();

  const { checkinMutate, isPending } = useCheckIn();

  const { settings, isLoading: isLoadingSettings } = useFetchSettings();

  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);

  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);

  const [optionalBreakfastPrice, setOptionalBreakfastPrice] = useState<number>(0);

  useEffect(() => {
    if (data && settings) {
      setOptionalBreakfastPrice(
        settings.breakfastPrice * data.numNights * data.numGuests
      );
    }
  }, [data, settings]);

  useEffect(() => setConfirmPaid(data?.isPaid ?? false), [data?.isPaid]);

  const moveBack = useMoveBack();

  if (!data) return null;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkinMutate({
        bookingId: data!.id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: data!.totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkinMutate({ bookingId: data!.id });
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{data?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      {!data.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="addBreakfast"
          >
            Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isPending}
        >
          I confirm that {data.guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(data.totalPrice)
            : `${formatCurrency(data.totalPrice + optionalBreakfastPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isPending}>
          Check in booking #{data.id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
