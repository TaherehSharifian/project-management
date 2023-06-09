import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import Dashboard from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";
import MyProjects from '../../assets/bookmark.svg'

import Avatar from "../Avatar/Avatar";

import { useAuthContext } from "../../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* user */}
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hello {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={Dashboard} alt="dashboard-icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-projects">
                <img src={Dashboard} alt="dashboard-icon" />
                <span>My Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add-icon" />
                <span>Create Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
