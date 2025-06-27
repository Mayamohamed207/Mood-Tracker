import data from '../data/data.json';

interface Props {
  mood: "happy" | "excited" | "neutral" | "anxious" | "sad";
}


export default function QuoteCard({ mood }: Props) {
  const quote = data.quotes[mood];
  return (
    <div className="card-custom mb-4">
      <h5 className="mb-2">Mood Quote</h5>
      <blockquote className="blockquote text-muted">{quote}</blockquote>
    </div>
  );
}
