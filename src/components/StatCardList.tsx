import useSalesStore from "../store/useSalesStore";
import { useMemo, type ComponentProps } from "react";
import {
  ShoppingCartIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";
import { StatCard } from "./StatCard";

type StatCardProps = ComponentProps<typeof StatCard>;
//need to create last year sales that hardcode value

export default function StatCardList() {
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
