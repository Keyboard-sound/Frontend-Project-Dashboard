import { AddProductButton } from "@/features/products/components/AddProductButton";
import ProductsSearchInput from "@/features/products/components/ProductsSearchInput";
import useSalesStore from "@/store/useSalesStore";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router";
import type { FC } from "react";
import type { Product } from "@/api/productsApi";

const MobileHeader: FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { setSearchQuery } = useSalesStore();
  const location = useLocation();
  const isProductPage = location.pathname.includes("/products");

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
    <div className="flex justify-between items-center w-full h-9 pl-3 pr-4 py-2 font-bold bg-white shadow-sm">
      <button
        className="p-1 rounded-sm text-slate-400 active:bg-gray-100"
        onClick={() => onMenuClick()}
      >
        <Bars3Icon className="w-5 h-5 stroke-2" />
      </button>

      {isProductPage && (
        <div className="flex flex-row justify-end items-center gap-1">
          <AddProductButton />
          <ProductsSearchInput
            placeholder={"search..."}
            onSelectProduct={handleProductSearch}
            onClear={handleClearSearch}
          />
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
