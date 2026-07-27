import { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [newTime, setNewTime] = useState<number | null>(null);

  useEffect(() => {
    setNewTime(Date.now());

    const intervalID: ReturnType<typeof setInterval> = setInterval(() => {
      setNewTime(Date.now());
    }, 6000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  function formatTime(timestamp: number, timeZone: string = "Asia/Bangkok") {
    if (!timestamp) {
      console.error("timestamp missing");
      return "";
    }

    const date = new Date(timestamp);
    const timeStr = date.toLocaleString("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const day = date.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${timeStr} at ${day}${daySuffix} ${month} ${year}`;
  }

  return (
    <div className="pl-2 text-2xs lg:text-sm text-slate-400">
      {newTime && formatTime(newTime)}
    </div>
  );
}
