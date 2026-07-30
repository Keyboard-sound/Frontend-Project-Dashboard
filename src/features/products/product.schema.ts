import { z } from "zod";

export const ProductInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  description: z.string().optional(),
  stock: z.number().min(1, "Stock must be greater than 0"),
});

export type ProductInput = z.infer<typeof ProductInputSchema>;
