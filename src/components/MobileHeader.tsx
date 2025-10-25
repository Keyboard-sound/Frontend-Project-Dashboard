import type { FC } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const MobileHeader: FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  return (
    <div className="sticky top-0 z-50 lg:hidden">
      <div className="flex items-center w-full pl-3 pr-1 py-2 lg:px-2 font-bold bg-white shadow-sm">
        <button
          className="p-1 rounded-sm text-slate-400 active:bg-gray-100"
          onClick={() => onMenuClick()}
        >
          <Bars3Icon className="w-5 h-5 stroke-2" />
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
