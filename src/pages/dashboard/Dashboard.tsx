import StatsCards from "../../components/StatsCards";
import TimeDisplay from "../../components/TimeDisplay";
import useSalesStore from "../../store/useSalesStore";
import {
  ChartBarIcon,
  TrashIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import SalesAnalyticsGraph from "../../components/SalesAnalyticsGraph";

export default function Dashboard() {
  const { generateSalesData, filters, updateFilters, clearAllData, loading } =
    useSalesStore();

  // useEffect(() => {

  // },[])

  return (
    <div className="w-full pl-5 pr-7 py-5 rounded-lg bg-white">
      <div className="mt-3">
        <h1 className="pl-2 font-semibold text-lg">Dashboard Overview</h1>
        <TimeDisplay />
        <div className="flex gap-2 mt-2 mb-2">
          <div className="flex items-center border px-2 py-1 border-gray-200  rounded-lg shadow-sm ">
            <button
              onClick={() => generateSalesData(100)}
              className="flex gap-1 items-center w-full text-slate-400 cursor-pointer"
              disabled={loading}
            >
              <ChartBarIcon className="w-4 h-4 stroke-2" />
              Generate 100 Sales
            </button>
          </div>

          <div className="flex items-center border px-2 py-1 border-gray-200  rounded-lg shadow-sm ">
            <button
              onClick={() => generateSalesData(300)}
              className="flex gap-1 items-center w-full text-slate-400 cursor-pointer"
              disabled={loading}
            >
              <RocketLaunchIcon className="w-4 h-4 stroke-2" />
              Generate 300 Sales
            </button>
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-2 py- shadow-sm">
            <button
              onClick={clearAllData}
              className=" flex gap-1 items-center text-red-400 cursor-pointer"
            >
              <TrashIcon className="w-4 h-4 stroke-2" />
              Clear Data
            </button>
          </div>
        </div>
        <div className="mt-3">
          <StatsCards />
        </div>
        <div className="bg-white border border-gray-200 w-[790px] rounded-lg mt-5 px-4 py-5">
          <h3 className="font-semibold">Sales Analytics</h3>
          <div className="border border-gray-200">
            <select
              value={filters.dateRange}
              onChange={(e) =>
                updateFilters({
                  dateRange: e.target.value as "7d" | "30d" | "90d",
                })
              }
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <div>
            <SalesAnalyticsGraph />
          </div>
        </div>
      </div>
    </div>
  );
}
