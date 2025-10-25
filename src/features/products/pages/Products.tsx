import SearchInput from "../../../components/SearchInput";
import ProductList from "../components/ProductList";
import AddProductButton from "../components/AddProductButton";

export default function ProductsPage() {
  return (
    <div className="w-full h-screen p-4 rounded-lg bg-white overflow-auto">
      <div className="flex flex-row justify-end w-full mb-5">
        <SearchInput placeholder="search..." />
      </div>
      {/* card list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ProductList />
      </div>
      <div>
        <AddProductButton />
      </div>
    </div>
  );
}
