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
    <div className="w-full rounded-lg bg-white">
      <div className="sticky top-9 lg:top-0 z-30 flex justify-end items-center gap-1 px-2 pt-4 pb-2 bg-white">
        <AddProductButton />
        <ProductsSearchInput
          placeholder={"search..."}
          onSelectProduct={handleProductSearch}
          onClear={handleClearSearch}
        />
      </div>
      {/* card list */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-4">
        <ProductList />
      </div>
    </div>
  );
}
