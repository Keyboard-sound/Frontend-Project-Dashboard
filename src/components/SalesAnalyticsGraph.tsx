import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useSalesStore from "../store/useSalesStore";
import { useMemo } from "react";

export default function SalesAnalyticsGraph() {
  const { salesData, getOnlineSales, getPhysicalSales } = useSalesStore();
  const graphData = useMemo(
    () => ({
      salesData: salesData,
      physicalSales: getPhysicalSales(),
      onlineSales: getOnlineSales(),
    }),
    [getPhysicalSales, getOnlineSales, salesData]
  );
  // const month = salesData.filter((sale) => sale.date.getMonth());
  // console.log("data for graph", month);
  console.log("onlineSales", graphData.onlineSales);

  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };
  // console.log(formatCurrency(1));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={graphData.onlineSales}>
        <Legend verticalAlign="top" align="center" />
        <Line
          type="monotone"
          dataKey="salesData"
          stroke="purple"
          strokeWidth={2}
          name="Online Sale"
        />
        <XAxis dataKey="date" stroke="#6b7280" />
        <YAxis
          stroke="#6b7280"
          // dataKey={salesData}
          tickFormatter={(value) => formatCurrency(value)}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
