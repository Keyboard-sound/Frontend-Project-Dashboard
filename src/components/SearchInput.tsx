import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

const SearchInput: FC<{ placeholder: string }> = ({ placeholder }) => {
  return (
    //when small screen try to collapse to magnify button when clicked show search box
    <div className="flex items-center w-30 h-6 lg:w-50 lg:h-10 border-2 border-gray-200 rounded-lg px-2 md:px-4 py-1">
      <input
        type="text"
        className="w-full h-full text-sm placeholder:text-xs placeholder:text-slate-400 focus:outline-none"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className=" pl-0.5 w-5  h-5 stroke-2 text-slate-400" />
    </div>
  );
};

export default SearchInput;
