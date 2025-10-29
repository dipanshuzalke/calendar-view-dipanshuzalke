import React, { useState } from "react";
import { format, addDays } from "date-fns";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import EventModal from "./EventModal";
import type { CalendarEvent } from "./CalendarView.types";

const CalendarView = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);

  // ✅ Navigation based on active view mode
  const handlePrev = () => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        : addDays(prev, -7)
    );
  };

  const handleNext = () => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        : addDays(prev, 7)
    );
  };

  const handleToday = () => setCurrentDate(new Date());

  // ✅ Modal handlers
  const openCreateModal = (date?: Date) => {
    setEventToEdit(null);
    setSelectedDate(date ?? new Date());
    setIsModalOpen(true);
  };

  const openEditModal = (evt: CalendarEvent) => {
    setEventToEdit(evt);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventToEdit(null);
    setSelectedDate(null);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 border rounded-lg hover:bg-neutral-100"
          >
            &lt;
          </button>

          <h2 className="text-xl font-semibold min-w-[160px] text-center">
            {format(currentDate, "MMMM yyyy")}
          </h2>

          <button
            onClick={handleNext}
            className="px-3 py-1.5 border rounded-lg hover:bg-neutral-100"
          >
            &gt;
          </button>

          <button
            onClick={handleToday}
            className="px-3 py-1.5 border rounded-lg hover:bg-neutral-100"
          >
            Today
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1.5 border rounded-lg text-sm transition ${
              view === "month" ? "bg-neutral-200" : "hover:bg-neutral-100"
            }`}
          >
            Month
          </button>

          <button
            onClick={() => setView("week")}
            className={`px-3 py-1.5 border rounded-lg text-sm transition ${
              view === "week" ? "bg-neutral-200" : "hover:bg-neutral-100"
            }`}
          >
            Week
          </button>
        </div>

        {/* Add Event */}
        <button
          onClick={() => openCreateModal()}
          className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition"
        >
          Add Event
        </button>
      </div>

      {/* Render Correct View */}
      {view === "month" ? (
        <MonthView
          currentDate={currentDate}
          {...({ onDayClick: openCreateModal, onEventClick: openEditModal } as any)}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          {...({ onDayClick: openCreateModal, onEventClick: openEditModal } as any)}
        />
      )}

      {/* Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultDate={selectedDate}
        eventToEdit={eventToEdit}
      />
    </div>
  );
};

export default CalendarView;
