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
import colors from "tailwindcss/colors";

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
  console.log("onlineSales", graphData.onlineSales);
  const dataForAnalysis = salesData.filter((sale) => {
    return sale.status === "completed";
  });
  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };
  console.log("data for analysis", dataForAnalysis);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={graphData.onlineSales}>
        <CartesianGrid horizontal={false} />
        <Legend verticalAlign="top" align="center" />
        <Line
          type="monotone"
          dataKey="total"
          stroke={colors.purple[400]}
          strokeWidth={2}
          name="Online Sale"
        />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke="blue"
          strokeWidth={2}
          name="Physical Sale"
        />
        <XAxis dataKey="date" stroke="#6b7280" />
        <YAxis
          stroke="#6b7280"
          // dataKey={salesData}
          tickFormatter={formatCurrency}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
