import React, { useState } from "react";
import type { CalendarViewProps } from "./CalendarView.types.ts";
import MonthView from "./MonthView";
import WeekView from "./WeekView";

export const CalendarView: React.FC<CalendarViewProps> = ({
  initialView = "month",
  initialDate = new Date(),
}) => {
  const [view, setView] = useState<"month" | "week">(initialView);
  const [currentDate, setCurrentDate] = useState(initialDate);

  return (
    <div>
      {view === "month" ? (
        <MonthView currentDate={currentDate} />
      ) : (
        <WeekView currentDate={currentDate} />
      )}
    </div>
  );
};

export default CalendarView;
