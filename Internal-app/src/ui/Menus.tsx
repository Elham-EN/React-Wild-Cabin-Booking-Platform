import React, { createContext, useContext, useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  position: {
    x: number;
    y: number;
  };
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface Position {
  x: number;
  y: number;
}

interface MenusContextProps {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

const MenusContext = createContext<MenusContextProps | undefined>(undefined);

function useMenusContext() {
  const context = useContext(MenusContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a Menus Provider");
  }
  return context;
}

interface MenusProps {
  children: React.ReactNode;
}

function Menus({ children }: MenusProps): React.ReactElement {
  // Track which one is the currently openId
  const [openId, setOpenId] = useState<string>("");
  //
  const [position, setPosition] = useState<Position | null>(null);
  // None of the menus is currently open
  const close = () => setOpenId("");
  // The menus is currently open
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

interface ToggleProps {
  id: string;
}

function Toggle({ id }: ToggleProps): React.ReactElement {
  const { openId, open, close, setPosition } = useMenusContext();
  // handle event for open or close the menu
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // Get information about the its position relative to the viewport
    const target = event.target as HTMLElement;
    const rect = target.closest("button")?.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - (rect?.width ?? 0) - (rect?.x ?? 0),
      y: (rect?.y ?? 0) + (rect?.height ?? 0),
    });
    // If none of the menus is open, so than open this menus (so
    // the one with the id is clicked.) OR also if there is currently
    // an open menu already but it's different than the one that's being
    // cliked, then we also want to open this menu. Otherwise just close
    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

interface ListProps {
  id: string;
  children: React.ReactNode;
}

function List({ id, children }: ListProps): React.ReactElement | null {
  const { openId, position, close } = useMenusContext();
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position || { x: 0, y: 0 }} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

function Button({ children, icon, onClick, disabled }: ButtonProps): React.ReactElement {
  const { close } = useMenusContext();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
