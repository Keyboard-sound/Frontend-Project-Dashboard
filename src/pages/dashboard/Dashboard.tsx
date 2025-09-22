import { useEffect } from "react";
import useWorldTime from "../../Hooks/useWorldTime";
import { formatTime } from "../../Hooks/useWorldTime";
// import { useLoaderData } from "react-router-dom";
import Graph from "../../components/SalesAnalyticsGraph";
import { generateSalesData } from "../../data/generateSalesData";
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

export default function Dashboard() {
  const { time } = useWorldTime();
  const salesData = generateSalesData();
  console.log(salesData);

  return (
    <div className="w-full ml-2 p-4 rounded-lg bg-white">
      <h1 className="pl-2 font-semibold text-lg">Dashboard Overview</h1>
      <div className="pl-2 text-sm text-gray-400">
        {time ? formatTime(new Date(time)) : formatTime(new Date())}
      </div>
      <h3 className="font-semibold">Sales Analytics</h3>
    </div>
  );
}
