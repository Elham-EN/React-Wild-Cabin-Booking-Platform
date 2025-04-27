import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu(): React.ReactElement {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/account");
  };

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={handleNavigation}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
