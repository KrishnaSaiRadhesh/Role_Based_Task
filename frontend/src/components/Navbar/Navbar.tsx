// // src/components/Navbar.tsx
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// // React.FC means "React Functional Component"
// const Navbar: React.FC = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <span className="navbar-logo">RBAC Admin</span>

//         {/* NavLink adds an "active" class automatically when that route is active */}
//         <NavLink to="/" className="nav-link">
//           Dashboard
//         </NavLink>
//         <NavLink to="/users" className="nav-link">
//           Users
//         </NavLink>
//         <NavLink to="/roles" className="nav-link">
//           Roles
//         </NavLink>
//         <NavLink to="/tasks" className="nav-link">
//           Tasks
//         </NavLink>
//       </div>

//       <div className="navbar-right">
//         {user ? (
//           <>
//             <span className="navbar-user">Hi, {user.name}</span>
//             <button className="btn small" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <NavLink to="/login" className="nav-link">
//               Login
//             </NavLink>
//             <NavLink to="/register" className="nav-link">
//               Register
//             </NavLink>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
