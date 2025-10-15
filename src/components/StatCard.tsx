import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "@heroicons/react/24/outline";
import type { ComponentProps, ComponentType, FC } from "react";

export const StatCard: FC<{
  title: string;
  value: string;
  icon: ComponentType<ComponentProps<"svg">>;
  trend: "up" | "down";
  trendValue: string;
  color: string;
}> = ({ title, value, icon: Icon, trend, trendValue, color }) => {
  const isUp = trend === "up";

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-2 lg:flex-1 lg:p-4 lg:space-y-1.5">
      <div className="flex gap-2 lg:gap-4 items-center px-2">
        <div className="p-2 rounded shadow-sm">
          <Icon className={`w-5 h-5 ${color} stroke-2`} />
        </div>
        <div className="flex gap-1">
          <div className="flex justify-center items-center w-4 h-4 rounded-full bg-emerald-200">
            {isUp ? (
              <ArrowUpRightIcon className="w-2 h-2 stroke-3 text-emerald-400" />
            ) : (
              <ArrowDownRightIcon className="w-2 h-2 stroke-3 text-rose-400" />
            )}
          </div>
          <span
            className={`text-[10px] font-bold ${
              isUp ? "text-emerald-400" : "text-rose-500"
            }`}
          >
            {trendValue}
          </span>
        </div>
      </div>
      <span className="text-slate-400 text-[10px] lg:text-xs font-semibold mt-4">
        {title}
      </span>
      <span className="text-md lg:text-2xl font-bold">{value}</span>
      <span className="text-slate-400 text-[10px] lg:text-xs">{`compare to ($1,000 last month)`}</span>
      {/*need to work on later*/}
    </div>
  );
};
