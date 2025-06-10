import React, { ReactElement } from "react";
import { Booking } from "../_types/Booking";
import { updateReservationAction } from "../_libs/actions";
import FormButton from "./SubmitButton";

interface Props {
  booking: Booking;
  maxCapcity: number;
}

function ReservationEditForm({ booking, maxCapcity }: Props): ReactElement {
  return (
    <form
      action={updateReservationAction}
      className="mt-12 bg-primary-900 py-8 px-12 flex flex-col gap-6"
    >
      <input type="hidden" name="bookingId" value={booking.id} />
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guest?</label>
        <select
          name="numGuests"
          id="numGuest"
          defaultValue={booking.numGuests}
          required
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-md 
            rounded-sm"
        >
          <option value="">Select number of guests...</option>
          {Array.from<undefined, number>(
            { length: maxCapcity },
            (_, index) => index + 1
          ).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={booking.observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm 
            rounded-sm"
        />
      </div>
      <div className="flex justify-end items-center gap-6">
        <FormButton
          buttonName="Update Reservations"
          pendingLabel="Updating..."
        />
      </div>
    </form>
  );
}

export default ReservationEditForm;
