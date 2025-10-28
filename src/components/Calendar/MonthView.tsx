import React from "react";

interface MonthViewProps {
  currentDate: Date;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate }) => {
  return <div>Month View</div>;
};

export default MonthView;
