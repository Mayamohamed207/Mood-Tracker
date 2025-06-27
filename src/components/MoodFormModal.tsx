import MoodForm from "./MoodForm";
import type { Entry } from "../types";

interface Props {
  onClose: () => void;
  onSubmit: (entry: Entry) => void;
}

export default function MoodFormModal({ onClose, onSubmit }: Props) {
  // Wrap onSubmit to inject today's date automatically
  const handleSubmit = (entry: Omit<Entry, "date">) => {
    const todayDate = new Date().toISOString().split("T")[0];
    onSubmit({ ...entry, date: todayDate });
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {/* Pass wrapped submit handler */}
        <MoodForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
