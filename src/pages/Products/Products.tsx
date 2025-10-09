import { useLoaderData } from "react-router";
import type { ProductsLoaderResult } from "./productsLoader";

export default function ProductsPage() {
  const { products } = useLoaderData() as ProductsLoaderResult;

  const renderProducts = products.map((p) => {
    return (
      <div
        key={p.id}
        className="flex flex-col justify-around items-center border border-gray-400 rounded-lg p-1 w-60 h-70 mx-auto"
      >
        <img src={p.images[0]} alt={p.title} className="w-50 h-50 rounded-sm" />
        <span className="text-xs text-center overflow-hidden">{p.title}</span>
        <span>{`$${p.price}`}</span>
      </div>
    );
  });
  return (
    <div className="w-full p-4 rounded-lg bg-white overflow-auto">
      <h1 className="pl-2 font-semibold text-lg mb-[10px]">Products Page</h1>
      <div className="flex flex-wrap items-center gap-y-6">
        {renderProducts}
      </div>
    </div>
  );
}
