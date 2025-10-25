import { useEffect } from "react";
import useSalesStore from "../../../store/useSalesStore";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, fetchProducts } = useSalesStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
