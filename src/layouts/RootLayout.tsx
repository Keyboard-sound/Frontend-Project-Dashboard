import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="flex lg:pr-4 lg:py-3 bg-blue-50 h-screen">
      <SideBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
