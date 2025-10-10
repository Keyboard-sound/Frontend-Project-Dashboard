import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Squares2X2Icon,
  WalletIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function SideBar() {
  const sidebarItems = [
    { name: "Dashboard", to: "/", icon: Squares2X2Icon },
    { name: "Sales", to: "/sales", icon: WalletIcon },
    { name: "Products", to: "/products", icon: ShoppingBagIcon },
    { name: "Customer", to: "/customers", icon: BriefcaseIcon },
    { name: "Reports", to: "/reports", icon: DocumentTextIcon },
  ];
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-18"
      } flex flex-col h-full lg:items-center bg-blue-50 rounded-lg transition-all ease-in-out duration-300 p-1 lg:p-3`}
    >
      <div className="flex items-center w-full px-1 py-4 lg:px-2 font-bold mb-2.5 gap-4">
        <button
          className="p-1 hover:outline focus:outline outline-gray-400 rounded-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bars3Icon className="w-6 h-6 stroke-2" />
        </button>
        <h1
          className={`transition-opacity duration-300 text-2xl ${
            !isOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}
        >
          Dashboard
        </h1>
      </div>

      <div className="w-full flex">
        <nav className="flex flex-col w-full gap-y-1">
          {sidebarItems.map(({ name, to, icon: Icon }) => (
            <ul>
              <li className="flex items-center text-gray-400 text-sm px-1 py-3 lg:p-2 cursor-pointer">
                <NavLink
                  key={to}
                  to={to}
                  className="flex items-center gap-4 focus:bg-red-100"
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
      </div>
    </aside>
  );
}
