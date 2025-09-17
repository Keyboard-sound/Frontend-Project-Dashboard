import { NavLink } from "react-router-dom";
import { Squares2X2Icon, ChartPieIcon } from "@heroicons/react/24/outline";

export default function SideBar() {
  const links = [{ name: "Dashboard", to: "/" }];

  return (
    <div className="flex flex-col gap-1 w-[240px] p-3 bg-blue-50 border rounded-lg">
      <h1 className="py-4 font-bold text-xl mb-[10px]">Dashboard</h1>
      <div className="flex items-center gap-2 py-3.5 px-3 rounded-lg text-gray-400 text-sm focus:bg-blue-500 ">
        <Squares2X2Icon className="h-5 w-5 " />
        <NavLink to="/">Dashboard</NavLink>
      </div>
      <div className="flex items-center gap-2 border rounded-lg py-2 px-2">
        <ChartPieIcon className="h-5 w-5 " />
        <NavLink to="/dashboard">Analytics</NavLink>
      </div>
      <div>
        <NavLink to="/products">Products</NavLink>
      </div>
      <div>
        <NavLink to="/customers">Customer</NavLink>
      </div>
    </div>
  );
}
