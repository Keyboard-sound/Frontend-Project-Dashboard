import { getProductsList } from "../../api/getProductsList";
import type { ProductsListRes } from "../../api/getProductsList";

export interface ProductsLoaderResult {
  products: ProductsListRes[];
}

export async function productsLoader(): Promise<ProductsLoaderResult> {
  const products = await getProductsList();

  return {
    products,
  };
}
