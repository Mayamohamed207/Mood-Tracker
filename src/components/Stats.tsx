import type { Entry } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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
  const recent = [...entries].slice(0, 11).reverse();

  // Fill up to 11 bars (fixed width) with placeholders
  const filledData: Entry[] = [...recent];
  while (filledData.length < 11) {
    filledData.push({
      date: new Date().toISOString(),
      mood: "neutral",
      sleep: 0,
      feelings: "",
      reflection: "",
      hasEntry: false
    });
  }

  const chartData = filledData.map((entry) => ({
    ...entry,
    moodScore: moodDetails[entry.mood as Mood]?.score ?? 3,
    hasEntry: entry.sleep > 0,
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
      if (!data.hasEntry) return null;

      const moodInfo = moodDetails[data.mood as Mood];
      return (
        <div className="custom-tooltip">
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
    <div className="right-col">
      <div className="card-custom">
        <h5 className="mb-3">Mood & Sleep Trend</h5>
        <div className="chart-wrapper" style={{ overflowX: "auto" }}>
          <BarChart
            width={11 * 58}
            height={320}
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 30 }}
            barCategoryGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={0}
              height={50}
              tick={({ x, y, payload, index }: any) => {
                const data = chartData[index];
                if (!data.hasEntry) {
                  // Return an empty SVG group instead of null to satisfy recharts' type requirements
                  return <g />;
                }

                const date = new Date(payload.value);
                const month = date.toLocaleString("default", { month: "short" });
                const day = date.getDate();

                return (
                  <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} textAnchor="middle" fill="#555">
                      {month}
                    </text>
                    <text x={0} y={0} dy={32} textAnchor="middle" fill="#555">
                      {day}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
  domain={[0, 12]}
  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
/>

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="sleep"
              barSize={40}
              radius={[20, 20, 0, 0]}
              label={(props: any) => {
                const { x, y, width, index } = props;
                const data = chartData[index];
                if (!data.hasEntry) {
                  // Return an empty SVG element instead of null to satisfy type requirements
                  return <g />;
                }

                const emoji = moodDetails[data.mood as Mood]?.emoji ?? "😐";
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
                const minHeight = payload.sleep > 0 ? 40 : 1;
                const finalHeight = Math.max(height, minHeight);
                const adjustedY = y - (finalHeight - height);
                return (
                  <rect
                    x={x}
                    y={adjustedY}
                    width={width}
                    height={finalHeight}
                    rx={25}
                    ry={25}
                    fill={color}
                    opacity={payload.sleep > 0 ? 1 : 0.1}
                  />
                );
              }}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
