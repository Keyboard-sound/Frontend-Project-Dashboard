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

export type CreateProductInput = {
  title: string;
  price: number;
  description?: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

interface DummyJsonResponse {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(): Promise<Products[]> {
  // fetch max 20 product
  try {
    const res = await axios.get<DummyJsonResponse>(
      "https://dummyjson.com/products?limit=20"
    );
    const data = res.data.products;
    console.log("data from dummy", data);

    return data;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function createProduct(
  product: CreateProductInput
): Promise<Products> {
  //Provided defaults for optional fields
  const productData = {
    description: "",
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "https://via.placeholder.com/150",
    images: ["https://via.placeholder.com/150"],
    ...product,
  };

  try {
    const res = await axios.post<Products>(
      "https://dummyjson.com/products/add",
      productData
    );
    console.log("Product created:", res.data);
    return res.data;
  } catch (error) {
    console.log("error creating product", error);
    throw error;
  }
}

export async function editProduct(
  id: number,
  updates: Partial<Products>
): Promise<Products> {
  try {
    const res = await axios.put(
      `https://dummyjson.com/products/${id}`,
      updates
    );

    return res.data;
  } catch (error) {
    console.log("error updating product", error);
    throw error;
  }
}

export async function deleteProduct(id: number) {
  try {
    const res = await axios.delete(`https://dummyjson.com/products/${id}`);

    return res.data;
  } catch (error) {
    console.log("delete product failed!");
    throw error;
  }
}
