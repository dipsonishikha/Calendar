"use client";

import { useState, useCallback } from "react";
import { ThemeName, THEMES } from "./useCalendar";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>("default");
  const [isDark, setIsDark]    = useState(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name);
    // Cyberpunk is always dark
    if (name === "cyberpunk") setIsDark(true);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((p) => !p);
  }, []);

  const setCustomImage = useCallback((monthKey: string, dataUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [monthKey]: dataUrl }));
  }, []);

  const removeCustomImage = useCallback((monthKey: string) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[monthKey];
      return next;
    });
  }, []);

  const config = THEMES[theme];

  return {
    theme, setTheme,
    isDark, toggleDark,
    config,
    customImages, setCustomImage, removeCustomImage,
  };
}
