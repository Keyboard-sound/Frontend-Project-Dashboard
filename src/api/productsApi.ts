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
  isLocal?: boolean; // Flag to track locally created products
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
    ...product, // ← Override defaults with user's input
  };

  try {
    const res = await axios.post<Products>(
      "https://dummyjson.com/products/add",
      productData
    );
    console.log("Product created:", res.data);
    // Mark the product as locally created
    return { ...res.data, isLocal: true };
  } catch (error) {
    console.log("error creating product", error);
    throw error;
  }
}

export async function editProduct(
  id: number,
  updates: Partial<Products>,
  isLocal: boolean = false,
  originalProduct?: Products
): Promise<Products> {
  console.log("editProduct called with:", { id, isLocal, updates });
  // For locally created products, skip API call and return merged data
  if (isLocal && originalProduct) {
    console.log("Updating local product (skipping API call):", id);
    // Return the full product with updates merged in
    return { ...originalProduct, ...updates };
  }
  // For products from the API, make the actual update request
  const url = `https://dummyjson.com/products/${id}`;

  try {
    const res = await axios.put(url, updates);
    console.log("Update successful:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating product:", { id, url, error });
    if (axios.isAxiosError(error)) {
      console.error("Response:", error.response?.data);
      console.error("Status:", error.response?.status);
    }
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
