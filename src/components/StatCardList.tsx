import { useEffect, useMemo } from "react";
import {
  ShoppingCartIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";
import useSalesStore from "../store/useSalesStore";
import { StatCard } from "./StatCard";
import type { ComponentProps } from "react";

type StatCardProps = ComponentProps<typeof StatCard>;

export default function StatCardList() {
  const { salesData, filters, loadLastYearData, lastYearData } =
    useSalesStore();

  useEffect(() => {
    loadLastYearData();
  }, [loadLastYearData]);

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

    const online = filtered.reduce((sum, sale) => {
      return sale.channel === "online" && sale.status === "completed"
        ? sum + (sale.total || 0)
        : sum;
    }, 0);

    const returns = filtered.reduce((sum, sale) => {
      return sale.status === "returns" ? sum + (sale.total || 0) : sum;
    }, 0);

    const lastYear = lastYearData?.[filters.dateRange] || {
      totalPhysicalSales: 0,
      totalOnlineSales: 0,
      totalReturns: 0,
      totalSalesLastYear: 0,
    };
    const totalSalesLastYear = lastYear
    
    const totalSalesChange = 

    return {
      totalSales,
      online,
      returns,
    };
  }, [salesData, filters, lastYearData]);

  const cardItems: StatCardProps[] = [
    {
      title: "total sales",
      value: stats.totalSales.toLocaleString(),
      icon: ShoppingCartIcon,
      trend: "up",
      trendValue: "100%",
      color: "text-blue-500",
    },
    {
      title: "online sales",
      value: stats.online.toLocaleString(),
      icon: CreditCardIcon,
      trend: "down",
      trendValue: "10.58%",
      color: "text-violet-500",
    },
    {
      title: "returns",
      value: stats.returns.toLocaleString(),
      icon: ReceiptRefundIcon,
      trend: "up",
      trendValue: "10%",
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
