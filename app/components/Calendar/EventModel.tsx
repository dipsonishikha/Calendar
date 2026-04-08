"use client";

import { useState } from "react";
import { CalendarEvent } from "../../types/events";

const COLORS = ["#378ADD","#639922","#BA7517","#D4537E","#A32D2D","#534AB7"];

interface Props {
  date: Date;
  event?: CalendarEvent;
  onSave: (e: CalendarEvent) => void;
  onClose: () => void;
  isDark?: boolean;
  accentColor?: string;
}

export default function EventModal({
  date, event, onSave, onClose, isDark = false, accentColor = "#6c5ce7",
}: Props) {
  const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const [title,     setTitle]     = useState(event?.title     ?? "");
  const [startTime, setStartTime] = useState(event?.startTime ?? "09:00 AM");
  const [endTime,   setEndTime]   = useState(event?.endTime   ?? "10:00 AM");
  const [notes,     setNotes]     = useState(event?.notes     ?? "");
  const [color,     setColor]     = useState(event?.color     ?? COLORS[0]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      id: event?.id ?? crypto.randomUUID(),
      date: dateKey, title: title.trim(),
      startTime, endTime, notes, color,
    });
    onClose();
  };

  const bg    = isDark ? "bg-[#1a1a35]"  : "bg-white";
  const text  = isDark ? "text-white/90" : "text-gray-800";
  const sub   = isDark ? "text-white/40" : "text-gray-400";
  const inp   = isDark
    ? "bg-white/5 border-white/10 text-white/90 placeholder-white/20 focus:ring-2"
    : "border-gray-200 text-gray-800 placeholder-gray-300 focus:ring-2 focus:ring-blue-300";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`${bg} rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-5`}>
        <h3 className={`text-sm font-semibold mb-4 ${text}`}>
          {event ? "Edit event" : "New event"} —{" "}
          {date.toLocaleDateString("default", { month: "short", day: "numeric" })}
        </h3>

        <div className="mb-3">
          <label className={`text-[10px] uppercase tracking-widest block mb-1 ${sub}`}>Title</label>
          <input
            autoFocus
            className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none ${inp}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { label: "Start", val: startTime, set: setStartTime },
            { label: "End",   val: endTime,   set: setEndTime },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className={`text-[10px] uppercase tracking-widest block mb-1 ${sub}`}>{label}</label>
              <input
                className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none ${inp}`}
                value={val}
                onChange={(e) => set(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label className={`text-[10px] uppercase tracking-widest block mb-1 ${sub}`}>Notes</label>
          <textarea
            className={`w-full border rounded-xl px-3 py-2 text-sm resize-none focus:outline-none ${inp}`}
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes…"
          />
        </div>
        <div className="mb-4">
          <label className={`text-[10px] uppercase tracking-widest block mb-2 ${sub}`}>Color</label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-6 h-6 rounded-full transition-transform"
                style={{
                  background: c,
                  outline: color === c ? `2px solid ${c}` : "none",
                  outlineOffset: "2px",
                  transform: color === c ? "scale(1.25)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className={`flex-1 py-2 text-sm rounded-xl border transition
              ${isDark ? "border-white/10 text-white/60 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 py-2 text-sm rounded-xl text-white font-semibold transition hover:opacity-90 disabled:opacity-40"
            style={{ background: accentColor }}
          >
            {event ? "Update" : "Save event"}
          </button>
        </div>
      </div>
    </div>
  );
}
