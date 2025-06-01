import React from "react";
import Image from "next/image";
import { Guest } from "../_types/Guest";
import { updateGuestAction } from "../_libs/actions";

interface UpdateProfileFormProps {
  children: React.ReactNode;
  guest: Guest;
}

export default function UpdateProfileForm({
  children,
  guest,
}: UpdateProfileFormProps): React.ReactElement {
  const defaultCountryFlag = "https://flagcdn.com/gb.svg";

  return (
    <form
      action={updateGuestAction}
      className="bg-primary-900 py-5 sm:py-8 px-4 sm:px-8 md:px-12 text-base 
        sm:text-lg flex gap-4 sm:gap-6 flex-col rounded-sm"
    >
      {/* Hidden Input just to send id to the server */}
      <input type="hidden" name="guestId" value={guest.id} />
      {/* Full name field */}
      <div className="space-y-1 sm:space-y-2">
        <label className="block mb-1">Full name</label>
        <input
          disabled
          name="fullname"
          defaultValue={guest.fullName}
          className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 
            w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 
            disabled:text-gray-400"
        />
      </div>

      {/* Email field */}
      <div className="space-y-1 sm:space-y-2">
        <label className="block mb-1">Email address</label>
        <input
          disabled
          name="email"
          defaultValue={guest.email}
          className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full 
            shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 
            disabled:text-gray-400"
        />
      </div>

      {/* Nationality field with country selection */}
      <div className="space-y-1 sm:space-y-2">
        <label htmlFor="nationality" className="block mb-1">
          Where are you from?
        </label>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-grow">{children}</div>

          <div className="w-12 h-8 relative">
            <Image
              src={guest.countryFlag || defaultCountryFlag}
              alt="Country flag"
              className="rounded-sm object-cover"
              fill
              sizes="48px"
            />
          </div>
        </div>
      </div>

      {/* National ID field */}
      <div className="space-y-1 sm:space-y-2">
        <label htmlFor="nationalID" className="block mb-1">
          National ID number
        </label>
        <input
          name="nationalID"
          id="nationalID"
          defaultValue={guest.nationalID}
          className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full 
            shadow-sm rounded-sm"
        />
      </div>

      {/* Submit button - full width on mobile */}
      <div className="w-full mt-2 sm:mt-4 sm:flex sm:justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto bg-accent-500 px-5 py-3 sm:px-8 sm:py-4 
            text-primary-800 font-semibold hover:bg-accent-600 transition-all 
             disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 
             rounded-sm text-center cursor-pointer"
        >
          Update profile
        </button>
      </div>
    </form>
  );
}
