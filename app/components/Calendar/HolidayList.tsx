"use client";

import { INDIAN_HOLIDAYS } from "../../hooks/useCalendar";

interface Props {
  year: number;
  month: number;
  isDark?: boolean;
  accentColor?: string;
}

export default function HolidayList({
  year,
  month,
  isDark = false,
  accentColor = "#6c5ce7",
}: Props) {

  const textPri = isDark ? "text-white/90" : "text-gray-800";
  const textSec = isDark ? "text-white/50" : "text-gray-400";

  const holidays = Object.entries(INDIAN_HOLIDAYS).filter(([key]) => {
    const [m] = key.split("-").map(Number);
    return m - 1 === month;
  });

  return (
    <div className="rounded-2xl p-4 border backdrop-blur-md bg-white/70 dark:bg-white/5">
      <p className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${textSec}`}>
        Holidays
      </p>

      {holidays.length === 0 ? (
        <p className={`text-xs ${textSec}`}>No holidays this month</p>
      ) : (
        <ul className="space-y-2">
          {holidays.map(([key, name]) => {
            const [, day] = key.split("-");

            return (
              <li key={key} className="flex justify-between text-sm">
                <span className={textPri}>{name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: accentColor, color: "#fff" }}
                >
                  {day}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}