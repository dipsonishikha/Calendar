"use client";

import { ThemeName } from "../../hooks/useCalendar";


interface Props {
  theme: ThemeName;
  isDark: boolean;
  onTheme: (theme: ThemeName) => void;
  onToggleDark: () => void;
}

export default function ThemePicker({
  theme,
  isDark,
  onTheme,
  onToggleDark,
}: Props) {


const themes: ThemeName[] = ["default", "lofi", "minimalist", "cyberpunk"];

  return (
    <div className="rounded-2xl p-4 border backdrop-blur-md bg-white/70 dark:bg-white/5">
      
      {/* Label */}
      <p className="text-[10px] uppercase tracking-widest font-bold mb-3 text-gray-400">
        Theme
      </p>

      {/* Theme buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => onTheme(t)}
            className={`text-xs px-3 py-1 rounded-full border transition
              ${
                theme === t
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        className={`text-xs px-3 py-1 rounded-full border transition
          ${
            isDark
              ? "bg-black text-white border-black"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
          }`}
      >
        {isDark ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
}