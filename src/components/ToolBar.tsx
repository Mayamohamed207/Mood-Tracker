interface Props {
  user: { name: string; avatar: string };
  setUser: React.Dispatch<React.SetStateAction<{ name: string; avatar: string }>>;
  onLogMoodClick: () => void;
  onAvatarClick: () => void;
}


export default function Toolbar({ user, onAvatarClick }: Props) {
  const defaultAvatar = "https://mayamohamed207.github.io/Mood-Tracker/images/userDefault.png";

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="toolbar-icon">🌙</div>
        <div className="toolbar-title">Mood Tracker</div>
      </div>

      <div className="toolbar-right">
        <img
          src={user.avatar || defaultAvatar}
          alt="User Avatar"
          className="avatar"
          onClick={onAvatarClick}
          onError={(e) => (e.currentTarget.src = defaultAvatar)}
        />
      </div>
    </div>
  );
}
