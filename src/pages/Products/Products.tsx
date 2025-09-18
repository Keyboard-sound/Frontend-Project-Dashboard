import { useLoaderData } from "react-router";
import type { ProductsLoaderResult } from "./productsLoader";

export default function ProductsPage() {
  const { products } = useLoaderData() as ProductsLoaderResult;

  const renderProducts = products.map((p) => {
    return (
      <div
        key={p.id}
        className="flex flex-col justify-around items-center border border-gray-400 rounded-lg p-1 w-40 h-50"
      >
        <img src={p.image} alt={p.title} className="w-20 h-20" />
        <span className="text-xs text-center overflow-hidden">{p.title}</span>
      </div>
    );
  });
  return (
    <div className="w-full ml-2 p-4 rounded-lg bg-white">
      <h1 className="pl-2 font-semibold text-lg mb-[10px]">Products Page</h1>
      <div className="flex flex-wrap gap-2">{renderProducts}</div>
    </div>
  );
}
