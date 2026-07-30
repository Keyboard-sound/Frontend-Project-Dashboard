import ProductList from "../components/ProductList";
import { AddProductButton } from "../components/AddProductButton";
import { ProductsSearchInput } from "../components/ProductsSearchInput";
import useSalesStore from "@/store/useSalesStore";
import type { Product } from "@api/productsApi";

export default function ProductsPage() {
  const { setSearchQuery } = useSalesStore();

  const handleProductSearch = (product: Product | null) => {
    if (product) {
      setSearchQuery(product.title);
    } else {
      setSearchQuery("");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="w-full h-screen rounded-lg bg-white overflow-auto">
      <div className="px-4 py-4">
        <div className="flex justify-end items-center mb-2 gap-1">
          <AddProductButton />
          <ProductsSearchInput
            placeholder={"search..."}
            onSelectProduct={handleProductSearch}
            onClear={handleClearSearch}
          />
        </div>
        {/* card list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
