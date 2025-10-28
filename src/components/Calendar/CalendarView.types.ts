export type EventCategory = "work" | "personal" | "health" | "reminder" | "travel";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  category: EventCategory;
}


export interface CalendarViewProps {
  initialView?: "month" | "week";
  initialDate?: Date;
}
