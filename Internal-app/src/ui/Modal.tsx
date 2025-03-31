import React, {
  cloneElement,
  createContext,
  HTMLAttributes,
  ReactElement,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModalContext() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}

// Parent Component:
interface ModalProps {
  children: React.ReactNode;
}
function Modal({ children }: ModalProps): ReactElement {
  // Keep track of which is the currently open window: By default no open window
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  // explicitly telling TypeScript that children must be a React
  // element that can accept HTML attributes like onClick
  children: React.ReactElement<HTMLAttributes<HTMLElement>>;
  opens: string;
}

function Open({ children, opens: OpensWindowName }: OpenProps): ReactElement | null {
  const { open } = useModalContext();

  // Check if children is a valid ReactElement
  if (!React.isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: () => open(OpensWindowName),
  });
}

interface ModalChildProps {
  onCloseModal?: () => void;
}

interface WindowProps {
  children: React.ReactElement<ModalChildProps>;
  name: string;
}

function Window({ children, name }: WindowProps): ReactElement | null {
  const { openName, close } = useModalContext();

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
