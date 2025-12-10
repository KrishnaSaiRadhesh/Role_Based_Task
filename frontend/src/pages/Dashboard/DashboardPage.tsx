// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const DashboardPage: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="page-container">
//       <header className="page-header">
//         <h2>Dashboard</h2>
//         <div>
//           <span className="user-info">
//             Logged in as: {user?.name} ({user?.email})
//           </span>
//           <button onClick={logout}>Logout</button>
//         </div>
//       </header>

//       <nav className="page-nav">
//         <Link to="/users">Users</Link>
//         <Link to="/roles">Roles</Link>
//         <Link to="/tasks">Tasks</Link>
//       </nav>

//       <main>
//         <p>Welcome to the RBAC Admin Panel.</p>
//         <p>
//           Use the navigation above to manage <strong>Users</strong>,{" "}
//           <strong>Roles</strong> and <strong>Tasks</strong>.
//         </p>
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;


// src/pages/DashboardPage.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>This is a simple overview page.</p>

      {user && (
        <div className="card">
          <h3>Your Info</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong> {user.roles.join(", ") || "No roles assigned yet"}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

