import axios from "axios";

export interface ProductsListRes {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

export async function getProductsList(): Promise<ProductsListRes[]> {
  try {
    const res = await axios.get<ProductsListRes[]>(
      "https://api.escuelajs.co/api/v1/products"
    );
    const data = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}
