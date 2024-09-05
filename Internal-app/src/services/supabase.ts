import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gayavyzkiqxzxfdicgjv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdheWF2eXpraXF4enhmZGljZ2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMzI2NzAsImV4cCI6MjA0MDkwODY3MH0.qfaED_lGpjNwf-ObAPMVUuhKvYd2jIsAee_WXOsSM4k";
export const supabase = createClient(supabaseUrl, supabaseKey);
