import useSalesStore, { sortSalesByDate } from "@/store/useSalesStore";
import { formatCurrency, getDaysAgo } from "@/utils/formatter";
import UserProfile from "@/assets/icons/user-profile.svg?react";

const RecentSales = () => {
  const { salesData } = useSalesStore();

  return (
    <>
      <h3 className="text-base font-semibold">Recent Sales</h3>
      {sortSalesByDate(salesData)
        .slice(-5)
        .reverse()
        .map((sale) => (
          <div
            key={sale.id}
            className="flex flex-row justify-between items-center rounded-lg p-1"
          >
            <div className="flex flex-row items-center gap-3">
              <UserProfile className="w-8 h-8 text-slate-500" />
              <div className="flex flex-col">
                <span className="text-sm md:text-base">
                  {sale.customerName}
                </span>
                <span className="text-2xs md:text-xs text-slate-400">
                  {getDaysAgo(sale?.date)}
                </span>
              </div>
            </div>
            <span className="text-xs md:text-base text-emerald-400">
              {formatCurrency(sale.total)}
            </span>
          </div>
        ))}
    </>
  );
};

export default RecentSales;
