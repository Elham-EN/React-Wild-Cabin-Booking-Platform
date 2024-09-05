import { Cabin } from "../types/cabin";
import { supabase } from "./supabase";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");
  const cabins = data as Cabin[];
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}
