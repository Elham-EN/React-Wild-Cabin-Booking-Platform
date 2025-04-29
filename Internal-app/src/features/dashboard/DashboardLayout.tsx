import React from "react";
import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout(): React.ReactElement {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2 } = useRecentStays();

  if (isLoading1 || isLoading2) return <Spinner />;

  console.log("====================================");
  console.log("Bookings after date", bookings);
  console.log("====================================");
  console.log("====================================");
  console.log("Confirmed Stays", confirmedStays);
  console.log("====================================");

  return <StyledDashboardLayout></StyledDashboardLayout>;
}
