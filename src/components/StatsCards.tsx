import useSalesStore from "../store/useSalesStore";
import { useMemo } from "react";

export default function StatsCards() {
  const { getTotalRevenue, getTotalOrders, getTotalCustomers, salesData } =
    useSalesStore();
  const stats = useMemo(
    () => ({
      // sales: salesData,
      revenue: getTotalRevenue(),
      orders: getTotalOrders(),
      customers: getTotalCustomers(),
      avgOrder: salesData.length > 0 ? getTotalRevenue() / getTotalOrders() : 0,
    }),
    [getTotalRevenue, getTotalOrders, getTotalCustomers, salesData.length]
  );
  console.log(
    "salesData from stat card filtered",
    salesData.filter((sale) => sale.status === "completed")
  );
  console.log("salesData from stat card", salesData);

  return (
    <div>
      <div className="flex flex-col text-blue-500">
        <span>Revenue</span>
        {stats.revenue.toLocaleString()}
      </div>
      <div>
        <span>Customers</span>
        <div>{}</div>
      </div>
      <div>
        <span>Customers</span>
        <div>{stats.customers.toLocaleString()}</div>
      </div>
    </div>
  );
}
