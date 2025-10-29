import React, { useState } from "react";
import { format } from "date-fns";
import { getMonthGrid } from "../../utils/date.utils";
import CalendarCell from "./CalendarCell";
import EventModal from "./EventModal";
import type { CalendarEvent } from "./CalendarView.types";

export const CalendarView = () => {
  // const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);

  const monthDays = getMonthGrid(currentDate);

  const handlePrev = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
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
          <button
            onClick={handlePrev}
            className="px-3 py-1.5 border rounded-lg hover:bg-neutral-100"
          >
            &lt;
          </button>

          <h2 className="text-xl font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>

          <button
            onClick={handleNext}
            className="px-3 py-1.5 border rounded-lg hover:bg-neutral-100"
          >
            &gt;
          </button>
        </div>

        {/* Add Event Button */}
        <button
          onClick={() => openCreateModal()}
          className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition"
        >
          Add Event
        </button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 mb-2 text-center text-sm font-medium text-neutral-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {monthDays.map((dayObj, index) => (
          <CalendarCell
            key={index}
            date={dayObj.date}
            currentMonth={currentDate}
            onClick={() => openCreateModal(dayObj.date)} // ✅ Correct date
            onEventClick={(evt) => openEditModal(evt)}
          />
        ))}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEventToEdit(null);
          setSelectedDate(null);
        }}
        defaultDate={selectedDate}
        eventToEdit={eventToEdit}
      />
    </div>
  );
};

export default CalendarView;
