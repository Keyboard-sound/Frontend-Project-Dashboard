import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import useSalesStore from "@store/useSalesStore";
import type { Product } from "@api/productsApi";

interface ProductCardProps {
  product: Product;
  onEditClick: (productId: number) => void;
}

const ProductCard = ({ product, onEditClick }: ProductCardProps) => {
  const { deleteProduct } = useSalesStore();

  const handleDelete = async () => {
    try {
      //use confirm func for prototype
      if (confirm(`Delete ${product.title}?`)) {
        await deleteProduct(product.id);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(
        `Failed to delete product: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center p-2 md:p-4 w-full h-auto border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="relative flex justify-between items-center w-full h-5">
        <Popover>
          <PopoverButton
            type="button"
            className="absolute top-0.5 bottom-0.5 right-0 flex justify-center items-center cursor-pointer focus:outline-none"
          >
            <EllipsisHorizontalIcon className="w-5 h-5 stroke-2 text-slate-400" />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom end"
            className="flex flex-col gap-1 px-1 py-0.5 text-xs md:text-sm rounded-lg bg-white shadow-lg transition duration-200 ease-out data-closed:opacity-0 data-open:opacity-95 data-open:scale-100"
          >
            <button
              type="button"
              onClick={() => onEditClick(product.id)}
              className="p-1 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete()}
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
          fetchPriority="high"
          className="w-50 h-50 object-cover"
        />
      </div>
      {/* divided line */}
      <div className="w-full h-[1px] my-1 bg-gray-200 shadow-sm" />

      <div className="flex flex-col w-full space-y-1 overflow-hidden">
        {/* product title */}
        <div className="flex flex-col justify-center items-start gap-1 min-h-14 text-xs md:text-sm">
          <p className="line-clamp-1">{product.title}</p>
          {/*Product description */}
          <p className="w-full text-3xs md:text-xs text-slate-400 font-normal line-clamp-2 break-all">
            {product.description}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          {/* stock quantity */}
          <span className="inline-block px-1 py-1 md:py-1.5 text-xs md:text-sm">{`in stock: ${product.stock.toLocaleString()}`}</span>
        </div>
        {/* product price */}
        <div className="flex-1 text-right">
          <span className="inline-block px-1 py-1 md:py-1.5 text-xs md:text-sm">
            {`$${product.price}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
