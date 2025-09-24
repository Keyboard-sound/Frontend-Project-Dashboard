import axios from "axios";

export interface Products {
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

export async function getProducts(): Promise<Products[]> {
  try {
    const res = await axios.get<Products[]>(
      "https://api.escuelajs.co/api/v1/products"
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}
