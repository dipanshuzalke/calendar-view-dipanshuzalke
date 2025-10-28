import { create } from "zustand";
import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

interface EventStore {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: Date) => CalendarEvent[];
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],

 addEvent: (event) => {
  set((state) => {
    console.log("🟢 Event Added To Store:", event);
console.log("📍 All Events:", get().events);


    const updated = [...state.events, event];

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
