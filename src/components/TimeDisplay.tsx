import useWorldTime from "../Hooks/useWorldTime";
import { formatTime } from "../Hooks/useWorldTime";

export default function TimeDisplay() {
  const { time } = useWorldTime();
  console.log("time from World time", time);

  return (
    <div className="pl-2 text-sm text-slate-400">
      {time ? formatTime(new Date(time)) : formatTime(new Date())}
    </div>
  );
}
