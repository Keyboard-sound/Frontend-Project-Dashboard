import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import useSalesStore from "@store/useSalesStore";
import type { Product } from "@api/productsApi";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // console.log("from product Card", product); //test
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({
    title: product.title,
    stock: product.stock,
    price: product.price,
  });

  const { deleteProduct, editProduct, loading } = useSalesStore();

  const handleEdit = (close: () => void) => {
    setEditingId(product.id);
    close();
  };

  const handleEditSave = async () => {
    try {
      if (editingId !== null) {
        await editProduct(editingId, editForm);
        alert(`Product "${editForm.title || "item"}" saved successfully!`);
        setEditingId(null);
      }
    } catch (error) {
      console.log("save editing product failed!", error);
      alert(
        `Failed to save product: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (close: () => void) => {
    try {
      //use confirm func for prototype
      if (confirm(`Delete ${product.title}?`)) {
        await deleteProduct(product.id);
        close();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(
        `Failed to delete product: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };
  const isEditing = editingId === product.id;
  return (
    <div className="flex flex-col justify-evenly items-center p-2 md:p-4 w-full h-auto border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="relative flex justify-between items-center w-full h-5">
        <div
          className={`flex justify-between items-center gap-1 ${
            isEditing ? "visible" : "invisible"
          }`}
        >
          <button
            type="button"
            disabled={loading}
            onClick={() => handleEditSave()}
            className="p-0.5 md:p-1 border border-gray-200 rounded-sm text-2xs md:text-xs text-slate-400 bg-white cursor-pointer hover:bg-gray-100 focus:outline-none disabled:bg-gray-200"
          >
            save
          </button>

          <button
            type="button"
            onClick={() => handleCancel()}
            className="p-0.5 md:p-1 border border-gray-200 rounded-sm text-2xs md:text-xs text-rose-500 bg-white cursor-pointer hover:bg-gray-100 focus:outline-none disabled:bg-gray-200"
          >
            cancel
          </button>
        </div>

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
            {({ close }) => (
              <>
                <button
                  type="button"
                  onClick={() => handleEdit(close)}
                  className="p-1 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(close)}
                  className="p-1 rounded-lg text-rose-500 cursor-pointer hover:bg-gray-100"
                >
                  delete
                </button>
              </>
            )}
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
      <div className="flex flex-col w-full space-y-1 overflow-hidden">
        {/* product title */}
        <div className="flex flex-row justify-between items-center gap-1 h-5 md:h-8 text-xs md:text-sm">
          {isEditing ? (
            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              className="w-full h-full px-1 border border-gray-200 rounded-sm focus:outline-none"
            />
          ) : (
            <h3 className="truncate"> {product.title}</h3>
          )}
        </div>
        <div className="flex flex-row justify-between items-center gap-1 h-5 md:h-8 text-xs md:text-sm">
          {/* stock quantity */}
          {isEditing ? (
            <input
              type="number"
              value={editForm.stock}
              onChange={(e) =>
                setEditForm({ ...editForm, stock: Number(e.target.value) })
              }
              className="flex-1 w-full h-full px-1 border border-gray-200 rounded-sm focus:outline-none"
            />
          ) : (
            <span>{`in stock: ${product.stock.toLocaleString()}`}</span>
          )}
          {/* product price */}
          {isEditing ? (
            <input
              type="number"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: Number(e.target.value) })
              }
              className="flex-1 w-full h-full px-1 border border-gray-200 rounded-sm focus:outline-none"
            />
          ) : (
            <span>{`$${product.price}`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
