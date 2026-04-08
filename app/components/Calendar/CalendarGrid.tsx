"use client";

import { useState } from "react";
import { useCalendar, INDIAN_HOLIDAYS } from "../../hooks/useCalendar";

interface Props {
  date: Date;
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  onDayClick?: (day: Date) => void;
  hasEvents?: (day: Date) => boolean;
  selectedDay?: Date | null;
  accentColor?: string;
  isDark?: boolean;
}

export default function CalendarGrid({
  date,
  onRangeChange,
  onDayClick,
  hasEvents,
  selectedDay,
  accentColor = "#6c5ce7",
  isDark = false,
}: Props) {
  const year  = date.getFullYear();
  const month = date.getMonth();
  const dates = useCalendar(year, month);
  const today = new Date();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate,   setEndDate]   = useState<Date | null>(null);

  const handleClick = (day: Date) => {
    onDayClick?.(day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(day); setEndDate(null); onRangeChange?.(day, null);
    } else {
      if (day < startDate) {
        setStartDate(day); setEndDate(startDate); onRangeChange?.(day, startDate);
      } else {
        setEndDate(day); onRangeChange?.(startDate, day);
      }
    }
  };

  const isSameDay = (d1: Date | null, d2: Date | null) =>
    !!d1 && !!d2 && d1.toDateString() === d2.toDateString();

  const isToday   = (d: Date) => d.toDateString() === today.toDateString();
  const isStart   = (d: Date) => isSameDay(d, startDate);
  const isEnd     = (d: Date) => isSameDay(d, endDate);
  const isInRange = (d: Date) => !!startDate && !!endDate && d > startDate && d < endDate;

  const getHoliday = (d: Date) => {
    const key = `${d.getMonth() + 1}-${d.getDate()}`;
    return INDIAN_HOLIDAYS[key] || null;
  };

  const getDayStyle = (day: Date): React.CSSProperties => {
    if (isStart(day) || isEnd(day)) {
      return { background: accentColor, color: "#fff", fontWeight: 700, transform: "scale(1.05)" };
    }
    if (isInRange(day)) return { background: accentColor + "22", color: isDark ? "#fff" : "#1a1a2e" };
    if (isToday(day))   return { outline: `2px solid ${accentColor}`, outlineOffset: "1px", fontWeight: 600 };
    return {};
  };

  const getRangeShape = (day: Date, idx: number) => {
    const col = idx % 7;
    if (isStart(day) && endDate)   return "rounded-l-full";
    if (isEnd(day)   && startDate) return "rounded-r-full";
    if (isInRange(day)) {
      if (col === 0) return "rounded-l-full";
      if (col === 6) return "rounded-r-full";
      return "rounded-none";
    }
    return "rounded-full";
  };

  const headerText = isDark ? "text-white/40" : "text-gray-400";
  const hoverBg    = isDark ? "hover:bg-white/10" : "hover:bg-gray-100";
  const normalText = isDark ? "text-white/80" : "text-gray-700";
  const rangeText  = isDark ? "text-white/40" : "text-gray-400";

  return (
    <div className="select-none">
      <div className={`grid grid-cols-7 text-center text-xs font-semibold ${headerText} mb-2 uppercase tracking-widest`}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {dates.map((day, idx) => (
          <div
            key={idx}
            onClick={() => day && handleClick(day)}
            title={day ? getHoliday(day) ?? undefined : undefined}
            className={`
              relative h-10 flex flex-col items-center justify-center text-sm cursor-pointer transition-all duration-150
              ${day ? hoverBg : ""}
              ${day ? normalText : ""}
              ${day ? getRangeShape(day, idx) : ""}
            `}
            style={day ? getDayStyle(day) : {}}
          >
            {day && (
              <>
                <span>{day.getDate()}</span>
                {getHoliday(day) && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#f87171" }}
                  />
                )}
                {hasEvents?.(day) && !getHoliday(day) && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      background: isStart(day) || isEnd(day) ? "#fff" : accentColor,
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Range label */}
      {startDate && (
        <p className={`mt-3 text-xs text-center ${rangeText}`}>
          {endDate
            ? `${startDate.toDateString()} → ${endDate.toDateString()}`
            : `From: ${startDate.toDateString()}`}
        </p>
      )}
    </div>
  );
}
