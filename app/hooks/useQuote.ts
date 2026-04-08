import { useState, useCallback, useEffect } from "react";
import { QUOTES, Quote } from "./useCalendar";

export function useQuote(): { quote: Quote; next: () => void } {
  const [idx, setIdx] = useState(0); // same on server + client

  useEffect(() => {
    setIdx(Math.floor(Math.random() * QUOTES.length));
  }, []);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % QUOTES.length);
  }, []);

  return { quote: QUOTES[idx], next };
}