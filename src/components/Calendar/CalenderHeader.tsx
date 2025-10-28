import React from "react";
import { Button } from "../primitives/Button";
import { Select } from "../primitives/Select";

interface CalendarHeaderProps {
  currentDate: Date;
  view: "month" | "week";
  onChangeView: (view: "month" | "week") => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onChangeView,
  onPrev,
  onNext,
  onToday,
}) => {
  const label = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      {/* Left: Navigation */}
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={onPrev}>
          Prev
        </Button>
        <Button variant="secondary" onClick={onToday}>
          Today
        </Button>
        <Button variant="secondary" onClick={onNext}>
          Next
        </Button>
      </div>

      {/* Middle: Label */}
      <h2 className="text-lg font-semibold text-neutral-800">{label}</h2>

      {/* Right: View Changer */}
      <Select
        value={view}
        onChange={(e) => onChangeView(e.target.value as "month" | "week")}
        className="w-28"
      >
        <option value="month">Month</option>
        <option value="week">Week</option>
      </Select>
    </div>
  );
};

export default CalendarHeader;
