import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/api/productsApi";
import type { FC } from "react";

interface SearchInputProps {
  placeholder: string;
  products: Product[];
  onSelectProduct?: (product: Product | null) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  return (
    //when small screen try to collapse to magnify button when clicked show search box
    <Combobox value={selectedProduct} onChange={handleSelect}>
      <div className="relative">
        <div className="flex items-center w-30 md:w-40 lg:w-50 h-9 border-1 border-gray-200 rounded-lg px-2 md:px-4 py-1">
          <ComboboxInput
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-full text-xs md:text-sm font-normal placeholder:text-2xs md:placeholder:text-xs placeholder:text-slate-400 focus:outline-none"
            placeholder={placeholder}
          />
          <MagnifyingGlassIcon className=" pl-0.5 w-4 h-4 md:w-5  md:h-5 stroke-2 text-slate-400" />
        </div>
        {query !== "" && (
          <ComboboxOptions
            transition
            anchor="bottom end"
            className="absolute z-50 w-50 p-1 rounded-lg shadow-md [--anchor-gap:--spacing(5)] bg-white data-closed:opacity-0"
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
        )}
      </div>
    </Combobox>
  );
};

export default SearchInput;
