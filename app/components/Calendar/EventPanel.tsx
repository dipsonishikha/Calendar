"use client";

import { CalendarEvent } from "../../types/events";

interface Props {
  date: Date | null;
  events: CalendarEvent[];
  onAdd: () => void;
  onEdit: (e: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export default function EventPanel({
  date,
  events,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const formattedDate = date
    ? date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  if (!date) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-300 text-sm py-10">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <p className="mt-3">Click a day to see events</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-800">
          {formattedDate}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {events.length === 0
            ? "No events"
            : `${events.length} event${events.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Events */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {events.length === 0 && (
          <p className="text-xs text-gray-300 text-center mt-6">
            Nothing scheduled
          </p>
        )}

        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white border border-gray-100 rounded-lg p-3 flex gap-2 group"
          >
            <div
              className="w-1 rounded-full flex-shrink-0"
              style={{ background: ev.color }}
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {ev.title}
              </p>
              <p className="text-xs text-gray-400">
                {ev.startTime} – {ev.endTime}
              </p>
              {ev.notes && (
                <p className="text-xs text-gray-400 mt-1 truncate">
                  {ev.notes}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(ev)}
                className="text-gray-400 hover:text-gray-600"
                title="Edit"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              <button
                onClick={() => onDelete(ev.id)}
                className="text-gray-400 hover:text-red-400"
                title="Delete"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={onAdd}
          className="w-full py-2.5 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 flex items-center justify-center gap-2 transition"
        >
          <span className="text-lg leading-none">+</span> Add event
        </button>
      </div>
    </div>
  );
}