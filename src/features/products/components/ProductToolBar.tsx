import ProductsSearchInput from "@/features/products/components/ProductsSearchInput";
import useSalesStore from "@/store/useSalesStore";
import { AddProductButton } from "./AddProductButton";
import type { Product } from "@/api/productsApi";
import type { FC } from "react";

const ProductToolBar: FC = () => {
  const { setSearchQuery } = useSalesStore();

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
        <ProductsSearchInput
          placeholder="search..."
          onSelectProduct={handleSelectProduct}
          productsData={[]}
          onClear={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};

export default ProductToolBar;
