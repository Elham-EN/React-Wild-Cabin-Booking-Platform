export interface Booking {
  id: string;
  guestId: string;
  cabinId: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  observations: string;
  status: "unconfirmed" | "checked-in" | "checked-out";
  cabins: {
    name: string;
    image: string;
  };
}

export interface UpdateBooking {
  numGuests: number;
  observations: string;
}

export interface CreateBooking {
  cabinId: string;
  guestId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  cabinPrice: number;
  numGuests: number;
  observations: string;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  status: "checked-in" | "checked-out" | "unconfirmed";
}
