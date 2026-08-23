import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
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
};

export type ProductUpdateInput = Omit<Partial<Product>, "id" | "isLocal">;

interface DummyJsonResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(): Promise<Product[]> {
  // fetch max 20 product
  try {
    const res = await axios.get<DummyJsonResponse>(
      "https://dummyjson.com/products?limit=20",
    );
    const data = res.data.products;
    console.log("data from dummy", data);

    return data;
  } catch (error) {
    console.error("Fail to fetch products", error);
    return [];
  }
}

export async function createProduct(
  product: CreateProductInput,
): Promise<Product> {
  //Provided defaults for optional fields
  const productData = {
    description: "",
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    ...product,
  };

  //this create product api will return only name you send and id
  try {
    const res = await axios.post<Product>(
      "https://dummyjson.com/products/add",
      productData,
    );
    console.log("Product created:", res.data);
    // Mark the product as locally created
    return { ...res.data };
  } catch (error) {
    console.log("error creating product", error);
    throw error;
  }
}

export async function apiEditProduct(
  id: number,
  updates: ProductUpdateInput,
  isLocal: boolean = false,
  originalData?: Product,
): Promise<Product> {
  console.log("editProduct called with:", { id, isLocal, updates });

  // For locally created products, skip API call and return merged data
  if (isLocal && originalData) {
    console.log("Updating local product (skipping API call):", id);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return the full product with updates merged in
    return { ...originalData, ...updates, isLocal: true };
  }

  // For products from the API, make the actual update request
  const url = `https://dummyjson.com/products/${id}`;

  try {
    const res = await axios.put<Product>(url, updates);
    console.log("Update successful:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating product:", { id, url, error });
    throw error;
  }
}

export async function deleteProduct(id: number, isLocal: boolean) {
  //Skip API call for locally created product
  if (isLocal) return;

  try {
    const res = await axios.delete(`https://dummyjson.com/products/${id}`);

    return res.data;
  } catch (error) {
    console.log("delete product failed!");
    throw error;
  }
}
