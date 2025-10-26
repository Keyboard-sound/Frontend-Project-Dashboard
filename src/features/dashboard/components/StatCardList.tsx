import { useMemo } from "react";
import {
  ShoppingCartIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";
import useSalesStore from "@store/useSalesStore";
import { StatCard } from "./StatCard";
import type { ComponentProps } from "react";

type StatCardProps = ComponentProps<typeof StatCard>;

export default function StatCardList() {
  const { salesData, filters, lastYearData } = useSalesStore();

  const stats = useMemo(() => {
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

    return {
      totalSales,
      online: totalOnline,
      returns: totalReturns,
      totalSalesLastYear,
      totalOnlineSalesLastYear,
      totalSalesChange,
      totalOnlineSalesChange,
      totalReturnsChange,
      totalReturnsLastYear,
    };
  }, [salesData, filters, lastYearData]);

  const renderedTrendValue = (value: string | null) => {
    return `${value?.toLocaleString()}%`;
  };

  const renderedTrend = (trendValue: string | null, inverseTrend: boolean) => {
    if (trendValue === null) {
      return null;
    }
    const numValue = parseFloat(trendValue);

    return inverseTrend
      ? numValue >= 0
        ? "down"
        : "up"
      : numValue >= 0
      ? "up"
      : "down";
  };

  const renderedCompareValue = (value: number | null) => {
    return value !== null ? value.toLocaleString() : "N/A";
  };

  const cardItems: StatCardProps[] = [
    {
      title: "total sales",
      value: stats.totalSales.toLocaleString(),
      icon: ShoppingCartIcon,
      trend: renderedTrend(stats.totalSalesChange, false),
      trendValue: renderedTrendValue(stats.totalSalesChange),
      compareValue: renderedCompareValue(stats.totalSalesLastYear),
      color: "text-blue-500",
    },
    {
      title: "online sales",
      value: stats.online.toLocaleString(),
      icon: CreditCardIcon,
      trend: renderedTrend(stats.totalOnlineSalesChange, false),
      trendValue: renderedTrendValue(stats.totalOnlineSalesChange),
      compareValue: renderedCompareValue(stats.totalOnlineSalesLastYear),
      color: "text-violet-500",
    },
    {
      title: "returns",
      value: stats.returns.toLocaleString(),
      icon: ReceiptRefundIcon,
      trend: renderedTrend(stats.totalReturnsChange, true),
      trendValue: renderedTrendValue(stats.totalReturnsChange),
      compareValue: renderedCompareValue(stats.totalReturnsLastYear),
      color: "text-yellow-500",
    },
  ];

  return (
    <>
      {cardItems.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </>
  );
}
