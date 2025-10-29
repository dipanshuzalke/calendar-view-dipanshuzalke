import React from "react";
import CalendarCell from "./CalendarCell";
import { getMonthGrid } from "../../utils/date.utils";

interface MonthViewProps {
  currentDate: Date;
  onDayClick: (date: Date) => void;
  onEventClick: (event: any) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  onDayClick,
  onEventClick
}) => {
  const monthDays = getMonthGrid(currentDate);

  return (
    <div>
      {/* Days header */}
      <div className="grid grid-cols-7 mb-2 text-center text-sm font-medium text-neutral-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {monthDays.map((day, index) => (
          <CalendarCell
            key={index}
            date={day.date}               // ✅ Correct Date object
            currentMonth={currentDate}
            onClick={() => onDayClick(day.date)}        // ✅ Opens modal
            onEventClick={onEventClick}           // ✅ Edit modal works
          />
        ))}
      </div>
    </div>
  );
};

export default MonthView;
