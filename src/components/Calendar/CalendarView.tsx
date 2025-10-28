import React, { useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import CalendarHeader from "./CalenderHeader.tsx";

export const CalendarView = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrev = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

    const handleNext = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => setCurrentDate(new Date());

  return (
    <div className="bg-white rounded-4xl shadow-card p-6 max-w-6xl mx-auto">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onChangeView={setView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
      />

      {view === "month" ? (
        <MonthView currentDate={currentDate} />
      ) : (
        <WeekView currentDate={currentDate} />
      )}
    </div>
  );
};

export default CalendarView;
