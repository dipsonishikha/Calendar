"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CalendarGrid from "./CalendarGrid";
import EventPanel from "./EventPanel";
import EventModal from "./EventModel";
import QuotePanel from "./QuotePanel";
import ThemePicker from "./ThemePicker";
import HolidayList from "./HolidayList";

import { MONTH_IMAGES } from "../../hooks/useCalendar";
import { useEvents } from "../../hooks/useEvents";
import { useTheme } from "../../hooks/useTheme";
import { useQuote } from "../../hooks/useQuote";
import { CalendarEvent } from "../../types/events";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(() => new Date());

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | undefined>();

  const { addEvent, updateEvent, deleteEvent, getEventsForDate, hasEvents } = useEvents();
  const { theme, setTheme, isDark, toggleDark, config, customImages, setCustomImage, removeCustomImage } = useTheme();
  const { quote, next: nextQuote } = useQuote();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthKey = `${year}-${month}`;

  const dayEvents = selectedDay ? getEventsForDate(selectedDay) : [];

  const openAddModal = () => {
    setEditingEvent(undefined);
    setModalOpen(true);
  };

  const openEditModal = (ev: CalendarEvent) => {
    setEditingEvent(ev);
    setModalOpen(true);
  };

  const changeMonth = (dir: number) => {
    setCurrentDate(new Date(year, month + dir, 1));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setCustomImage(monthKey, ev.target.result as string);
      }
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const heroImage = customImages[monthKey] ?? MONTH_IMAGES[month];

  const pageBg = isDark ? "from-gray-950 to-gray-900" : config.pageBg;
  const cardBg = isDark
    ? "bg-gray-900/90 border-white/10"
    : `${config.cardBg} border-gray-100`;

  const sidebarBg = isDark
    ? "bg-gray-900/80 border-white/10"
    : "bg-white/60 border-white/60";

  const divider = isDark ? "bg-white/10" : "bg-gray-100";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${pageBg} flex items-center justify-center p-4`}>
      <div className="w-full max-w-5xl">

        <div className="flex justify-center gap-5 mb-1">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="w-4 h-6 rounded-t-full border-2 border-gray-400 bg-gray-300" />
          ))}
        </div>

       <div className={`rounded-b-2xl shadow-2xl overflow-hidden border ${cardBg}`}>

  <div className="relative h-52 md:h-64">
    <img src={heroImage} className="w-full h-full object-cover" />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

    <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
      
      <div>
        <p className="text-white/70 text-sm">{year}</p>
        <h2 className="text-white text-4xl font-black">{MONTH_NAMES[month]}</h2>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => changeMonth(-1)}
          className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center text-2xl font-bold shadow-xl backdrop-blur-md transition hover:bg-white hover:scale-110 active:scale-95"
        >
          ←
        </button>

        <button
          onClick={() => changeMonth(1)}
          className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center text-2xl font-bold shadow-xl backdrop-blur-md transition hover:bg-white hover:scale-110 active:scale-95"
        >
          →
        </button>
      </div>

    </div>
  </div>


          <div className="flex flex-col lg:flex-row">

            <aside className={`w-full lg:w-72 p-4 ${sidebarBg}`}>
              <QuotePanel quote={quote} onNext={nextQuote} isDark={isDark} accentColor={config.accent} />
              <ThemePicker theme={theme} isDark={isDark} onTheme={setTheme} onToggleDark={toggleDark} />
              <HolidayList year={year} month={month} isDark={isDark} accentColor={config.accent} />
            </aside>

            <div className="flex-1 p-5">
              <CalendarGrid
                date={currentDate}
                onDayClick={setSelectedDay}
                hasEvents={hasEvents}
                selectedDay={selectedDay}
              />
            </div>

            <div className="w-full md:w-72">
              <EventPanel
                date={selectedDay}
                events={dayEvents}
                onAdd={openAddModal}
                onEdit={openEditModal}
                onDelete={deleteEvent}
              />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && selectedDay && (
        <EventModal
          date={selectedDay}
          event={editingEvent}
          onSave={editingEvent ? updateEvent : addEvent}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}