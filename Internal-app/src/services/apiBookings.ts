import { FilterType, SortType } from "../features/bookings/useGetBookings";
import { Booking } from "../types/booking";
import { PAGE_SIZE } from "../utils/contants";
import { getToday } from "../utils/helpers";
import { supabase } from "./supabase";

export type OptionType = {
  filter: FilterType;
  sortBy?: SortType;
  page: number;
};
export async function getAllBookings({ filter, sortBy, page }: OptionType) {
  // Build the base query
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  // Apply filtering
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  // Apply sorting
  if (sortBy) {
    query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  }

  // Apply pagination

  // First, get just the count using the same query without pagination
  const { count: totalCount, error: countError } = await query;

  if (countError) {
    throw new Error("Could not count bookings");
  }

  // Now calculate and apply pagination safely
  if (page && totalCount) {
    // This calculates the actual total number of pages based on the real count
    // The || 1 ensures we have at least 1 page even if count is 0
    const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;
    // It compares the requested page with the maximum available pages
    // If someone requests page 3 but only 1 page exists, safePage becomes 1
    // This prevents requesting data beyond what's available
    const safePage = Math.min(page, totalPages);
    // The calculation of from and to using the safePage ensures we're always
    // asking for a valid range
    const from = (safePage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  const bookingsData = data as Booking[];
  return { bookingsData, count };
}

// export async function getAllBookings({ filter, sortBy, page }: OptionType) {
//   let query = supabase
//     .from("bookings")
//     .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

//   // API SIDE FILTERING: BOOKINGS
//   if (filter) {
//     query = query[filter.method || "eq"](filter.field, filter.value);
//   }

//   // API SIDE SORTING: BOOKINGS
//   if (sortBy) {
//     query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
//   }

//   // API SIDE PAGINATION

//   if (page) {
//     console.log("Next PAge");
//     const from = (page - 1) * PAGE_SIZE;
//     const to = from + PAGE_SIZE - 1;
//     query = query.range(from, to);
//     // const totalPages = Math.ceil(count! / PAGE_SIZE) || 1;
//     // const safePage = Math.min(page, totalPages);
//     // const from = (safePage - 1) * PAGE_SIZE;
//     // const to = from + PAGE_SIZE - 1;
//     // query = query.range(from, to);
//   }

//   const { data, error, count } = await query;

//   if (error) {
//     throw new Error("Bookings could not be loaded");
//   }
//   const bookingsData = data as Booking[];
//   return { bookingsData, count };
// }

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
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
    // .select('*')
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

export async function updateBooking(id: string, obj: Booking) {
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
  return data;
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
