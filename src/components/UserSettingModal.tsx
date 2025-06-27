import { useState } from "react";
import type { ChangeEvent } from "react";

interface Props {
  user: { name: string; avatar: string };
  setUser: React.Dispatch<React.SetStateAction<{ name: string; avatar: string }>>;
  onClose: () => void;
}

export default function UserSettingsModal({ user, setUser, onClose }: Props) {
  const defaultAvatar = "https://mayamohamed207.github.io/Mood-Tracker/images/userDefault.png";
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar || defaultAvatar);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser({ name, avatar });
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Profile</h2>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Avatar</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>

        <div className="avatar-save-group">
          <img
            src={avatar}
            alt="Avatar Preview"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
            className="avatar-preview"
          />
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}
