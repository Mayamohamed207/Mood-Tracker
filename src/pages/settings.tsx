import type { Entry } from "../types";

interface Props {
  entry: Entry;
}

export default function TodaySummary({ entry }: Props) {
  return (
    <div className="card-custom mb-4">
      <h5 className="mb-3">Today’s Summary</h5>
      <p>
        <strong>Mood:</strong> {entry.mood}
      </p>
      <p>
        <strong>Feelings:</strong> {entry.feelings}
      </p>
      <p>
        <strong>Reflection:</strong> {entry.reflection}
      </p>
      <p>
        <strong>Sleep:</strong> {entry.sleep} hours
      </p>
    </div>
  );
}
