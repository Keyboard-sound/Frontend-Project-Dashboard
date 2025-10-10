import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  ChartBarIcon,
  TrashIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import StatsCards from "../../components/StatsCards";
import TimeDisplay from "../../components/TimeDisplay";
import useSalesStore from "../../store/useSalesStore";
import SalesAnalyticsGraph from "../../components/SalesAnalyticsGraph";
import SalesAct from "../../components/SalesAct";
import SearchInput from "../../components/SearchInput";

export default function Dashboard() {
  const { generateSalesData, filters, updateFilters, clearAllData, loading } =
    useSalesStore();

  return (
    <div className="w-full pl-5 pr-7 py-5 rounded-lg bg-white overflow-auto overflow-y-auto">
      <div className="mt-3">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            <h1 className="pl-2 font-semibold text-base lg:text-lg">
              Dashboard Overview
            </h1>
            <TimeDisplay />
          </div>
          <SearchInput placeholder="search..." />
        </div>
        <div className="flex gap-2 mt-2 mb-2">
          <div className="flex items-center border px-2 py-1 border-gray-200  rounded-lg shadow-sm ">
            <button
              onClick={() => generateSalesData(100)}
              className="flex gap-1 items-center w-full text-slate-400 text-xs lg:text-base cursor-pointer"
              disabled={loading}
            >
              <ChartBarIcon className="w-4 h-4 stroke-2" />
              Generate 100 Sales
            </button>
          </div>

          <div className="flex items-center border px-2 py-1 border-gray-200  rounded-lg shadow-sm ">
            <button
              onClick={() => generateSalesData(300)}
              className="flex gap-1 items-center w-full text-slate-400 text-xs lg:text-base cursor-pointer"
              disabled={loading}
            >
              <RocketLaunchIcon className="w-4 h-4 stroke-2" />
              Generate 300 Sales
            </button>
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-2 py- shadow-sm">
            <button
              onClick={clearAllData}
              className=" flex gap-1 items-center text-red-400 text-xs lg:text-base cursor-pointer"
            >
              <TrashIcon className="w-4 h-4 stroke-2" />
              Clear Data
            </button>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-5">
          {/* Cards */}
          <div className="w-full lg:w-[70%]">
            <StatsCards />
          </div>

          {/* target */}
          <div className="w-full lg:w-[30%] border border-gray-200 rounded-lg px-4 py-4">
            Target Goal
          </div>
        </div>

        {/* graph */}
        <div className="flex gap-5 mt-5">
          <div className=" bg-white border border-gray-200 w-[70%] h-full rounded-lg px-4 py-5">
            <div className="flex justify-between items-center">
              <h3 className="text-sm lg:text-base font-semibold">
                Sales Analytics
              </h3>
              <div>
                <Menu>
                  <MenuButton className="border border-gray-200 rounded-lg p-2 text-2xs lg:text-sm cursor-pointer">
                    {filters.dateRange === "7d" && "Last 7 Days"}
                    {filters.dateRange === "30d" && "Last 30 Days"}
                    {filters.dateRange === "90d" && "Last 90 Days"}
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor="bottom end"
                    className="[--anchor-gap:--spacing(1)] w-30 text-2xs lg:text-sm border border-gray-200 focus:outline-none rounded-lg transition duration-100 ease-out data-closed:opacity-0 data-closed:scale-95 bg-white"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={() => updateFilters({ dateRange: "7d" })}
                          className={`w-full text-left px-4 py-2  ${
                            filters.dateRange === "7d" ? "bg-blue-100" : ""
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
                          className={`w-full text-left px-4 py-2 ${
                            filters.dateRange === "30d" ? "bg-blue-100" : ""
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
                          className={`w-full text-left px-4 py-2 ${
                            filters.dateRange === "90d" ? "bg-blue-100" : ""
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
            <div>
              <SalesAnalyticsGraph />
            </div>
          </div>

          <div className="w-[30%] border border-gray-200 rounded-lg px-4 py-4">
            Activities log
          </div>
        </div>

        {/* Show Sale activities */}
        <div className="w-full min-h-50 border border-gray-200 rounded-lg  mt-5 px-4 py-4 overflow-x-auto">
          <SalesAct />
        </div>
      </div>
    </div>
  );
}
