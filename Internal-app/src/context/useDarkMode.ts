import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === null)
    throw new Error("DarkModeContext was used outside of the DarkModeProvider");
  return context;
}
