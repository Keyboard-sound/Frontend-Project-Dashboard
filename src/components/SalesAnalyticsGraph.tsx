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
  const { salesData, filters } = useSalesStore();

  const chartData = useMemo(() => {
    const filtered = salesData.filter((sale) => {
      if (!sale.date) return false;

      const dayDiff = Math.floor(
        (Date.now() - new Date(sale.date).getTime()) / (1000 * 60 * 60 * 24)
      );

      const dayLimit = parseInt(filters.dateRange.replace("d", ""));

      return dayDiff <= dayLimit;
    });
    const completed = filtered.filter((sale) => sale.status === "completed");

    const grouped: Record<
      string,
      { date: string; physicalTotal: number; onlineTotal: number }
    > = {};

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
  }, [salesData, filters]);

  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });

    return `${day}-${month}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ right: 30 }}>
        <CartesianGrid stroke={colors.slate[200]} horizontal={false} />
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
          stroke={colors.slate[200]}
          tick={{ fill: colors.slate[400], fontSize: 12 }}
          tickFormatter={formatDate}
          angle={45}
          textAnchor="start"
          height={60}
          interval="preserveEnd"
        />
        <YAxis
          stroke={colors.slate[200]}
          tick={{ fill: colors.slate[400], fontSize: 12 }}
          tickFormatter={formatCurrency}
        />
        <Tooltip formatter={(value: number) => value.toLocaleString("en-US")} />
      </LineChart>
    </ResponsiveContainer>
  );
}
