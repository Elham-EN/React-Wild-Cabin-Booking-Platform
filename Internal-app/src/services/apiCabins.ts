import { CreateCabinFormData } from "../schemas/createCabinFormSchema";
import { Cabin } from "../types/cabin";
import { supabase } from "./supabase";

export async function createCabin(newCabin: CreateCabinFormData): Promise<void> {
  const { error } = await supabase.from("cabins").insert([newCabin]);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
}

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");
  const cabins = data as Cabin[];
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}

export async function deleteCabin(id: string): Promise<void> {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
