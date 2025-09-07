import useWorldTime from "../Hooks/useWorldTime";
import { formatTime } from "../Hooks/useWorldTime";

export default function Dashboard() {
  const { time } = useWorldTime();

  return (
    <div className="w-full ml-2 p-4 rounded-lg bg-white">
      <div>
        <h1 className="font-semibold text-lg">Dashboard Overview</h1>
        {time ? formatTime(new Date(time)) : formatTime(new Date())}
      </div>
    </div>
  );
}
