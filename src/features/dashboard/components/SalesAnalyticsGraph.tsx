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
import useSalesStat from "@/hooks/useSalesStat";
import colors from "tailwindcss/colors";
import { formatCurrency, formatDate } from "@utils/formatter";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    dataKey: string;
    value: number;
    payload: {
      date: string;
      physicalTotal: number;
      onlineTotal: number;
    };
  }[];
  label?: string | number;
}

const tooltipFormatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-Us", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month}'${year}`;
};

export default function SalesAnalyticsGraph() {
  const { aggregatedByDate } = useSalesStat();

  const chartData = aggregatedByDate;

  const CustomTooltip = ({ payload, active }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    if (active) {
      return (
        <div className="p-2 space-y-1 rounded-lg shadow-md bg-white">
          <p className="text-xs font-semibold">
            {tooltipFormatDate(data.date)}
          </p>
          <p className="text-sm text-violet-500">
            online: {formatCurrency(data.onlineTotal)}
          </p>
          <p className="text-sm text-blue-500">
            physical: {formatCurrency(data.physicalTotal)}
          </p>
        </div>
      );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ right: 30 }}>
        <CartesianGrid stroke={colors.slate[200]} horizontal={false} />
        <Legend verticalAlign="top" align="center" />
        {chartData.length > 0 ? (
          <>
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
          </>
        ) : (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#90a1b9"
            fontSize={14}
          >
            Sorry, No data available
          </text>
        )}
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
        <Tooltip
          formatter={(value: number) => value.toLocaleString("en-US")}
          content={CustomTooltip}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
