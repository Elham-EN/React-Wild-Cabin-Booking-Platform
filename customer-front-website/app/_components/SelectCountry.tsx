import React, { ReactElement } from "react";
import { getCountries } from "@/app/_libs/api-service";

interface SelectCountryProps {
  defaultCountry: string;
  name: string;
  id: string;
}

export default async function SelectCountry({
  defaultCountry,
  name,
  id,
}: SelectCountryProps): Promise<ReactElement> {
  const countries = await getCountries();

  // Sort countries alphabetically by name.common
  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  const flag =
    sortedCountries.find((country) => country.name.common === defaultCountry)
      ?.flag ?? "";
  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className="bg-primary-200 text-primary-800 px-5 py-3 w-full 
        shadow-sm rounded-sm"
    >
      <option value="">Select country...</option>
      {sortedCountries.map((country) => {
        return (
          <option
            key={country.name.common}
            value={`${country.name.common}}%${country.flag}`}
          >
            {country.flag} {country.name.common}
          </option>
        );
      })}
    </select>
  );
}
