// src/components/Calendar/CalendarCell.tsx
import React from "react";
import { isSameDay, isSameMonth } from "../../utils/date.utils";
import { useEventStore } from "../../store/eventStore";
import { getCategoryStyles } from "../../utils/event.utils";
import type { CalendarEvent } from "./CalendarView.types";

interface CalendarCellProps {
  date: Date;
  currentMonth: Date;
  onClick?: () => void;
  onEventClick?: (evt: CalendarEvent) => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ date, currentMonth, onClick, onEventClick }) => {
  const today = new Date();
  const isToday = isSameDay(date, today);
  const inCurrentMonth = isSameMonth(date, currentMonth);

  const getEventsByDate = useEventStore((s) => s.getEventsByDate);
  const dayEvents = getEventsByDate(date) || [];

  const displayEvents = dayEvents.slice(0, 2);
  const extraCount = dayEvents.length - displayEvents.length;

  return (
    <div
      onClick={onClick}
      className={[
        "rounded-lg border border-neutral-200 p-2 h-24 cursor-pointer transition select-none flex flex-col",
        inCurrentMonth ? "bg-white" : "bg-neutral-50 text-neutral-400",
        isToday ? "ring-2 ring-primary-500" : "hover:shadow-card-hover",
      ].join(" ")}
    >
      <div className="text-sm font-medium mb-1">{date.getDate()}</div>

      <div className="flex flex-col gap-1 overflow-hidden">
        {displayEvents.map((evt) => (
          <button
            key={evt.id}
            onClick={(e) => {
              e.stopPropagation(); // prevent opening create modal
              onEventClick?.(evt);
            }}
            className={`text-xs px-2 py-0.5 rounded truncate text-left ${getCategoryStyles(evt.category)}`}
            title={evt.title}
          >
            {evt.title}
          </button>
        ))}

        {extraCount > 0 && (
          <div className="text-[11px] text-neutral-500">+{extraCount} more</div>
        )}
      </div>
    </div>
  );
};

export default CalendarCell;
