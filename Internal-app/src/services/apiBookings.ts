import { FilterType, SortType } from "../features/bookings/useGetBookings";
import { Booking, UpdateBooking } from "../types/booking";
import { PAGE_SIZE } from "../utils/contants";
import { getToday } from "../utils/helpers";
import { supabase } from "./supabase";

export type OptionType = {
  filter: FilterType;
  sortBy?: SortType;
  page: number;
};

/**
 * Fetches bookings data from Supabase with filtering, sorting, and pagination
 *
 * @param {object} options - Query options
 * @param {FilterType} options.filter - Filter criteria (field, value, method)
 * @param {SortType} options.sortBy - Sorting criteria (field, direction)
 * @param {number} options.page - The page number to fetch
 * @returns {Promise<{bookingsData: Booking[], count: number}>} - Bookings and total count
 */
export async function getAllBookings({ filter, sortBy, page }: OptionType) {
  // Create initial query to get bookings with related cabin and guest data
  // The { count: "exact" } tells Supabase to return the total count of records
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });
  // Add filtering if provided (e.g., filter by status="checked-in")
  // Uses dynamic method (eq, gt, lt) based on filter.method or defaults to equals
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }
  // Add sorting if provided (e.g., sort by startDate in ascending order)
  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  }
  // First, execute the query just to get the total count of filtered records
  // This helps us calculate proper pagination limits
  const { count: totalCount, error: countError } = await query;

  if (countError) {
    throw new Error("Could not count bookings");
  }
  /**
   * Apply pagination safely to prevent "Requested range not satisfiable" errors
   * This ensures we never request data beyond what actually exists in the database
   */
  if (page && totalCount) {
    // Calculate the total number of pages needed based on page size
    // The "|| 1" ensures we always have at least 1 page, even if count is 0
    const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;
    // Create a "safe" page number that won't exceed available pages
    // If user requests page 5 but we only have 3 pages, this becomes 3
    const safePage = Math.min(page, totalPages);
    // Calculate the "from" index (first record to fetch)
    // Example: Page 2 with page size 10 would start at index 10
    const from = (safePage - 1) * PAGE_SIZE;
    // Calculate the "to" index (last record to fetch)
    // Example: Page 2 with page size 10 would end at index 19
    const to = from + PAGE_SIZE - 1;
    // Apply the range to our query
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  const bookingsData = data as Booking[];
  return { bookingsData, count };
}

export async function getBooking(id: string): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  const bookingData = data as Booking;

  return bookingData;
}

// Returns all BOOKINGS that are were created after the given date.
// Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: string, obj: UpdateBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  const bookingData = data as Booking;

  return bookingData;
}

export async function deleteBooking(id: string) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
