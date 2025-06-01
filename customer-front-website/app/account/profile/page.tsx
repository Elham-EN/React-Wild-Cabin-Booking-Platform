import React from "react";

import { Metadata } from "next";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import { auth } from "@/app/_libs/auth";
import { getGuest } from "@/app/_libs/api-service";

export const metadata: Metadata = {
  title: "Update profile",
};

/**
 * Profile page that allows users to update their personal information.
 * Fully responsive across all device sizes.
 */
export default async function Page(): Promise<React.ReactElement> {
  const session = await auth();
  const guest = await getGuest(session?.user?.email as string);
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-3 sm:mb-4">
        Update your guest profile
      </h2>

      <p className="text-base sm:text-lg mb-5 sm:mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          defaultCountry={guest.nationality}
          name={"nationality"}
          id={"nationality"}
        />
      </UpdateProfileForm>
    </div>
  );
}
