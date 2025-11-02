import SearchInput from "@components/SearchInput";
import useSalesStore from "@/store/useSalesStore";
import { AddProductButton } from "./AddProductButton";
import type { Product } from "@/api/productsApi";
import type { FC } from "react";

const ProductToolBar: FC = () => {
  const { products, setSearchQuery } = useSalesStore();

  const handleSelectProduct = (product: Product | null) => {
    if (product) {
      setSearchQuery(product.title);
    } else {
      setSearchQuery("");
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      {/* Add product button */}

      <AddProductButton />
      <div>
        <SearchInput
          placeholder="search..."
          products={products}
          onSelectProduct={handleSelectProduct}
        />
      </div>
    </div>
  );
};

export default ProductToolBar;
