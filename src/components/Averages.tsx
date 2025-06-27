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
  if (count === 0) return "";

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

  const previousEntries = entries.slice(1, 6);
  const prevCount = previousEntries.length;
  const currentEntry = entries[0];

  const prevMoodAvg =
    previousEntries.reduce((acc, e) => acc + moodToScore(e.mood), 0) / (prevCount || 1);
  const currentMoodScore = moodToScore(currentEntry.mood);
  const moodTrend = compareTrend(currentMoodScore, prevMoodAvg, prevCount);

  const prevSleepAvg = previousEntries.reduce((acc, e) => acc + e.sleep, 0) / (prevCount || 1);
  const currentSleep = currentEntry.sleep;
  const sleepTrend = compareTrend(currentSleep, prevSleepAvg, prevCount);

  const last5 = entries.slice(0, 5);
  const avgMoodScore =
    last5.reduce((acc, e) => acc + moodToScore(e.mood), 0) / (last5.length || 1);
  const avgMood = scoreToMood(avgMoodScore);
  const avgSleep = last5.reduce((acc, e) => acc + e.sleep, 0) / (last5.length || 1);

  return (
    <div className="left-col">
      <div className="card-custom averages-wrapper">
        <div className="average-card-inner">
          <div className="average-block">
            <h4 className="average-title">Average Mood</h4>
            <div className={`card-custom average-card mood-${avgMood}`}>
              <h3>
                {moodDetails[avgMood]?.emoji} {avgMood}
              </h3>
              {moodTrend && <small className="trend-text mood-trend">{moodTrend}</small>}
            </div>
          </div>

          <div className="average-block">
            <h4 className="average-title">Average Sleep</h4>
            <div className="card-custom sleep-card">
              <p>{avgSleep.toFixed(1)} hrs</p>
              {sleepTrend && <small className="trend-text sleep-trend">{sleepTrend}</small>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
