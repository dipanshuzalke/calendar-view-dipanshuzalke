import React from "react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div>Modal</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventModal;
