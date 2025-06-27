import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Entry } from "../types";

interface Props {
  onSubmit: (entry: Entry) => void;
}

export default function MoodForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Entry, "date">>({
    mood: "neutral",
    feelings: "",
    reflection: "",
    sleep: 8,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newEntry: Entry = {
      ...form,
      sleep: Number(form.sleep),
      date: new Date().toISOString().split("T")[0],
    };
    onSubmit(newEntry);
    setForm({ mood: "neutral", feelings: "", reflection: "", sleep: 8 });
  };

  return (
    <form onSubmit={handleSubmit} className="card-custom">
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Mood</label>
          <select
                name="mood"
                value={form.mood}
                onChange={handleChange}
                className="form-select"
                >
                <option value="happy">😊 Happy</option>
                <option value="excited">🤩 Excited</option>
                <option value="neutral">😐 Neutral</option>
                <option value="anxious">😰 Anxious</option>
                <option value="sad">😢 Sad</option>
            </select>

        </div>
        <div className="col-md-4">
          <label className="form-label">Feelings</label>
          <input
            name="feelings"
            value={form.feelings}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., excited, anxious..."
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Sleep (hrs)</label>
          <input
            type="number"
            name="sleep"
            value={form.sleep}
            onChange={handleChange}
            className="form-control"
            min={0}
            max={24}
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="form-label">Reflection</label>
        <input
          name="reflection"
          value={form.reflection}
          onChange={handleChange}
          className="form-control"
          placeholder="Something you learned or felt today..."
        />
      </div>
      <div className="mt-4 text-end">
        <button className="btn btn-primary">Log Mood</button>
      </div>
    </form>
  );
}
