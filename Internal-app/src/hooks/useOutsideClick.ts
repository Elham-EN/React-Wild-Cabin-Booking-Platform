import { useEffect, useRef } from "react";

function useOutsideClick(handler: () => void, listenCapturing: boolean = true) {
  // Tells TypeScript what kind of element this ref will point to
  // The initial value is null because the ref won't be assigned
  // until the component renders. Point to the modal.
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detecting a click outide the Modal, than close the modal
    const handleClick = (event: MouseEvent) => {
      // Check if ref exist And if ref.current (window) does not contain
      // the element that was clicked, then close the modal
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // If click outside of the modal (Window) than close the modal
        handler();
      }
    };
    // Add Global event listener for click event at capturing phase
    document.addEventListener("click", handleClick, { capture: listenCapturing });
    // Return a cleanup function that will run when the
    // component unmounts to prevent memory leaks
    return () => {
      document.removeEventListener("click", handleClick, { capture: listenCapturing });
    };
  }, [handler, listenCapturing]);

  return ref;
}

export { useOutsideClick };
