import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="w-[220px] p-3 bg-blue-50 border rounded-lg">
      <h1 className="py-4 font-bold text-xl mb-[10px]">Dashboard</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div>
        <Link to="/products">Products</Link>
      </div>
      <div>
        <Link to="/customer">Customer</Link>
      </div>
    </div>
  );
}
