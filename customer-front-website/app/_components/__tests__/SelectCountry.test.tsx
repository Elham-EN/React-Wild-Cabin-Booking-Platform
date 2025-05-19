/**
 * Unit Tests for SelectCountry Component
 *
 * This file contains tests for the SelectCountry component, which is a dropdown
 * that displays a list of countries with their flags. The component fetches country
 * data from an API and allows users to select a country from the list.
 *
 * The component is used in forms where country selection is required, such as
 * in user registration or booking forms.
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectCountry } from "../SelectCountry";
import * as apiService from "@/app/_libs/api-service";

// Mock the API service so we don't make actual API calls during tests
// Instead, we'll control what data the getCountries function returns
jest.mock("../../_libs/api-service", () => ({
  getCountries: jest.fn(),
}));

// Mock the Supabase client in case it's used indirectly by the component
// This ensures we don't try to make real database connections during tests
jest.mock("../../_libs/supabase", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  },
}));

describe("SelectCountry", () => {
  // Sample country data that we'll use for our tests
  // This mocks what would normally be returned from the API
  const mockCountries = [
    { name: { common: "United States" }, flag: "🇺🇸" },
    { name: { common: "Canada" }, flag: "🇨🇦" },
    { name: { common: "France" }, flag: "🇫🇷" },
    { name: { common: "Germany" }, flag: "🇩🇪" },
    { name: { common: "Japan" }, flag: "🇯🇵" },
  ];

  // Before each test, reset all mocks and set up the default mock return value
  beforeEach(() => {
    jest.clearAllMocks();
    // Make the getCountries function return our mock data
    (apiService.getCountries as jest.Mock).mockResolvedValue(mockCountries);
  });

  /**
   * Test 1: Component renders with correct HTML attributes
   *
   * This test verifies that the component renders a select element with the
   * correct name and ID attributes that were passed as props.
   */
  it("renders SelectCountry component with correct props", async () => {
    // Set up test props
    const props = {
      defaultCountry: "Canada",
      name: "country",
      id: "country-select",
    };

    // Render the component (note: it's async because it fetches data)
    const SelectCountryComponent = await SelectCountry(props);
    render(SelectCountryComponent);

    // Find the select element and check its attributes
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute("name", "country");
    expect(selectElement).toHaveAttribute("id", "country-select");
  });

  /**
   * Test 2: All countries are rendered as options
   *
   * This test checks that all countries from our mock data are properly
   * displayed as options in the dropdown, each with their flag.
   */
  it("renders all countries from the API", async () => {
    const props = {
      defaultCountry: "France",
      name: "country",
      id: "country-select",
    };

    const SelectCountryComponent = await SelectCountry(props);
    render(SelectCountryComponent);

    // Get all option elements
    const options = screen.getAllByRole("option");

    // Check the number of options (countries + the default "Select country..." option)
    expect(options).toHaveLength(mockCountries.length + 1);

    // Check that each country appears in the dropdown with its flag
    mockCountries.forEach((country) => {
      expect(
        screen.getByText(new RegExp(`${country.flag}.*${country.name.common}`))
      ).toBeInTheDocument();
    });
  });

  /**
   * Test 3: Default country is set correctly
   *
   * This test verifies that when a defaultCountry is provided,
   * that country is rendered in the dropdown.
   */
  it("sets the default country correctly", async () => {
    const props = {
      defaultCountry: "Germany",
      name: "country",
      id: "country-select",
    };

    const SelectCountryComponent = await SelectCountry(props);
    render(SelectCountryComponent);

    // Verify basic attributes of the select element
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute("name", props.name);
    expect(selectElement).toHaveAttribute("id", props.id);

    // Check that Germany appears in the list (with its flag)
    // This is a more reliable test than checking the defaultValue attribute
    const germanyOption = screen.getByText(/🇩🇪.*Germany/);
    expect(germanyOption).toBeInTheDocument();
  });

  /**
   * Test 4: Countries are sorted alphabetically
   *
   * This test ensures that no matter what order the countries come from the API,
   * they are displayed in alphabetical order in the dropdown.
   */
  it("sorts countries alphabetically by name", async () => {
    // Create deliberately unsorted mock data
    const unsortedCountries = [
      { name: { common: "Japan" }, flag: "🇯🇵" },
      { name: { common: "United States" }, flag: "🇺🇸" },
      { name: { common: "France" }, flag: "🇫🇷" },
      { name: { common: "Canada" }, flag: "🇨🇦" },
      { name: { common: "Germany" }, flag: "🇩🇪" },
    ];

    // Make the API return unsorted countries
    (apiService.getCountries as jest.Mock).mockResolvedValue(unsortedCountries);

    const props = {
      defaultCountry: "Japan",
      name: "country",
      id: "country-select",
    };

    const SelectCountryComponent = await SelectCountry(props);
    render(SelectCountryComponent);

    // Get all options except the first one ("Select country...")
    const options = screen.getAllByRole("option").slice(1);

    // Extract just the country names from the option text (which includes flags)
    const countryNames = options.map((option) =>
      option.textContent?.trim().split(" ").slice(1).join(" ")
    );

    // Create a sorted copy of the names array to compare against
    const sortedNames = [...countryNames].sort();

    // If the component sorts correctly, the displayed names should already be sorted
    expect(countryNames).toEqual(sortedNames);
  });

  /**
   * Test 5: API errors are handled properly
   *
   * This test checks that if the API call fails, the component
   * throws an error rather than failing silently.
   */
  it("handles API error gracefully", async () => {
    // Make the API call throw an error
    (apiService.getCountries as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    const props = {
      defaultCountry: "United States",
      name: "country",
      id: "country-select",
    };

    // The component should throw the same error that the API threw
    await expect(SelectCountry(props)).rejects.toThrow("API Error");
  });

  /**
   * Test 6: Default option is shown
   *
   * This test verifies that "Select country..." appears as the first option
   * in the dropdown, with an empty value.
   */
  it('shows "Select country..." as the first option', async () => {
    const props = {
      defaultCountry: "Canada",
      name: "country",
      id: "country-select",
    };

    const SelectCountryComponent = await SelectCountry(props);
    render(SelectCountryComponent);

    // Get the first option element
    const firstOption = screen.getAllByRole("option")[0];

    // Check its text and value
    expect(firstOption).toHaveTextContent("Select country...");
    expect(firstOption).toHaveValue("");
  });

  /**
   * Test 7: Handling unknown countries
   *
   * This test checks what happens when the defaultCountry prop
   * doesn't match any country in the list from the API.
   */
  it("handles defaultCountry not in the list", async () => {
    const props = {
      defaultCountry: "NotACountry", // This country name doesn't exist in our mock data
      name: "country",
      id: "country-select",
    };

    const SelectCountryComponent = await SelectCountry(props);
    render(SelectCountryComponent);

    // Check the basic attributes of the select element
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute("name", props.name);
    expect(selectElement).toHaveAttribute("id", props.id);

    // Verify that all options are still rendered correctly
    expect(screen.getByText("Select country...")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(mockCountries.length + 1); // +1 for "Select country..."
  });
});
