import SearchInput from "../../components/SearchInput";
import ProductList from "../../components/ProductList";

export default function ProductsPage() {
  return (
    <div className="w-full h-screen p-4 rounded-lg bg-white overflow-auto">
      <div className="flex flex-row justify-end w-full mb-5">
        <SearchInput placeholder="search..." />
      </div>
      {/* card */}
      <div className="flex flex-wrap items-center gap-y-6">
        <ProductList />
      </div>
    </div>
  );
}
