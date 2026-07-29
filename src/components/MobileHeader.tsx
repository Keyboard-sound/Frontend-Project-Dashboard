import { Bars3Icon } from "@heroicons/react/24/outline";
import type { FC } from "react";

const MobileHeader: FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  return (
    <div className="flex justify-between items-center w-full h-9 pl-3 pr-1 py-2 font-bold bg-white shadow-sm">
      <button
        className="p-1 rounded-sm text-slate-400 active:bg-gray-100"
        onClick={() => onMenuClick()}
      >
        <Bars3Icon className="w-5 h-5 stroke-2" />
      </button>
    </div>
  );
};

export default MobileHeader;
