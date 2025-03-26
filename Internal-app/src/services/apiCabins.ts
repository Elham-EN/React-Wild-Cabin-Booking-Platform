import { CreateCabinFormData } from "../schemas/createCabinFormSchema";
import { Cabin } from "../types/cabin";
import { supabase, supabaseUrl } from "./supabase";

// update an existing cabin record in the Supabase
export async function editCabin(
  id: string,
  updatedCabin: CreateCabinFormData
): Promise<Cabin> {
  // Check if there's a new image to upload
  let imagePath;

  /**
   * This section checks if a new image has been provided for the cabin.
   * It only processes the image if:
   *  updatedCabin.image exists (not null or undefined)
   *  It's an instance of the File object (meaning it's a new file upload)
   */
  if (updatedCabin.image && updatedCabin.image instanceof File) {
    const file = updatedCabin.image;

    // Size validation
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image file is too large (max 5MB)");
    }

    // Type validation
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only JPG, PNG and WebP are supported");
    }

    // Upload the new image:
    // Generates a random filename to prevent collisions
    const imageName = `${Math.random()}-${updatedCabin.image.name}`.replace("/", "");
    // Constructs the full image path for storage
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    // Upload new image to the Supabase storage bucket
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, updatedCabin.image);
    // Handles any potential errors during upload
    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }
  // Prepare the data to update
  const cabinData = {
    // It spreads all the updated cabin properties into a new object
    ...updatedCabin,
    // It conditionally adds the new image path only if a new image was uploaded
    ...(imagePath && { image: imagePath }),
  };

  /**
    This block of code is what handles the distinction between File objects 
    and string URLs. Here's how it works:

    1. First, it checks if cabinData.image is a File object using instanceof File
    2. If it is a File object, it deletes that property from the cabinData object

    The reason for this is:
    - If the image is a File object, it means the user has selected a new image
    - We've already processed this File object earlier in the function by:
      - Uploading it to storage
      - Setting the imagePath variable to the URL
      - Including that URL in the cabinData using 
        ...(imagePath && { image: imagePath })
   */
  if (cabinData.image instanceof File) {
    delete cabinData.image;
  }

  // Updates the cabin record in the database for the specified ID
  const { data, error } = await supabase
    .from("cabins")
    .update(cabinData)
    .eq("id", id)
    .select()
    .single(); // return the updated single record

  // Handles any database errors that might occur
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }
  return data as Cabin;
}

export async function duplicateCabin(cabinId: string, cabin: CreateCabinFormData) {
  // Check if the cabin data exist first
  if (!cabinId) return;
  // Dont need to upload new image. Duplicate Cabin data to the DB
  const { data, error } = await supabase.from("cabins").insert(cabin).select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  const cabinData = data as Cabin;

  return cabinData;
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
