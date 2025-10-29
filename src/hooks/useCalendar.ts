import { useState, useCallback } from "react";
import { addDays } from "date-fns";

export const useCalendar = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const goPrev = useCallback(() => {
    setCurrentDate(prev =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        : addDays(prev, -7)
    );
  }, [view]);

  const goNext = useCallback(() => {
    setCurrentDate(prev =>
      view === "month"
        ? new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        : addDays(prev, 7)
    );
  }, [view]);

  const goToday = useCallback(() => setCurrentDate(new Date()), []);

  return {
    view, setView,
    currentDate, setCurrentDate,
    goPrev, goNext, goToday,
  };
};
