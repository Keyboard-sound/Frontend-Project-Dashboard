import type { FC } from "react";
import { NavLink } from "react-router";
import { sidebarItems } from "../config/navigationConfig";

const MobileNav: FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  return (
    <nav className="space-y-1">
      {sidebarItems.map(({ name, to, icon: Icon }) => (
        <ul key={to}>
          <li>
            <NavLink
              to={to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-4 w-full rounded-lg pl-2 py-2 transition-colors duration-100 ${
                  isActive ? "bg-blue-700 font-medium text-white" : ""
                }`
              }
            >
              <div>
                <Icon className="w-4 h-4 stroke-2" />
              </div>
              <span className="text-sm">{name}</span>
            </NavLink>
          </li>
        </ul>
      ))}
    </nav>
  );
};

export default MobileNav;
