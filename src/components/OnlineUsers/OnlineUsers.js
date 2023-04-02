import "./OnlineUsers.css";

import { useCollections } from "../../hooks/useCollections";
import Avatar from "../Avatar/Avatar";

export default function OnlineUsers() {
  const { documents, error } = useCollections("users");

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error.message}</div>}
      {/* <p>{documents.length}</p> */}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span className="user-name">{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
