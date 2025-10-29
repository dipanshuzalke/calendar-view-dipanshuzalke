// src/components/Calendar/EventModal.tsx
import React, { useEffect, useState } from "react";
import Modal from "../../components/primitives/Modal";
import type { EventCategory, CalendarEvent } from "./CalendarView.types";
import { useEventStore } from "../../store/eventStore";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: Date | null; // used when creating
  eventToEdit?: CalendarEvent | null; // used for edit
}

const categories: EventCategory[] = ["work", "personal", "health", "reminder", "travel"];

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, defaultDate, eventToEdit = null }) => {
  const addEvent = useEventStore((s) => s.addEvent);
  const updateEvent = useEventStore((s) => s.updateEvent);
  const deleteEvent = useEventStore((s) => s.deleteEvent);

  const isEdit = Boolean(eventToEdit);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(defaultDate || new Date());
  const [endDate, setEndDate] = useState<Date>(defaultDate || new Date());
  const [category, setCategory] = useState<EventCategory>("work");

  // Sync when modal opens or eventToEdit/defaultDate changes
  useEffect(() => {
    if (isEdit && eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description ?? "");
      // ensure Date instances
      setStartDate(new Date(eventToEdit.startDate));
      setEndDate(new Date(eventToEdit.endDate));
      setCategory(eventToEdit.category ?? "work");
    } else {
      setTitle("");
      setDescription("");
      setStartDate(defaultDate ?? new Date());
      setEndDate(defaultDate ?? new Date());
      setCategory("work");
    }
  }, [isOpen, eventToEdit, defaultDate, isEdit]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    // ensure endDate >= startDate
    if (endDate < startDate) {
      alert("End date cannot be before start date");
      return;
    }

    if (isEdit && eventToEdit) {
      const updated: CalendarEvent = {
        ...eventToEdit,
        title: title.trim(),
        description,
        startDate,
        endDate,
        category,
      };
      updateEvent(updated);
    } else {
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description,
        startDate,
        endDate,
        category,
      };
      addEvent(newEvent);
    }

    onClose();
  };

  const handleDelete = () => {
    if (!isEdit || !eventToEdit) return;
    const ok = confirm("Delete this event?");
    if (!ok) return;
    deleteEvent(eventToEdit.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">{isEdit ? "Edit Event" : "Add Event"}</h2>

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
      <div className="flex justify-between items-center gap-3 mt-6">
        <div>
          {isEdit && (
            <button
              className="px-3 py-2 text-sm rounded-lg text-error-700 hover:bg-error-50 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 text-sm rounded-lg border border-neutral-300 hover:bg-neutral-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 text-sm rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition"
            onClick={handleSave}
          >
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
