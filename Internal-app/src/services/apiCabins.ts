import { CreateCabinFormData } from "../schemas/createCabinFormSchema";
import { Cabin } from "../types/cabin";
import { supabase, supabaseUrl } from "./supabase";

export async function editCabin(
  id: string,
  updatedCabin: CreateCabinFormData
): Promise<Cabin> {
  // Check if there's a new image to upload
  let imagePath;

  if (updatedCabin.image && updatedCabin.image instanceof File) {
    // Upload the new image
    const imageName = `${Math.random()}-${updatedCabin.image.name}`.replace("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // Upload new image to storage
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, updatedCabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }
  // Prepare the data to update
  const cabinData = {
    ...updatedCabin,
    // Only update the image if a new one was uploaded
    ...(imagePath && { image: imagePath }),
  };

  // If updatedCabin.image is a File object, we've handled it above
  // If it's a string (existing image URL), we want to keep it
  // If it's empty or null, we don't want to include it in the update
  if (cabinData.image instanceof File) {
    delete cabinData.image;
  }

  // Update the cabin in the database
  const { data, error } = await supabase
    .from("cabins")
    .update(cabinData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }
  return data as Cabin;
}

export async function createCabin(newCabin: CreateCabinFormData): Promise<Cabin> {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  const cabinData = data as Cabin;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabinData.id);
    console.log(storageError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
  }

  return cabinData;
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
