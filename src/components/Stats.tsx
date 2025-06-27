import type { Entry } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

export default function Stats({ entries }: Props) {
  if (!entries.length) {
    return (
      <div className="card-custom empty-state">
        <p>No moods entered yet. Please log your mood to see the chart.</p>
      </div>
    );
  }

  const recent = entries.slice(0, 11).reverse();

  const chartData = recent.map((entry) => ({
    ...entry,
    moodScore: moodDetails[entry.mood as Mood]?.score ?? 3,
  }));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ payload: Entry }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const moodInfo = moodDetails[data.mood as Mood];
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "10px",
            fontSize: "14px",
            borderRadius: 4,
          }}
        >
          <div><strong>{label}</strong></div>
          <div>Mood: {moodInfo?.emoji} {data.mood}</div>
          <div>Sleep: {data.sleep} hrs</div>
          <div>Feelings: {data.feelings || "—"}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-custom">
      <h5 className="mb-3">Mood & Sleep Trend</h5>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barCategoryGap="10%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={40}
            tickFormatter={(date) => {
              const d = new Date(date);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
          />
          <YAxis
            domain={[0, 12]}
            tickCount={7}
            label={{ value: "", angle: 90, position: "insideRight" }}
          />
          <Tooltip content={<CustomTooltip />} />

        <Bar
        dataKey="sleep"
        radius={[20, 20, 0, 0]}
        label={({ x, y, width, index }) => {
            const mood = chartData[index].mood as Mood;
            const emoji = moodDetails[mood]?.emoji ?? "😐";

            return (
            <text
                x={x + width / 2}
                y={y + 24}
                textAnchor="middle"
                fontSize={32}
                dominantBaseline="middle"
                style={{ pointerEvents: "none" }}
            >
                {emoji}
            </text>
            );
        }}
        shape={({ x, y, width, height, payload }: any) => {
            const color = moodDetails[payload.mood as Mood]?.color ?? "#ccc";

            // Ensure a minimum height of 40px
            const minHeight = 40;
            const finalHeight = Math.max(height, minHeight);
            const adjustedY = y - (finalHeight - height); // move y upward if height increased

            return (
            <rect
                x={x}
                y={adjustedY}
                width={width}
                height={finalHeight}
                rx={25}
                ry={25}
                fill={color}
            />
            );
        }}
        />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
