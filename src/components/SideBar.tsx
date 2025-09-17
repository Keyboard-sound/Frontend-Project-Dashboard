import { NavLink } from "react-router-dom";
import {
  Squares2X2Icon,
  WalletIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function SideBar() {
  const sidebarItems = [
    { name: "Dashboard", to: "/", icon: Squares2X2Icon },
    { name: "Sales", to: "/sales", icon: WalletIcon },
    { name: "Products", to: "/products", icon: ShoppingBagIcon },
    { name: "Customer", to: "/customers", icon: BriefcaseIcon },
    { name: "Reports", to: "/reports", icon: DocumentTextIcon },
  ];

  const renderedSidebarItems = sidebarItems.map((item) => {
    const IconComponent = item.icon;
    return (
      <div>
        <NavLink
          key={item.to}
          to={item.to}
          className="flex items-center gap-2 py-3.5 px-3 rounded-lg text-gray-400 text-sm focus:bg-indigo-600 focus:text-white"
        >
          {IconComponent && <IconComponent className="h-5 w-5" />}
          {item.name}
        </NavLink>
      </div>
    );
  });
  return (
    <div className="flex flex-col min-w-[240px] p-3 bg-blue-50 border rounded-lg">
      <h1 className="py-4 font-bold text-xl mb-[10px]">Dashboard</h1>
      <nav className="flex flex-col gap-1">{renderedSidebarItems}</nav>
    </div>
  );
}
