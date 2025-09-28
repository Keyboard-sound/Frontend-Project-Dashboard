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
  const { salesData, getFilteredSales } = useSalesStore();
  const chartData = useMemo(() => {
    const completed = salesData.filter((sale) => sale.status === "completed");
    const grouped: Record<
      string,
      { date: string; physicalTotal: number; onlineTotal: number }
    > = {};
    console.log("completed", completed);

    completed.forEach((sale) => {
      const key = new Date(sale.date).toISOString().split("T")[0];

      if (!grouped[key]) {
        grouped[key] = { date: key, physicalTotal: 0, onlineTotal: 0 };
      }

      if (sale.channel === "physical") {
        grouped[key].physicalTotal += sale.total;
      } else if (sale.channel === "online") {
        grouped[key].onlineTotal += sale.total;
      }
    });
    return Object.values(grouped);
  }, [salesData]);

  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };
  console.log("data for analysis", chartData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid horizontal={false} />
        <Legend verticalAlign="top" align="center" />
        <Line
          type="monotone"
          dataKey="onlineTotal"
          stroke={colors.violet[500]}
          strokeWidth={2}
          name="Online Sale"
        />
        <Line
          type="monotone"
          dataKey="physicalTotal"
          stroke={colors.blue[500]}
          strokeWidth={2}
          name="Physical Sale"
        />
        <XAxis
          dataKey="date"
          stroke={colors.slate[400]}
          tick={{ fontSize: 12 }}
          angle={45}
          textAnchor="start"
          height={60}
        />
        <YAxis
          stroke={colors.slate[400]}
          tick={{ fontSize: 12 }}
          tickFormatter={formatCurrency}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
