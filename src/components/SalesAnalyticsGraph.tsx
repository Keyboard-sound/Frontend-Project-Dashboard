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
  const { getFilteredSales } = useSalesStore();

  const chartData = useMemo(() => {
    const filtered = getFilteredSales();
    console.log("from filtered", filtered);

    const grouped: Record<
      string,
      { date: string; physicalTotal: number; onlineTotal: number }
    > = {};

    filtered.forEach((sale) => {
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
  }, [getFilteredSales]);

  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString()}`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });

    return `${day}-${month}`;
  };
  console.log("data for analysis", chartData);

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
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
