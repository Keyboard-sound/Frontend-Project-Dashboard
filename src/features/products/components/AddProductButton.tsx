import { PlusIcon } from "@heroicons/react/16/solid";
import type { FC } from "react";

interface AddProductButtonProps {
  onClick: () => void;
}

export const AddProductButton: FC<AddProductButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex flex-row justify-between items-center h-6 lg:h-8 p-1 border border-gray-200 rounded-lg bg-white cursor-pointer hover:shadow-sm active:bg-gray-100"
      >
        <PlusIcon className="size-3 lg:size-4 text-slate-400" />
        <span className="text-xs lg:text-sm font-normal text-slate-400">
          Add Product
        </span>
      </button>
    </>
  );
};
