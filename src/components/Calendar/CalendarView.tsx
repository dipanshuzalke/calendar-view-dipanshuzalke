import React, { useState } from "react";
import { format } from "date-fns";
import { getMonthGrid } from "../../utils/date.utils";
import CalendarCell from "./CalendarCell";
import WeekView from "./WeekView";
import EventModal from "./EventModal";
import type { CalendarEvent } from "./CalendarView.types";

export const CalendarView = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);

  const monthDays = getMonthGrid(currentDate);

  const goPrev = () => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        : new Date(prev.setDate(prev.getDate() - 7))
    );
  };

  const goNext = () => {
    setCurrentDate((prev) =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        : new Date(prev.setDate(prev.getDate() + 7))
    );
  };

  const openCreateModal = (date?: Date) => {
    setEventToEdit(null);
    setSelectedDate(date ?? null);
    setIsModalOpen(true);
  };

  const openEditModal = (evt: CalendarEvent) => {
    setEventToEdit(evt);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button onClick={goPrev} className="px-3 py-1.5 border rounded-lg hover:bg-neutral-100">
            &lt;
          </button>

          <h2 className="text-xl font-semibold">
            {view === "month"
              ? format(currentDate, "MMMM yyyy")
              : format(currentDate, "'Week of' MMM dd")}
          </h2>

          <button onClick={goNext} className="px-3 py-1.5 border rounded-lg hover:bg-neutral-100">
            &gt;
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1.5 border rounded-lg ${view === "month" && "bg-neutral-200"}`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-3 py-1.5 border rounded-lg ${view === "week" && "bg-neutral-200"}`}
          >
            Week
          </button>
        </div>

        <button
          className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition"
          onClick={() => openCreateModal()}
        >
          Add Event
        </button>
      </div>

      {/* ✅ Toggle Month / Week UI */}
      {view === "month" ? (
        <>
          {/* Month Weekdays */}
          <div className="grid grid-cols-7 mb-2 text-center text-sm font-medium text-neutral-600">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day, i) => (
              <CalendarCell
                key={i}
                date={day.date}
                currentMonth={currentDate}
                onClick={() => openCreateModal(day.date)}
                onEventClick={openEditModal}
              />
            ))}
          </div>
        </>
      ) : (
        <WeekView
          currentDate={currentDate}
          onDayClick={openCreateModal}
          onEventClick={openEditModal}
        />
      )}

      {/* Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDate(null);
          setEventToEdit(null);
        }}
        defaultDate={selectedDate}
        eventToEdit={eventToEdit}
      />
    </div>
  );
};

export default CalendarView;
