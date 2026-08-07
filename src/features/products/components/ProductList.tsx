import { useEffect, useMemo } from "react";
import useSalesStore from "@store/useSalesStore";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const fetchProducts = useSalesStore((state) => state.fetchProducts);
  const productsLength = useSalesStore((state) => state.products.length);
  const products = useSalesStore((state) => state.products);
  const searchQuery = useSalesStore((state) => state.searchQuery);

  useEffect(() => {
    if (productsLength === 0) {
      console.log("fetch product called inside productList page");
      fetchProducts();
    }
  }, [productsLength, fetchProducts]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery?.trim()) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  if (filteredProducts.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        No products found matching your search.
      </div>
    );
  }

  return (
    <>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
