import type { Entry } from "../types";

interface Props {
  entries: Entry[];
}

type Mood = "happy" | "excited" | "neutral" | "anxious" | "sad";

const moodDetails: Record<Mood, { color: string; emoji: string; score: number }> = {
  happy: { color: "#4caf50", emoji: "😊", score: 5 },
  excited: { color: "#2196f3", emoji: "🤩", score: 4 },
  neutral: { color: "#ffc107", emoji: "😐", score: 3 },
  anxious: { color: "#ff9800", emoji: "😰", score: 2 },
  sad: { color: "#f44336", emoji: "😢", score: 1 },
};

function moodToScore(mood: string): number {
  return (moodDetails as any)[mood]?.score ?? 3;
}

function scoreToMood(score: number): Mood {
  let closestMood: Mood = "neutral";
  let closestDiff = Infinity;
  for (const [mood, { score: s }] of Object.entries(moodDetails)) {
    const diff = Math.abs(score - s);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestMood = mood as Mood;
    }
  }
  return closestMood;
}

function compareTrend(
  current: number,
  previousAvg: number,
  count: number,
  threshold = 0.1
): string {
  if (count === 0) return ""; // no previous data to compare

  const diff = current - previousAvg;
  const suffix = ` previous ${count} check-in${count > 1 ? "s" : ""}`;

  if (Math.abs(diff) <= threshold) return `Same as${suffix}`;
  else if (diff > 0) return `Increased from${suffix}`;
  else return `Decreased from${suffix}`;
}

export default function Averages({ entries }: Props) {
  if (!entries.length) {
    return (
      <div className="card-custom empty-state" style={{ textAlign: "center" }}>
        <p>No moods entered yet. Log some to see averages.</p>
      </div>
    );
  }

  // Take up to 5 previous entries before current one
  const previousEntries = entries.slice(1, 6);
  const prevCount = previousEntries.length;

  // Current (most recent) entry
  const currentEntry = entries[0];

  // Average mood score of previous entries
  const prevMoodAvg =
    previousEntries.reduce((acc, e) => acc + moodToScore(e.mood), 0) / (prevCount || 1);
  // Current mood score
  const currentMoodScore = moodToScore(currentEntry.mood);
  // Mood trend string with count
  const moodTrend = compareTrend(currentMoodScore, prevMoodAvg, prevCount);

  // Average sleep of previous entries
  const prevSleepAvg = previousEntries.reduce((acc, e) => acc + e.sleep, 0) / (prevCount || 1);
  // Current sleep
  const currentSleep = currentEntry.sleep;
  // Sleep trend string with count
  const sleepTrend = compareTrend(currentSleep, prevSleepAvg, prevCount);

  // Average over last 5 (including current)
  const last5 = entries.slice(0, 5);
  const avgMoodScore =
    last5.reduce((acc, e) => acc + moodToScore(e.mood), 0) / (last5.length || 1);
  const avgMood = scoreToMood(avgMoodScore);

  const avgSleep =
    last5.reduce((acc, e) => acc + e.sleep, 0) / (last5.length || 1);

  return (
  <div className="left-col">
    <h4 style={{ color: "white" }}>Average Mood</h4>

    <div
      className={`card-custom average-card mood-${avgMood}`}
    >
      <h3>
        {moodDetails[avgMood]?.emoji} {avgMood}
      </h3>
      {moodTrend && <small className="trend-text mood-trend">{moodTrend}</small>}
    </div>

    <h4 style={{ color: "white" }}>Average Sleep</h4>

    <div className="card-custom sleep-card sleep-style">
      <p>{avgSleep.toFixed(1)} hrs</p>
      {sleepTrend && <small className="trend-text sleep-trend">{sleepTrend}</small>}
    </div>
  </div>
);
}
