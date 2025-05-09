export interface Booking {
  id: string;
  guestId: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  cabins: {
    name: string;
    image: string;
  };
}
