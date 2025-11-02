import { useMemo } from "react";
import useSalesStore from "@/store/useSalesStore";

export default function useSalesStat() {
  const { salesData, filters, lastYearData } = useSalesStore();

  return useMemo(() => {
    const filtered = salesData.filter((sale) => {
      if (!sale.date) return false;

      const dayDiff = Math.floor(
        (Date.now() - new Date(sale.date).getTime()) / (1000 * 60 * 60 * 24)
      );
      const dayLimit = parseInt(filters.dateRange.replace("d", ""));

      return dayDiff <= dayLimit;
    });

    const totalSales = filtered.reduce((sum, sale) => {
      return sale.status !== "pending" ? sum + (sale.total || 0) : sum;
    }, 0);

    const totalOnline = filtered.reduce((sum, sale) => {
      return sale.channel === "online" && sale.status === "completed"
        ? sum + (sale.total || 0)
        : sum;
    }, 0);

    const totalReturns = filtered.reduce((sum, sale) => {
      return sale.status === "returns" ? sum + (sale.total || 0) : sum;
    }, 0);

    const lastYear = lastYearData?.[filters.dateRange] || {
      totalPhysicalSales: 0,
      totalOnlineSales: 0,
      totalReturns: 0,
      totalSales: 0,
    };
    const totalSalesLastYear = lastYear.totalSales;
    const totalOnlineSalesLastYear = lastYear.totalOnlineSales;
    const totalReturnsLastYear = lastYear.totalReturns;

    const totalSalesChange =
      totalSalesLastYear === 0
        ? null
        : (
            ((totalSales - totalSalesLastYear) / totalSalesLastYear) *
            100
          ).toFixed(2);

    const totalOnlineSalesChange =
      lastYear.totalOnlineSales === 0
        ? null
        : (
            ((totalOnline - lastYear.totalOnlineSales) /
              lastYear.totalOnlineSales) *
            100
          ).toFixed(2);

    const totalReturnsChange =
      lastYear.totalReturns === 0
        ? null
        : (
            ((totalReturns - lastYear.totalReturns) / lastYear.totalReturns) *
            100
          ).toFixed(2);

    const aggregatedByDate = Object.values(
      filtered.reduce((acc, sale) => {
        if (sale.status !== "completed") return acc;

        const dateKey = new Date(sale.date).toISOString().split("T")[0];

        if (!acc[dateKey]) {
          acc[dateKey] = { date: dateKey, onlineTotal: 0, physicalTotal: 0 };
        }

        if (sale.channel === "online") {
          acc[dateKey].onlineTotal += sale.total || 0;
        } else if (sale.channel === "physical") {
          acc[dateKey].physicalTotal += sale.total || 0;
        }
        return acc;
      }, {} as Record<string, { date: string; onlineTotal: number; physicalTotal: number }>)
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalSales,
      totalOnline: totalOnline,
      totalReturns: totalReturns,
      filtered,
      totalSalesLastYear,
      totalOnlineSalesLastYear,
      totalSalesChange,
      totalOnlineSalesChange,
      totalReturnsChange,
      totalReturnsLastYear,
      aggregatedByDate,
    };
  }, [salesData, filters, lastYearData]);
}
