interface Props {
  userName: string;
  onLogMoodClick: () => void;
}

export default function TodayGreeting({ userName, onLogMoodClick }: Props) {
  const todayString = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="today-greeting">
      <h1 style={{fontWeight:"bold"}}>Hello, {userName}!</h1>
      <p style={{ fontSize: "2.3rem", fontWeight:"bold" }}>How are you feeling today?</p>
      <p>{todayString}</p>.
      <button className="btn-log-mood" onClick={onLogMoodClick}>
        Log today's mood
      </button>
    </div>
  );
}
