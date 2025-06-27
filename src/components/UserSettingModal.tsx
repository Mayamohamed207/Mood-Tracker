import { useState } from "react";
import type { ChangeEvent } from "react";

interface Props {
  user: { name: string; avatar: string };
  setUser: React.Dispatch<React.SetStateAction<{ name: string; avatar: string }>>;
  onClose: () => void;
}

export default function UserSettingsModal({ user, setUser, onClose }: Props) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

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
        {avatar && (
          <img
            src={avatar}
            alt="Avatar Preview"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
        )}
        <button className="btn btn-primary mt-3" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
}
