import useSalesStore from "../store/useSalesStore";
import { useMemo } from "react";
import {
  ShoppingCartIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";

export default function StatsCards() {
  const { getTotalSales, getTotalReturns, getTotalOnlineSale, salesData } =
    useSalesStore();
  const stats = useMemo(
    () => ({
      sales: salesData,
      totalSales: getTotalSales(),
      online: getTotalOnlineSale(),
      returns: getTotalReturns(),
    }),
    [getTotalSales, getTotalReturns, getTotalOnlineSale, salesData]
  );

  return (
    <div className="flex gap-5">
      <div className="flex flex-col w-[250px] h-[150px] border border-gray-200 rounded-lg p-4">
        <div className="flex gap-4 items-center px-2">
          <div className="p-2 rounded shadow-sm">
            <ShoppingCartIcon className="w-5 h-5 text-blue-500 stroke-2" />
          </div>
          <div className="flex gap-1">
            <div className="flex justify-center items-center w-4 h-4 rounded-full bg-emerald-200">
              <ArrowUpRightIcon className="w-2 h-2 stroke-3 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400">
              +100%
            </span>
          </div>
        </div>
        <span className="text-slate-400 text-xs font-semibold mt-4">
          TOTAL SALES
        </span>
        <span className="text-2xl font-bold">{`$ ${stats.totalSales.toLocaleString()}`}</span>
        <span className="text-slate-400 text-xs">{`compare to ($1,000 last month)`}</span>
        {/*need to work on later*/}
      </div>
      <div className="flex flex-col w-[250px] h-[150px] border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col">
          <div className="flex gap-4 items-center px-2">
            <div className="p-2 rounded shadow-sm">
              <CreditCardIcon className="w-5 h-5 text-violet-500 stroke-2" />
            </div>
            <div className="flex gap-1">
              <div className="flex justify-center items-center w-4 h-4 rounded-full bg-rose-200">
                <ArrowDownRightIcon className="w-2 h-2 stroke-3 text-rose-400" />
              </div>
              <span className="text-[10px] font-bold text-rose-400">
                -10.82%
              </span>
            </div>
          </div>
          <span className="text-slate-400 text-xs font-semibold mt-4">
            ONLINE SALES
          </span>
          <span className="text-2xl font-bold">{`$ ${stats.online.toLocaleString()}`}</span>
          <span className="text-slate-400 text-xs">{`compare to ($1,000 last month)`}</span>
        </div>
      </div>
      <div className="flex flex-col w-[250px] h-[150px] border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col">
          <div className="flex gap-4 items-center px-2">
            <div className="p-2 rounded shadow-sm">
              <ReceiptRefundIcon className="w-5 h-5 text-yellow-500 stroke-2" />
            </div>
            <div className="flex gap-1">
              <div className="flex justify-center items-center w-4 h-4 rounded-full bg-rose-200">
                <ArrowDownRightIcon className="w-2 h-2 stroke-3 text-rose-400" />
              </div>
              <span className="text-[10px] font-bold text-rose-400">
                -10.82%
              </span>
            </div>
          </div>
          <span className="text-slate-400 text-xs font-semibold mt-4">
            RETURNS
          </span>
          <span className="text-2xl font-bold">{`$ ${stats.returns.toLocaleString()}`}</span>
          <span className="text-slate-400 text-xs">{`compare to ($1,000 last month)`}</span>
        </div>
      </div>
    </div>
  );
}
