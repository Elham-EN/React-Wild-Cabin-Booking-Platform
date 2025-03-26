import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const createCabinFormSchema = z.object({
  // Validates the cabin name as a required string with a maximum length
  name: z
    .string()
    .min(1, "Cabin name is required")
    .max(50, "Cabin name must be 50 characters or less"),
  // Ensures maxCapacity is a positive integer with a reasonable upper limit.
  maxCapacity: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") return parseInt(val, 10);
      return val;
    })
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val > 0, "Maximum capacity must be greater than 0")
    .refine((val) => val <= 100, "Maximum capacity cannot exceed 100"),
  // Checks that regularPrice is a positive number.
  regularPrice: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") return parseFloat(val);
      return val;
    })
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val > 0, "Regular price must be greater than 0"),
  // Allows discount to be a number between 0 and 100.
  discount: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") return parseFloat(val);
      return val;
    })
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val >= 0, "Discount cannot be negative")
    .refine((val) => val <= 100, "Discount cannot exceed 100%"),
  // Limits the description to 500 characters.
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .min(100, "Description must have at least 100 characters to describe the cabin"),
  // Validates that the image is a file of an accepted type and size.
  image: z
    .any()
    .refine((files) => {
      if (!files || files.length === 0) return true; // optional during edit
      return files instanceof FileList ? files.length > 0 : true;
    }, "Image is required")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const file = files instanceof FileList ? files[0] : files;
      return file instanceof File ? file.size <= MAX_FILE_SIZE : true;
    }, `File size should be less than 5MB`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const file = files instanceof FileList ? files[0] : files;
      return file instanceof File ? ACCEPTED_IMAGE_TYPES.includes(file.type) : true;
    }, "Only .jpg, .jpeg, .png and .webp formats are supported"),
});

type CreateCabinFormData = z.infer<typeof createCabinFormSchema>;

export { createCabinFormSchema };
export type { CreateCabinFormData };
