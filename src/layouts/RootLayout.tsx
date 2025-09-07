import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex flex-cols mx-auto px-4 py-3 pl-1 bg-blue-50 h-screen">
      <SideBar />
      <Outlet />
    </div>
  );
}
