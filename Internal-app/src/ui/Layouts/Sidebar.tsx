import React from "react";
import styled from "styled-components";
import Heading from "../Headers/Heading";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  // Sidebar Placement: it starts at the first row and ends
  // at the last row (-1 is a special index meaning "last"),
  // effectively spanning both rows
  grid-row: 1 / 3;
`;

export default function Sidebar(): React.ReactElement {
  return (
    <StyledSidebar>
      <Heading>Sidebar</Heading>
    </StyledSidebar>
  );
}

/**
+----------------+------------------+
|                |                  |
|    Sidebar     |     Header       |
|                |                  |
|                +------------------+
|                |                  |
|                |      Main        |
|                |                  |
|                |                  |
+----------------+------------------+
 */
