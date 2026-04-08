"use client";

import { useEffect, useState } from "react";

interface Props {
  monthKey: string; // e.g. "2026-3"
  startDate: Date | null;
  endDate: Date | null;
}

export default function NotesPanel({ monthKey, startDate, endDate }: Props) {
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`cal-note-${monthKey}`);
    setNote(saved ?? "");
  }, [monthKey]);

  const handleChange = (val: string) => {
    setNote(val);
    localStorage.setItem(`cal-note-${monthKey}`, val);
  };

  const rangeLabel =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} – ${endDate.toLocaleDateString()}`
      : startDate
      ? startDate.toLocaleDateString()
      : "No date selected";

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">
          Notes
        </p>
        {startDate && (
          <p className="text-xs text-blue-500 font-medium">{rangeLabel}</p>
        )}
      </div>

      <textarea
        className="flex-1 w-full resize-none text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-gray-300 leading-relaxed font-mono min-h-[180px]"
        placeholder="Jot down memos, reminders, or plans for this month..."
        value={note}
        onChange={(e) => handleChange(e.target.value)}
      />

      {/* Ruled lines effect */}
      <div className="mt-2 space-y-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-px bg-amber-100" />
        ))}
      </div>
    </div>
  );
}