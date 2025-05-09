import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

// Create a single supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
