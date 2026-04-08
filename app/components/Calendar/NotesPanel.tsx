"use client";

import { useState, useEffect } from "react";

const TAGS = ["personal", "work", "idea"] as const;
type Tag = typeof TAGS[number];

interface Note {
  id: number;
  text: string;
  tag: Tag;
  dateKey: string;
}

interface NotesPanelProps {
  selectedDate: Date | null;
  isDark?: boolean;
}

function toDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function NotesPanel({ selectedDate, isDark = false }: NotesPanelProps) {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [inputOpen, setInputOpen] = useState(false);
  const [text, setText] = useState("");
  const [tag, setTag] = useState<Tag>("personal");
  const [activeTag, setActiveTag] = useState<"all" | Tag>("all");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("calendar-notes");
      if (saved) setAllNotes(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(allNotes));
  }, [allNotes]);

  const currentKey = selectedDate ? toDateKey(selectedDate) : null;
  const notesForDay = currentKey ? allNotes.filter((n) => n.dateKey === currentKey) : [];
  const filtered = activeTag === "all" ? notesForDay : notesForDay.filter((n) => n.tag === activeTag);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  const saveNote = () => {
    if (!text.trim() || !currentKey) return;
    setAllNotes((prev) => [
      { id: Date.now(), text: text.trim(), tag, dateKey: currentKey },
      ...prev,
    ]);
    setText("");
    setInputOpen(false);
  };

  const deleteNote = (id: number) =>
    setAllNotes((prev) => prev.filter((n) => n.id !== id));

  // Theme-aware Tailwind classes
  const panelBg   = isDark ? "bg-gray-900/80"              : "bg-white/60";
  const dateColor  = isDark ? "text-white"                   : "text-gray-800";
  const btnBg      = isDark ? "bg-gray-800 border-white/10 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200";
  const pillBase   = isDark ? "border-white/10 text-gray-400 hover:bg-gray-800"
                            : "border-gray-200 text-gray-500 hover:bg-gray-100";
  const pillActive = isDark ? "bg-white text-gray-900 border-white"
                            : "bg-gray-900 text-white border-gray-900";
  const textareaBg = isDark ? "bg-gray-800 border-white/10 text-white placeholder-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400";
  const selectBg   = isDark ? "bg-gray-800 border-white/10 text-gray-300"
                            : "bg-gray-50 border-gray-200 text-gray-600";
  const divider    = isDark ? "border-white/10"              : "border-gray-100";
  const cardBg     = isDark ? "bg-gray-800/60 border-white/10" : "bg-gray-50 border-gray-100";
  const noteText   = isDark ? "text-gray-200"                : "text-gray-700";
  const noteTag    = isDark ? "text-gray-500"                : "text-gray-400";
  const deleteBtn  = isDark ? "text-gray-600 hover:text-gray-300" : "text-gray-300 hover:text-gray-500";
  const emptyHint  = isDark ? "text-gray-600"                : "text-gray-300";

  return (
    <div className={`${panelBg} p-4 flex flex-col gap-3`}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Notes
        </span>
        <button
          onClick={() => setInputOpen((v) => !v)}
          className={`text-xs px-3 py-1 rounded-lg border transition ${btnBg}`}
        >
          {inputOpen ? "Cancel" : "+ Add"}
        </button>
      </div>

      {/* Date label */}
      <p className={`text-sm font-semibold ${dateColor}`}>{formattedDate}</p>

      {/* Tag filter pills */}
      <div className="flex gap-1.5 flex-wrap">
        {(["all", ...TAGS] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`text-[11px] px-2.5 py-0.5 rounded-full border transition capitalize ${
              activeTag === t ? pillActive : pillBase
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Input area */}
      {inputOpen && (
        <div className="flex flex-col gap-2">
          <textarea
            className={`w-full resize-none text-sm rounded-lg border p-2.5 outline-none transition focus:ring-1 focus:ring-gray-400 ${textareaBg}`}
            placeholder="Write a note for this day…"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <div className="flex items-center justify-between">
            <select
              className={`text-xs px-2 py-1 rounded-lg border capitalize ${selectBg}`}
              value={tag}
              onChange={(e) => setTag(e.target.value as Tag)}
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button
              onClick={saveNote}
              className="text-xs font-semibold bg-gray-900 text-white px-4 py-1.5 rounded-lg hover:opacity-80 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className={`border-t ${divider}`} />

      {/* Notes list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className={`text-xs text-center mt-4 ${emptyHint}`}>
            No notes yet. Tap + Add to start.
          </p>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`relative rounded-lg border p-3 flex flex-col gap-1 ${cardBg}`}
            >
              <button
                onClick={() => deleteNote(n.id)}
                className={`absolute top-2 right-2.5 text-base leading-none transition ${deleteBtn}`}
              >
                ×
              </button>
              <p className={`text-sm pr-4 leading-snug ${noteText}`}>{n.text}</p>
              <span className={`text-[11px] capitalize ${noteTag}`}>{n.tag}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
