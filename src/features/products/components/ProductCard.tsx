import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import useSalesStore from "@store/useSalesStore";
import type { Products } from "@api/productsApi";

interface ProductCardProps {
  product: Products;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // console.log("from product Card", product); //test
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Products>>({});

  const { deleteProduct, editProduct, loading } = useSalesStore();

  const handleEdit = (close: () => void) => {
    setEditingId(product.id);
    setEditForm({ ...product });
    close();
  };

  const handleEditSave = async () => {
    try {
      if (editingId !== null) {
        await editProduct(editingId, editForm);
        setEditingId(null);
      }
    } catch (error) {
      console.log("save editing product failed!", error);
      alert("Failed to save product");
    }
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
      alert("Failed to delete product");
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center px-3 pt-1 pb-3 md:px-4 md:pt-2 md:pb-4 w-full h-auto border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-end w-full">
        <Popover>
          <PopoverButton
            type="button"
            className="flex justify-center items-center cursor-pointer focus:outline-none"
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
        <div className="flex flex-row justify-between items-center gap-1 h-8 text-xs md:text-sm">
          {editingId === product.id ? (
            <>
              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="w-[80%] h-full px-1 border border-gray-200 rounded-sm focus:outline-none"
              />
              <button
                type="button"
                disabled={loading}
                onClick={handleEditSave}
                className="h-full p-1 border border-gray-200 rounded-sm text-xs text-slate-400 bg-white cursor-pointer hover:bg-gray-100 focus:outline-none disabled:bg-gray-200"
              >
                save
              </button>
            </>
          ) : (
            <h3 className="truncate"> {product.title}</h3>
          )}
        </div>
        <div className="flex flex-row justify-between items-center gap-1 h-8 text-xs md:text-base">
          {/* stock quantity */}
          {editingId === product.id ? (
            <input
              type="number"
              value={editForm.stock}
              onChange={(e) =>
                setEditForm({ ...editForm, stock: Number(e.target.value) })
              }
              className="w-11 h-full px-1 border border-gray-200 rounded-sm focus:outline-none"
            />
          ) : (
            <span>{`in stock: ${product.stock}`}</span>
          )}
          {/* product price */}
          {editingId === product.id ? (
            <>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: Number(e.target.value) })
                }
                className="w-11 h-full px-1 border border-gray-200 rounded-sm focus:outline-none"
              />
              <button className="h-full p-1 border border-gray-200 rounded-sm text-xs text-rose-500 bg-white cursor-pointer hover:bg-gray-100 focus:outline-none disabled:bg-gray-200">
                cancel
              </button>
            </>
          ) : (
            <span>{`$${product.price}`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
