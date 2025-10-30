import {
  ShoppingCartIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";
import { StatCard } from "./StatCard";
import useSalesStat from "@/hooks/useSalesStat";
import { formatCurrency } from "@/utils/formatter";
import type { ComponentProps } from "react";

type StatCardProps = ComponentProps<typeof StatCard>;

export default function StatCardList() {
  const stats = useSalesStat();

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
    return value !== null ? formatCurrency(value) : "N/A";
  };

  const cardItems: StatCardProps[] = [
    {
      title: "total sales",
      value: formatCurrency(stats.totalSales),
      icon: ShoppingCartIcon,
      trend: renderedTrend(stats.totalSalesChange, false),
      trendValue: renderedTrendValue(stats.totalSalesChange),
      compareValue: renderedCompareValue(stats.totalSalesLastYear),
      color: "text-blue-500",
    },
    {
      title: "online sales",
      value: formatCurrency(stats.totalOnline),
      icon: CreditCardIcon,
      trend: renderedTrend(stats.totalOnlineSalesChange, false),
      trendValue: renderedTrendValue(stats.totalOnlineSalesChange),
      compareValue: renderedCompareValue(stats.totalOnlineSalesLastYear),
      color: "text-violet-500",
    },
    {
      title: "returns",
      value: formatCurrency(stats.totalReturns),
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
