import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "@heroicons/react/24/outline";
import type { ComponentProps, ComponentType, FC } from "react";

export const StatCard: FC<{
  title: string;
  value: string;
  icon: ComponentType<ComponentProps<"svg">>;
  trend: "up" | "down" | null;
  trendValue: string | null;
  compareValue: string | null;
  color: string;
}> = ({ title, value, icon: Icon, trend, trendValue, compareValue, color }) => {
  const renderedTrendIndicator = (
    trend: "up" | "down" | null,
    trendValue: string | null
  ) => {
    if (trend === null || !trendValue) {
      return null;
    }
    const isUp = trend === "up";

    return (
      <div className="flex gap-1 h-4">
        {trend !== null && trendValue && (
          <>
            <div
              className={`flex justify-center items-center w-4 h-4 rounded-full ${
                isUp ? "bg-emerald-200" : "bg-rose-200"
              }`}
            >
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
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-2 lg:p-4 lg:flex-1 lg:space-y-1.5">
      <div className="flex gap-2 lg:gap-4 items-center px-2">
        <div className="p-2 rounded shadow-sm">
          <Icon className={`w-5 h-5 ${color} stroke-2`} />
        </div>
        {renderedTrendIndicator(trend, trendValue)}
      </div>

      <span className="text-slate-400 text-[10px] lg:text-xs font-semibold mt-4">
        {title}
      </span>
      <span className="text-md lg:text-2xl font-bold">{value}</span>
      <span className="text-slate-400 text-3xs md:text-2xs lg:text-xs">{`compared to ${compareValue} (same period LY)`}</span>
    </div>
  );
};
