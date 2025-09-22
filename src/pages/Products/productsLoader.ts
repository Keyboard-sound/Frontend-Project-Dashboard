import { getProductsList } from "../../api/getProducts";
import type { Products } from "../../api/getProducts";

export interface ProductsLoaderResult {
  products: Products[];
}

export async function productsLoader(): Promise<ProductsLoaderResult> {
  const products = await getProductsList();

  return {
    products,
  };
}
