interface User {
  name: string;
  avatar: string;
}

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onLogMoodClick: () => void;
  onAvatarClick: () => void;  // NEW
}

export default function Toolbar({ user, onAvatarClick }: Props) {
  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <span className="toolbar-icon">🌙</span>
        <span className="toolbar-title">Mood Tracker</span>
      </div>
      <div className="toolbar-right">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="avatar"
          onClick={onAvatarClick}  // NEW: open settings modal on click
          title="Click to edit user info"
          style={{ cursor: "pointer" }}
        />
      </div>
    </header>
  );
}
