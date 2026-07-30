import { z } from "zod";

export const ProductInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().optional(),
  stock: z.number().min(0, "Stock must be greater than or equal to 0"),
});

export type ProductInput = z.infer<typeof ProductInputSchema>;
