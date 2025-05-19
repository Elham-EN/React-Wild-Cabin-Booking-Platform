import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import SelectCountry from "@/app/_components/SelectCountry";

export const metadata: Metadata = {
  title: "Update profile",
};

/**
 * Profile page that allows users to update their personal information.
 * Fully responsive across all device sizes.
 */
export default function Page(): React.ReactElement {
  // Mock data - would typically come from a database or API
  const guest1 = {
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    nationality: "United Kingdom",
    nationalID: "GB987654321",
    countryFlag: "https://flagcdn.com/gb.svg",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-3 sm:mb-4">
        Update your guest profile
      </h2>

      <p className="text-base sm:text-lg mb-5 sm:mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <form className="bg-primary-900 py-5 sm:py-8 px-4 sm:px-8 md:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col rounded-sm">
        {/* Full name field */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block mb-1">Full name</label>
          <input
            disabled
            value={guest1.fullName}
            className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        {/* Email field */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block mb-1">Email address</label>
          <input
            disabled
            value={guest1.email}
            className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        {/* Nationality field with country selection */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="nationality" className="block mb-1">
            Where are you from?
          </label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-grow">
              <SelectCountry
                name="nationality"
                id="nationality"
                defaultCountry={guest1.nationality}
              />
            </div>

            <div className="w-12 h-8 relative">
              <Image
                src={guest1.countryFlag}
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
            defaultValue={guest1.nationalID}
            className="px-4 py-2 sm:px-5 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        {/* Submit button - full width on mobile */}
        <div className="w-full mt-2 sm:mt-4 sm:flex sm:justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-accent-500 px-5 py-3 sm:px-8 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 rounded-sm text-center"
          >
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
}
