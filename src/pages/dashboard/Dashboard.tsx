import StatsCards from "../../components/StatsCards";
import TimeDisplay from "../../components/TimeDisplay";
import useSalesStore from "../../store/useSalesStore";

export default function Dashboard() {
  const { generateSalesData, clearAllData } = useSalesStore();

  return (
    <div className="w-full ml-2 p-4 rounded-lg bg-white">
      <h1 className="pl-2 font-semibold text-lg">Dashboard Overview</h1>
      <TimeDisplay />
      <h3 className="font-semibold">Sales Analytics</h3>
      <button onClick={() => generateSalesData(100)} className="bg-red-500">
        generate 100 Sales
      </button>
      <button onClick={clearAllData}>Clear Data</button>
      <StatsCards />
    </div>
  );
}
