import { PlusIcon } from "@heroicons/react/24/outline";
import SearchInput from "../../../components/SearchInput";

export default function ProductToolBar() {
  return (
    <div className="flex flex-row justify-end gap-2">
      <button type="button" className="flex flex-row justify-center items-center w-10 h-10 border border-gray-200 rounded-lg bg-white cursor-pointer shadow-sm hover:bg-slate-100">
        <PlusIcon className="w-5 h-5 text-slate-400" />
      </button>
      <SearchInput placeholder="search..." />
    </div>
  );
}
