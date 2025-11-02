import { useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import SearchInput from "./SearchInput";
import useSalesStore from "@/store/useSalesStore";
import type { FC } from "react";
import type { Product } from "@/api/productsApi";
import { AddProductButton } from "@/features/products/components/AddProductButton";

const MobileHeader: FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { products, setSearchQuery } = useSalesStore();
  const location = useLocation();

  const isProductsPage =
    location.pathname === "/products" ||
    location.pathname.startsWith("/products/");

  const handleSelectProduct = (product: Product | null) => {
    if (product) {
      setSearchQuery(product.title);
    } else {
      setSearchQuery("");
    }
  };

  return (
    <div className="sticky top-0 z-50 lg:hidden">
      <div className="flex justify-between items-center w-full h-14 pl-3 pr-1 py-2 font-bold bg-white shadow-sm">
        <button
          className="p-1 rounded-sm text-slate-400 active:bg-gray-100"
          onClick={() => onMenuClick()}
        >
          <Bars3Icon className="w-5 h-5 stroke-2" />
        </button>

        <div
          className={`
            flex flex-row items-center justify-between gap-1 h-9
            ${isProductsPage ? "visible" : "invisible"}
          `}
        >
          <AddProductButton />
          <SearchInput
            placeholder="search..."
            products={products}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
