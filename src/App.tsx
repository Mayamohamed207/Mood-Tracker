import { useState } from "react";
import Toolbar from "./components/ToolBar";
import MoodFormModal from "./components/MoodFormModal";
import Dashboard from "./components/DashBoard";
import UserSettingsModal from "./components/UserSettingModal";
import type { Entry } from "./types";

export default function App() {
  const [user, setUser] = useState({ name: "User", avatar: "/default.png" });
  const [entries, setEntries] = useState<Entry[]>([]);  // START EMPTY!
  const [modalOpen, setModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleAddEntry(newEntry: Entry) {
    setEntries([newEntry, ...entries]);
    setModalOpen(false);
  }

  return (
    <>
      <Toolbar
        user={user}
        setUser={setUser}
        onLogMoodClick={() => setModalOpen(true)}
        onAvatarClick={() => setSettingsOpen(true)}
      />

      <div className="centered-wrapper">
        <Dashboard
          entries={entries}
          user={user}
          onLogMoodClick={() => setModalOpen(true)}
        />
      </div>

      {modalOpen && (
        <MoodFormModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddEntry}
        />
      )}

      {settingsOpen && (
        <UserSettingsModal
          user={user}
          setUser={setUser}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </>
  );
}
