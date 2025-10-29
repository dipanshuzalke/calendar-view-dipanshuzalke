import { create } from "zustand";
import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

const STORAGE_KEY = "calendar_events";

// ✅ Load from localStorage once on startup
const loadEvents = (): CalendarEvent[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// ✅ Save to localStorage whenever events change
const saveEvents = (events: CalendarEvent[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

interface EventStore {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: Date) => CalendarEvent[];
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: loadEvents(),

 addEvent: (event) => {
  set((state) => {
    console.log("🟢 Event Added To Store:", event);
console.log("📍 All Events:", get().events);


    const updated = [...state.events, event];
    saveEvents(updated);

    console.log("Updated Events:", updated);
    return { events: updated };
  });
},

  updateEvent: (updatedEvent) => {
    set((state) => ({
      events: state.events.map((ev) =>
        ev.id === updatedEvent.id ? updatedEvent : ev
      ),
    }));
  },

  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter((ev) => ev.id !== id),
    }));
  },

  getEventsByDate: (date) => {
    return get().events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  },
}));
