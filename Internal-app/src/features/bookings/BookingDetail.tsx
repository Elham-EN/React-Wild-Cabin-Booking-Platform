import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Layouts/Row";
import Heading from "../../ui/Headers/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import Spinner from "../../ui/Spinner";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail(): ReactElement | null {
  const { data, isLoading } = useGetBooking();
  const { checkoutMutate, isCheckingOut } = useCheckOut();
  const { deleteBookingMutate, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if (!data) return null;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {data.id}</Heading>
          <Tag type={statusToTagName[data?.status]}>{data.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={data} />

      <ButtonGroup>
        {data.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${data.id}`)}>Check in</Button>
        )}
        {data.status === "checked-in" && (
          <Button
            onClick={() => checkoutMutate({ bookingId: data.id })}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBookingMutate(data.id, { onSettled: () => navigate(-1) })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
