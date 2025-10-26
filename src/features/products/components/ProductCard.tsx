import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import type { Products } from "../../../api/productsApi";

interface ProductCardProps {
  product: Products;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log("from product Card", product); //test

  return (
    <div className="flex flex-col justify-evenly items-center px-3 pt-1 pb-3 md:px-4 md:pt-2 md:pb-4 w-full h-auto border border-gray-200 rounded-lg shadow-md">
      <div className="flex justify-end w-full">
        <Popover>
          <PopoverButton
            type="button"
            className="flex justify-center items-center p-1 pr-0 cursor-pointer"
          >
            <EllipsisHorizontalIcon className="w-3 h-3 md:w-5 md:h-5 stroke-2 text-slate-400" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom end"
            className="flex flex-col gap-1 px-1 py-0.5 text-xs md:text-sm rounded-lg bg-white shadow-lg"
          >
            <button
              type="button"
              className="p-1 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              edit
            </button>
            <button
              type="button"
              className="p-1 rounded-lg text-rose-500 cursor-pointer hover:bg-gray-100"
            >
              delete
            </button>
          </PopoverPanel>
        </Popover>
      </div>
      <div>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-25 h-25 md:w-50 md:h-50"
        />
      </div>
      {/* divieded line */}
      <div className="w-full h-[1px] my-1 bg-gray-200 shadow-sm" />
      <div className="flex flex-col w-full">
        <h3 className="w-full self-start py-1 text-xs md:text-sm truncate">
          {product.title}
        </h3>
        <div className="flex flex-row justify-between w-full">
          {/* will add later */}
          <span>stock</span>
          <span className="self-end py-1 text-xs md:text-base">{`$${product.price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
