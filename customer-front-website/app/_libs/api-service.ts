import { supabase } from "@/app/_libs/supabase";
import { notFound } from "next/navigation";
import { Cabin } from "@/app/_types/Cabin";

export const getCabins = async (): Promise<Cabin[]> => {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  const cabinsData = data as Cabin[];
  return cabinsData;
};

export const getCabin = async (id: string): Promise<Cabin> => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    notFound();
  }
  const cabinData = data as Cabin;
  return cabinData;
};
