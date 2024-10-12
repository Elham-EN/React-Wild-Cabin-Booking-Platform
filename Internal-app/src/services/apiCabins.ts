import { CreateCabinFormData } from "../schemas/createCabinFormSchema";
import { Cabin } from "../types/cabin";
import { supabase, supabaseUrl } from "./supabase";

export async function createCabin(newCabin: CreateCabinFormData): Promise<void> {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  const cabinData = data as unknown as Cabin;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabinData.id);
    console.log(storageError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
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
