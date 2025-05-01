import styled from "styled-components";
import { Booking } from "../../types/booking";
import { ReactElement } from "react";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

interface TodayItemProps {
  activitiy: Booking;
}

function TodayItem({ activitiy }: TodayItemProps): ReactElement {
  const { id, status, guests, numNights } = activitiy;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt="flag of country" />
      <Guest>{guests.fullName ? guests.fullName : "...loading"}</Guest>
      <div>{numNights}</div>
      {status === "unconfirmed" && (
        <Button size="small" variation="primary" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
