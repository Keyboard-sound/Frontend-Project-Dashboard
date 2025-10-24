import axios from "axios";

export interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface DummyJsonResponse {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(): Promise<Products[]> {
  // fetch max 20 product
  //set to fetch 15 product for testing
  try {
    const res = await axios.get<DummyJsonResponse>(
      "https://dummyjson.com/products?limit=15"
    );
    const data = res.data.products;
    console.log("data from dummy", data);

    return data;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}
