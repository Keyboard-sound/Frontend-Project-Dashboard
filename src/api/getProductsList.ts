import axios from "axios";

export interface ProductsListRes {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export async function getProductsList(): Promise<ProductsListRes[]> {
  const res = await axios.get("https://fakestoreapi.com/products");
  const data = res.data;
  console.log(data);

  return data as ProductsListRes[];
}
