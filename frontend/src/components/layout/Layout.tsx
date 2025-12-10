// src/components/Layout/Layout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// TypeScript: describe the props.
// Here we don't need any props, so we can just use React.FC without generic.
const Layout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="layout-header">
        <h1>RBAC Admin Panel</h1>
        <div className="layout-user">
          {user && (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </header>

      <div className="layout-body">
        <nav className="layout-sidebar">
          {/* Link is same as in JS, TS infers types automatically */}
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/roles">Roles</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>

        <main className="layout-content">
          {/* Outlet -> where nested routes will render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
