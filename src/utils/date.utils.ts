import {
  addDays,
  startOfWeek,
  startOfMonth,
  isSameMonth,
  isSameDay,
} from "date-fns";

export interface MonthDay {
  date: Date;
  inCurrentMonth: boolean;
}

export const getMonthGrid = (date: Date): MonthDay[] => {
  const firstDayOfMonth = startOfMonth(date);
  const gridStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }); // 0 = Sunday

  const days: MonthDay[] = [];

  for (let i = 0; i < 42; i++) {
    const current = addDays(gridStart, i);
    days.push({
      date: current,
      inCurrentMonth: isSameMonth(current, date),
    });
  }

  return days;
};

export { isSameDay, isSameMonth };
