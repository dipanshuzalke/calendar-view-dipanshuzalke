import type { EventCategory } from "../components/Calendar/CalendarView.types";

export const getCategoryStyles = (category: EventCategory) => {
  switch (category) {
    case "work":
      return "bg-primary-100 text-black";
    case "personal":
      return "bg-success-50 text-success-700";
    case "health":
      return "bg-warning-50 text-warning-700";
    case "reminder":
      return "bg-neutral-100 text-neutral-700";
    case "travel":
      return "bg-primary-50 text-primary-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};
