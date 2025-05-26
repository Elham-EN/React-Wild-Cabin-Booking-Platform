"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our date range
type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

// Define the context value type
interface ReservationContextType {
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
}

// Define props for the provider
interface ReservationProviderProps {
  children: ReactNode;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

const initialState: DateRange = { from: undefined, to: undefined };

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<DateRange>(initialState);

  const resetRange = (): void => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation(): ReservationContextType {
  const context = useContext(ReservationContext);

  if (context === undefined)
    throw new Error("useReservation must be used within a ReservationProvider");
  return context;
}

export { ReservationProvider, useReservation };
export type { DateRange, ReservationContextType };
