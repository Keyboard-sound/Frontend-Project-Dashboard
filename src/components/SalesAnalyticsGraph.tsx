import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generateSalesData } from "../data/generateSalesData";

export default async function SalesAnalyticsGraph() {
  const salesData = generateSalesData();
  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={salesData}>
        <XAxis dataKey="date" stroke="#6b7280" />
        <YAxis stroke="#6b7280" tickFormatter={formatCurrency} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#3b82f6"
          fill="url(#salesGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
