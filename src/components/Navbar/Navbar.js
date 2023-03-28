import "./Navbar.css";
import Temple from "../../assets/temple.svg";

import { useLogout } from "../../hooks/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext";

import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="logo" />
          <span>Project Management</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="./login">Login</Link>
            </li>
            <li>
              <Link to="./signup">Sing up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
