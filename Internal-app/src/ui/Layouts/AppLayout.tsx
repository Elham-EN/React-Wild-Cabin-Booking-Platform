import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  // This creates a 2x2 grid.
  display: grid;
  // The first column is 26rem wide, and the second
  // column takes up the remaining space (1fr)
  grid-template-columns: 26rem 1fr;
  // The first row is auto-sized to its content, and
  // the second row takes up the remaining space
  grid-template-rows: auto 1fr;
  // The entire grid takes up the full viewport height
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

export default function AppLayout(): React.ReactElement {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}
