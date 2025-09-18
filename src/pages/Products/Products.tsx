import { useLoaderData } from "react-router";
import type { ProductsLoaderResult } from "./productsLoader";

export default function ProductsPage() {
  const { products } = useLoaderData() as ProductsLoaderResult;

  const renderProducts = products.map((p) => {
    return (
      <div key={p.id} className="inline-block flex border rounded-lg">
        <img src={p.image} alt={p.title} className="w-40 h-40" />
        <span className="text-xs ">{p.title}</span>
      </div>
    );
  });
  return (
    <div className="w-full ml-2 p-4 rounded-lg bg-white">
      <h1 className="pl-2 font-semibold text-lg mb-[10px]">Products Page</h1>
      <div>{renderProducts}</div>
    </div>
  );
}
