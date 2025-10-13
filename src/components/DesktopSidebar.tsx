import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { sidebarItems } from "../config/navigationConfig";

export default function DesktopSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const NavigationContent = () => {
    return (
      <nav className="flex flex-col w-full gap-y-1">
        {sidebarItems.map(({ name, to, icon: Icon }) => (
          <ul key={to}>
            <li className="flex items-center text-gray-400 text-base">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-4 w-full rounded-lg px-1 py-3 lg:p-2 cursor-pointer transition-colors duration-100 ${
                    isActive
                      ? "bg-blue-700 font-medium text-white"
                      : "hover:bg-blue-100"
                  }`
                }
              >
                <div className="p-1 pl-1.5">
                  <Icon className="w-5 h-5 stroke-2" />
                </div>
                <span
                  className={`transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {name}
                </span>
              </NavLink>
            </li>
          </ul>
        ))}
      </nav>
    );
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-18"
      } hidden lg:flex flex-col h-full lg:items-center bg-blue-50 rounded-lg transition-all ease-in-out duration-200 lg:p-3 lg:pt-6`}
    >
      <div className="flex items-center w-full px-1 py-4 lg:px-2 font-bold mb-2.5 gap-4">
        <button
          className="border border-transparent p-1 rounded-sm cursor-pointer hover:shadow-md hover:border-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bars3Icon className="w-6 h-6 stroke-2" />
        </button>
        <h1
          className={`transition duration-300 ease-in-out  text-2xl ${
            !isOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}
        >
          Dashboard
        </h1>
      </div>
      <NavigationContent />
      <div className="w-full flex"></div>
    </aside>
  );
}
