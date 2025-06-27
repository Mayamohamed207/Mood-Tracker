export interface Entry {
  hasEntry: any;
  mood: "happy" | "excited" | "neutral" | "anxious" | "sad"; // added missing moods
  feelings: string;
  reflection: string;
  sleep: number;
  date: string;
}
