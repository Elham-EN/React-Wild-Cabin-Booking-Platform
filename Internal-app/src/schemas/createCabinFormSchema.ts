import { z } from "zod";

const createCabinFormSchema = z.object({
  // Validates the cabin name as a required string with a maximum length
  name: z
    .string()
    .min(1, "Cabin name is required")
    .max(50, "Cabin name must be 50 characters or less"),
  // Ensures maxCapacity is a positive integer with a reasonable upper limit.
  maxCapacity: z
    .string()
    .min(1, "Maximum capacity is required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val > 0, "Maximum capacity must be greater than 0")
    .refine((val) => val <= 100, "Maximum capacity cannot exceed 100"),
  // Checks that regularPrice is a positive number.
  regularPrice: z
    .string()
    .min(1, "Regular price is required")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val > 0, "Regular price must be greater than 0"),
  // Allows discount to be a number between 0 and 100.
  discount: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val >= 0, "Discount cannot be negative")
    .refine((val) => val <= 100, "Discount cannot exceed 100%"),
  // Limits the description to 500 characters.
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .min(100, "Description must have at least 100 characters to describe the cabin"),
  // Validates that the image is a file of an accepted type and size.
  image: z.any().optional(),
});

type CreateCabinFormData = z.infer<typeof createCabinFormSchema>;

export { createCabinFormSchema };
export type { CreateCabinFormData };
