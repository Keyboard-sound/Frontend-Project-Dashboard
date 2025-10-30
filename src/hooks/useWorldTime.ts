import axios from "axios";
import { useEffect, useState } from "react";

interface WorldTimeRes {
  utc_datetime: string;
}

export default function useWorldTime(timeZone: string = "Etc/UTC") {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    let intervalID: ReturnType<typeof setInterval>;
    let startTime: number;
    let startDate: Date;

    async function fetchTime() {
      try {
        const res = await axios.get<WorldTimeRes>(
          `https://worldtimeapi.org/api/timezone/${timeZone}`
        );
        const data = res.data.utc_datetime;
        const utcTime = new Date(data);
        startDate = utcTime;
        startTime = Date.now();
        setTime(utcTime);

        intervalID = setInterval(() => {
          const elapsed = Date.now() - startTime;
          setTime(new Date(startDate.getTime() + elapsed));
        }, 60000);
      } catch (error) {
        console.log("timeError", error);
        setTime(new Date());
        intervalID = setInterval(() => {
          setTime(new Date());
        }, 60000);
      }
    }
    fetchTime();

    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
  }, [timeZone]);
  return { time, formatTime };
}

//Help to format time into "HH:mm AM/PM at DD:MM:YYYY"
export function formatTime(date: Date | null) {
  if (!date) return "";
  const timeStr = date.toLocaleString("en-US", {
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
