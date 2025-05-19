import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Define the interface for our props
interface SelectCountryProps {
  defaultCountry: string;
  name: string;
  id: string;
}

/**
 * Mock country data for Storybook
 */
const mockCountries = [
  { name: { common: "United States" }, flag: "🇺🇸" },
  { name: { common: "Canada" }, flag: "🇨🇦" },
  { name: { common: "Mexico" }, flag: "🇲🇽" },
  { name: { common: "Brazil" }, flag: "🇧🇷" },
  { name: { common: "United Kingdom" }, flag: "🇬🇧" },
  { name: { common: "France" }, flag: "🇫🇷" },
  { name: { common: "Germany" }, flag: "🇩🇪" },
  { name: { common: "Italy" }, flag: "🇮🇹" },
  { name: { common: "Spain" }, flag: "🇪🇸" },
  { name: { common: "China" }, flag: "🇨🇳" },
  { name: { common: "Japan" }, flag: "🇯🇵" },
  { name: { common: "Australia" }, flag: "🇦🇺" },
  { name: { common: "India" }, flag: "🇮🇳" },
  { name: { common: "South Africa" }, flag: "🇿🇦" },
];

/**
 * A completely synchronous mock of the SelectCountry component for Storybook
 * This avoids any issues with async rendering in Storybook
 */
const MockSelectCountry = (props: SelectCountryProps) => {
  // Sort countries alphabetically
  const sortedCountries = [...mockCountries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  // Find the flag for the default country (if it exists)
  const flag =
    sortedCountries.find((country) => country.name.common === props.defaultCountry)
      ?.flag ?? "";
  
  // Create the default value
  const defaultValue = `${props.defaultCountry}%${flag}`;

  return (
    <select
      name={props.name}
      id={props.id}
      defaultValue={defaultValue}
      className="bg-primary-200 text-primary-800 px-5 py-3 w-full shadow-sm rounded-sm"
    >
      <option value="">Select country...</option>
      {sortedCountries.map((country) => (
        <option
          key={country.name.common}
          value={`${country.name.common}%${country.flag}`}
        >
          {country.flag} {country.name.common}
        </option>
      ))}
    </select>
  );
};

/**
 * SelectCountry is a dropdown component that shows a list of countries with their flags.
 * It allows users to select a country from a list fetched from an API.
 * 
 * Used in forms where country selection is required, such as in user registration or booking forms.
 */
const meta: Meta<typeof MockSelectCountry> = {
  title: "Components/Form/SelectCountry",
  component: MockSelectCountry,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: 'A dropdown component that displays a list of countries with their flags, allowing users to select a country. The component fetches country data from an API and displays countries in alphabetical order.'
      }
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultCountry: { 
      control: "text",
      description: "The country that should be pre-selected in the dropdown"
    },
    name: { 
      control: "text",
      description: "The name attribute for the select element (used in forms)"  
    },
    id: { 
      control: "text",
      description: "The id attribute for the select element"  
    }
  }
};

export default meta;
type Story = StoryObj<typeof MockSelectCountry>;

/**
 * The default story with a pre-selected country.
 */
export const Default: Story = {
  args: {
    defaultCountry: "United States",
    name: "country",
    id: "country-select",
  },
};

/**
 * Story showing a different default country selection.
 */
export const EuropeanCountry: Story = {
  args: {
    defaultCountry: "France",
    name: "country",
    id: "country-select",
  },
};

/**
 * Story showing what happens when the provided default country is not in the list.
 */
export const UnknownCountry: Story = {
  args: {
    defaultCountry: "Atlantis", // A country that doesn't exist in our data
    name: "country",
    id: "country-select",
  },
};

/**
 * Story showing the component with a styled container to demonstrate
 * how it might look in a form.
 */
export const InFormContext: Story = {
  args: {
    defaultCountry: "Japan",
    name: "country",
    id: "country-select",
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-primary-200 text-primary-800 px-5 py-3 w-full shadow-sm rounded-sm"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <Story />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-primary-200 text-primary-800 px-5 py-3 w-full shadow-sm rounded-sm"
              placeholder="you@example.com"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-accent-500 text-white py-3 px-4 rounded-sm hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    ),
  ],
};

/**
 * Story showing the component with a dark theme.
 */
export const DarkTheme: Story = {
  args: {
    defaultCountry: "Brazil",
    name: "country",
    id: "country-select",
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8 rounded-lg">
        <label htmlFor="country-select" className="block text-white text-sm font-medium mb-2">
          Select Your Country
        </label>
        <Story />
      </div>
    ),
  ],
};
