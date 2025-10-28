import React, { useState } from "react";
import Modal from "../../components/primitives/Modal";
import type { EventCategory, CalendarEvent } from "./CalendarView.types";
import { useEventStore } from "../../store/eventStore";
import { useEffect } from "react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: Date | null;
}

const categories: EventCategory[] = ["work", "personal", "health", "reminder", "travel"];

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, defaultDate }) => {
  const addEvent = useEventStore((state) => state.addEvent);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(defaultDate || new Date());
  const [endDate, setEndDate] = useState(defaultDate || new Date());
  const [category, setCategory] = useState<EventCategory>("work");

  useEffect(() => {
    if (defaultDate) {
      setStartDate(defaultDate);
      setEndDate(defaultDate);
    }
  }, [defaultDate, isOpen]);

  const handleSave = () => {
    if (!title.trim()) return alert("Title is required");

    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title,
      description,
      startDate,
      endDate,
      category,
    };

    console.log("📝 Saving Event:", newEvent);
    addEvent(newEvent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Add Event</h2>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
          />
        </div>

        {/* Date */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={startDate.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={endDate.toISOString().split("T")[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          className="px-4 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100 transition"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-primary-600 transition"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EventModal;
