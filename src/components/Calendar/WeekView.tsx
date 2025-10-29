import React from "react";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";
import CalendarCell from "./CalendarCell";

interface WeekViewProps {
  currentDate: Date;
  onDayClick: (date: Date) => void;
  onEventClick: (event: any) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  onDayClick,
  onEventClick,
}) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday
  const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2 text-center text-sm font-medium text-neutral-600">
        {weekDays.map((day) => (
          <div key={day.toISOString()}>
            {format(day, "EEE dd")}
          </div>
        ))}
      </div>

      {/* Calendar Cells */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => (
          <CalendarCell
            key={i}
            date={day}
            currentMonth={currentDate}
            onClick={() => onDayClick(day)}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
