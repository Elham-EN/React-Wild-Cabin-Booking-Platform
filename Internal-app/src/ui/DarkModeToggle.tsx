import React from "react";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon } from "react-icons/hi2";

export default function DarkModeToggle(): React.ReactElement {
  return (
    <ButtonIcon>
      <HiOutlineMoon />
    </ButtonIcon>
  );
}
