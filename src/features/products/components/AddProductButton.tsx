import { PlusIcon } from "@heroicons/react/16/solid";
import type { FC } from "react";

interface AddProductButtonProps {
  onClick: () => void;
}

export const AddProductButton: FC<AddProductButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row gap-1 justify-center items-center p-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:shadow-sm active:bg-gray-100"
    >
      <PlusIcon className="w-5 h-5 text-slate-400" />
      <span className="text-slate-400">Add Product</span>
    </button>
  );
};
