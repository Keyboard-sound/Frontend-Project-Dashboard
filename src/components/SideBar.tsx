import { NavLink } from "react-router-dom";
import {
  Squares2X2Icon,
  WalletIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

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
    <div className={`flex flex-col items-center p-3 ${!isOpen && "p-0"}`}>
      <div
        className={`${
          isOpen ? "w-[240px]" : "w-[50px]"
        } bg-blue-50 rounded-lg transition-all ease-in-out duration-300`}
      >
        <div className="flex items-center px-2 py-4 font-bold text-xl mb-[10px]">
          <button
            className=" p-1 mr-[10px] hover:outline outline-gray-400 rounded-sm cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bars3Icon className="w-6 h-6 stroke-2" />
          </button>
          <span
            className={`transition-opacity duration-200 ${
              !isOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Dashboard
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {sidebarItems.map(({ name, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-2 text-gray-400 text-sm py-3.5 px-3"
            >
              <Icon className="size-5 stroke-2 shrink-0" />
              <span
                className={`${
                  isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                {name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
