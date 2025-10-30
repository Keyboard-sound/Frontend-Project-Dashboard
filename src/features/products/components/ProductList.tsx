import { useEffect } from "react";
import useSalesStore from "@store/useSalesStore";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, fetchProducts, getFilteredProducts } = useSalesStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  const filteredProduct = getFilteredProducts();

  if (filteredProduct.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        No products found matching your search.
      </div>
    );
  }

  return (
    <>
      {filteredProduct.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
