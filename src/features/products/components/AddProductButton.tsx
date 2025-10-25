import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddProductButton() {
  return (
    <>
      <button className="flex flex-row justify-center items-center w-10 h-10 border border-gray-200 rounded-full cursor-pointer shadow-sm">
        <PlusIcon className="w-5 h-5 text-slate-400" />
      </button>
    </>
  );
}
