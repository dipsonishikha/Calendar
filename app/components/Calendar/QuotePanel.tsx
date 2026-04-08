"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "../../hooks/useCalendar";

interface Props {
  quote: Quote;
  onNext: () => void;
  isDark: boolean;
  accentColor: string;
}

export default function QuotePanel({ quote, onNext, isDark, accentColor }: Props) {
  const cardBg  = isDark ? "bg-white/5"  : "bg-white/70";
  const border  = isDark ? "border-white/10" : "border-white/60";
  const textPri = isDark ? "text-white/90"   : "text-gray-800";
  const textSec = isDark ? "text-white/50"   : "text-gray-400";

  return (
    <div
      className={`rounded-2xl p-4 backdrop-blur-md border ${cardBg} ${border} shadow-lg`}
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      {/* Label */}
      <p className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${textSec}`}>
        Daily Wisdom
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <p className={`text-[13px] italic leading-relaxed mb-2 ${textPri}`}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className={`text-[11px] font-semibold ${textSec}`}>— {quote.author}</p>
          {quote.src && (
            <p className={`text-[10px] mt-0.5 ${textSec} opacity-60`}>{quote.src}</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Refresh button */}
      <button
        onClick={onNext}
        className={`mt-3 text-[11px] px-3 py-1 rounded-full border transition-all hover:scale-105 active:scale-95
          ${isDark ? "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                   : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700"}`}
      >
        ↻ New quote
      </button>
    </div>
  );
}
