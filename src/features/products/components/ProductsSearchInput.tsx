import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/api/productsApi";
import type { FC } from "react";
import useSalesStore from "@/store/useSalesStore";

interface SearchInputProps {
  placeholder: string;
  onSelectProduct: (product: Product | null) => void;
  onClear: () => void;
}

export const ProductsSearchInput: FC<SearchInputProps> = ({
  placeholder,
  onSelectProduct,
  onClear,
}) => {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products } = useSalesStore();

  const filteredProducts =
    query === ""
      ? []
      : products.filter((p) => {
          return p.title.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelect = (product: Product | null) => {
    setSelectedProduct(product);
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleClear = () => {
    setSelectedProduct(null);
    setQuery("");
    onClear();
  };

  return (
    <Combobox
      value={selectedProduct}
      onChange={handleSelect}
      onClose={() => setQuery("")}
    >
      <div className="flex justify-center items-center w-30 sm:w-50 lg:w-50 h-8 border-1 border-gray-200 rounded-lg px-2 py-1 has-[:focus]:ring-2 has-[:focus]:ring-blue-500">
        <MagnifyingGlassIcon className="w-5 h-5 pr-1 stroke-2 text-slate-400" />
        <ComboboxInput
          type="text"
          displayValue={(product: Product | null) =>
            product ? product.title : ""
          }
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full text-xs md:text-sm font-normal placeholder:text-2xs md:placeholder:text-xs placeholder:text-slate-400 focus:outline-none"
          placeholder={placeholder}
        />
        {(query || selectedProduct) && (
          <button
            type="button"
            onClick={() => handleClear()}
            className="inline-flex justify-center items-center w-4 h-4 p-0.5 rounded-full bg-slate-200/30 hover:bg-slate-200 cursor-pointer"
          >
            <XMarkIcon className="size-3 text-slate-400" />
          </button>
        )}
      </div>

      <ComboboxOptions
        transition
        anchor={{ to: "bottom end", gap: 6, offset: 25 }}
        className="z-50 w-50 p-1 rounded-lg shadow-md bg-white transition-opacity ease-out duration-200 data-closed:opacity-0 empty:hidden"
      >
        {filteredProducts.length === 0 && query !== "" ? (
          <div className="px-4 py-2 text-xs md:text-sm text-slate-400">
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ComboboxOption
              key={product.id}
              value={product}
              className="px-4 py-2 text-xs md:text-sm rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <div className="truncate">{product.title}</div>
            </ComboboxOption>
          ))
        )}
      </ComboboxOptions>
    </Combobox>
  );
};

export default ProductsSearchInput;
