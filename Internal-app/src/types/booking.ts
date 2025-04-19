export type Booking = {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  status: "unconfirmed" | "checked-in" | "checked-out";
  cabinId: number;
  guestId: number;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
    nationalId: string;
    nationality: string;
    countryFlag: string;
  };
};

export type UpdateBooking = {
  id?: string;
  isPaid: boolean;
  status: "unconfirmed" | "checked-in" | "checked-out";
};
