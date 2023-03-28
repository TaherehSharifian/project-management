import "./Sidebar.css";
import Dashboard from "../../assets/dashboard_icon.svg";
import AddIcon from "../../assets/add_icon.svg";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* user */}
        <div className="user">{/* avatar and username */}</div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={Dashboard} alt="dashboard-icon" />
                <span>Dashboard</span>
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
