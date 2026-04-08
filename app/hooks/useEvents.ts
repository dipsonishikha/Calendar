import { useState, useEffect } from "react";
import { CalendarEvent } from "../types/events";

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cal-events");
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  const save = (updated: CalendarEvent[]) => {
    setEvents(updated);
    localStorage.setItem("cal-events", JSON.stringify(updated));
  };

  const addEvent    = (event: CalendarEvent) => save([...events, event]);
  const deleteEvent = (id: string)           => save(events.filter((e) => e.id !== id));
  const updateEvent = (updated: CalendarEvent) =>
    save(events.map((e) => (e.id === updated.id ? updated : e)));

  const getEventsForDate = (date: Date) => {
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return events.filter((e) => e.date === key);
  };

  const hasEvents = (date: Date) => getEventsForDate(date).length > 0;

  return { events, addEvent, deleteEvent, updateEvent, getEventsForDate, hasEvents };
}
