import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  ChartBarIcon,
  TrashIcon,
  RocketLaunchIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import StatCardList from "../components/StatCardList";
import TimeDisplay from "../components/TimeDisplay";
import useSalesStore from "@store/useSalesStore";
import SalesAnalyticsGraph from "../components/SalesAnalyticsGraph";
import SalesActivities from "../components/SalesActivities";
import TargetCard from "../components/TargetCard";
import RecentSales from "../components/RecentSales";

export default function Dashboard() {
  const { loadSalesData, filters, updateFilters, clearAllData, loading } =
    useSalesStore();

  return (
    <div className="w-full h-full p-4 lg:pl-5 lg:pr-7 lg:pt-6 rounded-lg bg-white overflow-y-auto">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="pl-2 font-semibold text-base lg:text-lg">
            Dashboard Overview
          </h1>
          <TimeDisplay />
        </div>
      </div>
      <div className="flex gap-2 pt-2 pb-3 lg:pb-5 text-2xs lg:text-sm text-slate-400">
        <div className="flex items-center border border-gray-200  rounded-lg hover:shadow-sm ">
          <button
            onClick={() => loadSalesData(100)}
            className="flex gap-1 items-center w-full p-1 lg:px-2 lg:py-1 cursor-pointer"
            disabled={loading}
          >
            <ChartBarIcon className="w-3 h-3 lg:w-4 lg:h-4 stroke-2" />
            <span className="hidden md:inline">Generate 100 Sales</span>
            <span className="md:hidden">100 Sales</span>
          </button>
        </div>

        <div className="flex items-center border  border-gray-200  rounded-lg hover:shadow-sm ">
          <button
            onClick={() => loadSalesData(300)}
            className="flex gap-1 items-center w-full p-1 lg:px-2 lg:py-1 cursor-pointer"
            disabled={loading}
          >
            <RocketLaunchIcon className="w-3 h-3 lg:w-4 lg:h-4 stroke-2" />
            <span className="hidden md:inline">Generate 300 Sales</span>
            <span className="md:hidden">300 Sales</span>
          </button>
        </div>

        <div className="flex items-center border border-gray-200 rounded-lg p-1 lg:px-2 lg:py-1 hover:shadow-sm">
          <button
            onClick={clearAllData}
            className=" flex gap-1 items-center text-red-400 cursor-pointer"
          >
            <TrashIcon className="w-3 h-3 lg:w-4 lg:h-4 stroke-2" />
            Clear Data
          </button>
        </div>
        <div className="ml-auto">
          <Menu>
            <MenuButton className="flex flex-row justify-between items-center w-23 lg:w-32 border border-gray-200 rounded-lg px-2 py-1 text-2xs text-black text-nowrap lg:text-sm cursor-pointer hover:shadow-sm focus:outline-none">
              {filters.dateRange === "7d" && "Last 7 Days"}
              {filters.dateRange === "30d" && "Last 30 Days"}
              {filters.dateRange === "90d" && "Last 90 Days"}
              <ChevronDownIcon className="w-2 h-2 lg:w-4 lg:h-4 stroke-2" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="[--anchor-gap:--spacing(1)] flex flex-col gap-1 w-24 lg:w-32 p-1 text-2xs text-center text-nowrap lg:text-sm shadow-md rounded-lg transition duration-100 ease-out focus:outline-none data-closed:opacity-0 data-closed:scale-95 bg-white"
            >
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => updateFilters({ dateRange: "7d" })}
                    className={`px-2 py-1 rounded-lg ${
                      filters.dateRange === "7d" ? "bg-indigo-100" : ""
                    } ${focus ? "bg-gray-100" : ""}`}
                  >
                    Last 7 Days
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => updateFilters({ dateRange: "30d" })}
                    className={`px-2 py-1 rounded-lg ${
                      filters.dateRange === "30d" ? "bg-indigo-100" : ""
                    } ${focus ? "bg-gray-100" : ""}`}
                  >
                    Last 30 Days
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => updateFilters({ dateRange: "90d" })}
                    className={`px-2 py-1 rounded-lg ${
                      filters.dateRange === "90d" ? "bg-indigo-100" : ""
                    } ${focus ? "bg-gray-100" : ""}`}
                  >
                    Last 90 Days
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-5">
        {/* Cards */}
        <div className="contents lg:flex lg:gap-5 lg:w-[70%]">
          <StatCardList />
        </div>

        {/* target */}
        <div className="lg:w-[30%] p-2 lg:p-4 rounded-lg bg-blue-700">
          <TargetCard />
        </div>
      </div>

      {/* graph */}
      <div className="flex-wrap lg:flex lg:flex-nowrap gap-3 lg:gap-5 mt-3 lg:mt-5">
        <div className=" bg-white border border-gray-200 w-full lg:w-[70%] h-full rounded-lg p-2 lg:px-4 lg:py-5">
          <div className="flex justify-between items-center">
            <h3 className="text-sm lg:text-base font-semibold">
              Sales Analytics
            </h3>
          </div>
          <div>
            <SalesAnalyticsGraph />
          </div>
        </div>

        <div className="flex flex-col justify-between items-cemter w-full lg:w-[30%] space-y-1 border border-gray-200 rounded-lg px-4 py-4 mt-3 lg:mt-0">
          <RecentSales />
        </div>
      </div>

      {/* Show Sale activities */}
      <div className="w-full min-h-50 border border-gray-200 rounded-lg mt-3 lg:mt-5 px-4 py-4 overflow-x-auto">
        <SalesActivities />
      </div>
    </div>
  );
}
