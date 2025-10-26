import { PlusIcon } from "@heroicons/react/24/outline";
import SearchInput from "@components/SearchInput";

export default function ProductToolBar() {
  return (
    <div className="flex flex-row justify-between gap-2">
      <button
        type="button"
        className="flex flex-row gap-1 justify-center items-center p-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:shadow-sm active:bg-gray-100"
      >
        <PlusIcon className="w-5 h-5 text-slate-400" />
        <span className="text-slate-400">Add Product</span>
      </button>
      <div>
        <SearchInput placeholder="search..." />
      </div>
    </div>
  );
}
