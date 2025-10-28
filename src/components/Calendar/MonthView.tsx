import React from "react";
import { getMonthGrid } from "../../utils/date.utils";
import CalendarCell from "./CalendarCell";

interface MonthViewProps {
  currentDate: Date;
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthView: React.FC<MonthViewProps> = ({ currentDate }) => {
  const days = getMonthGrid(currentDate);

  return (
    <div className="select-none">
      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-xs font-medium text-neutral-500 text-center py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <CalendarCell
            key={idx}
            date={day.date}
            currentMonth={currentDate}
          />
        ))}
      </div>
    </div>
  );
};

export default MonthView;
