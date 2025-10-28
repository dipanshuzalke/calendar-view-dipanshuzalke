export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  category?: string;
}

export interface CalendarViewProps {
  initialView?: "month" | "week";
  initialDate?: Date;
}
