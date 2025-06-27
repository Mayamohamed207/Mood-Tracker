import type { Entry } from "../types";
import TodayGreeting from "../components/TodayGreeting";
import Averages from "../components/Averages";
import Stats from "../components/Stats";

interface Props {
  entries: Entry[];
  user: { name: string; avatar: string };
  onLogMoodClick: () => void;
}

export default function Home({ entries, user, onLogMoodClick }: Props) {
  return (
    <main className="dashboard">
      {/* First Row */}
      <section className="first-row">
        <TodayGreeting userName={user.name} onLogMoodClick={onLogMoodClick} />
      </section>

      {/* Second Row: two columns */}
      <section className="second-row">
        <div className="left-col">
          <Averages entries={entries} />
        </div>
        <div className="right-col">
          <Stats entries={entries} />
        </div>
      </section>
    </main>
  );
}
