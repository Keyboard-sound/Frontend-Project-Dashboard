import useWorldTime from "../hook/useWorldTime";
import { formatTime } from "../hook/useWorldTime";

export default function TimeDisplay() {
  const { time } = useWorldTime();

  return (
    <div className="pl-2 text-2xs lg:text-sm text-slate-400">
      {time ? formatTime(new Date(time)) : formatTime(new Date())}
    </div>
  );
}
