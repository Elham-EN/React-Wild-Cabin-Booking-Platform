export interface CabinSetting {
  id: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface EditCabinSetting {
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: number;
}
