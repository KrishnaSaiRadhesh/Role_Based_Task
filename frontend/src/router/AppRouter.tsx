// // src/router/AppRouter.tsx

// import React from "react";
// // BrowserRouter: wraps your entire app and enables routing
// // Routes: container for all Route components
// // Route: defines path => which component to show
// // Navigate: used for redirecting (e.g. unknown routes)
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Import all the pages (we will create these if not already)
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import DashboardPage from "../pages/DashboardPage";
// import UsersPage from "../pages/UsersPage";
// import RolesPage from "../pages/RolesPage";
// import TasksPage from "../pages/TasksPage";
// import NotAuthorizedPage from "../pages/NotAuthorizedPage";

// // ProtectedRoute will check if user is logged in (token available)
// import ProtectedRoute from "../components/ProtectedRoute";

// // (Optional) If you create a Layout with navbar/sidebar, import it
// // import Layout from "../components/Layout/Layout";

// // TypeScript: React.FC means "React Function Component"
// // In JS you would write: const AppRouter = () => { ... }
// // In TS: const AppRouter: React.FC = () => { ... }
// const AppRouter: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes - no login needed */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//         {/* Protected routes - user must be logged in */}

//         {/* Dashboard (home) */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               {/* If you have a Layout, you can wrap it like:
//                   <Layout><DashboardPage /></Layout>
//               */}
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Users page */}
//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <UsersPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Roles page */}
//         <Route
//           path="/roles"
//           element={
//             <ProtectedRoute>
//               <RolesPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Tasks page */}
//         <Route
//           path="/tasks"
//           element={
//             <ProtectedRoute>
//               <TasksPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* No access page (if you want to redirect here when permission fails) */}
//         <Route path="/not-authorized" element={<NotAuthorizedPage />} />

//         {/* Fallback route - if path doesn't match anything, go to "/" */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;


// src/router/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import UsersPage from "../pages/Users/UsersPage";
import RolesPage from "../pages/Roles/RolesPage";
import TasksPage from "../pages/Tasks/TasksPage";
import NotAuthorizedPage from "../pages/NotAuthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/layout/Layout";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes with layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="tasks" element={<TasksPage />} />
        </Route>

        {/* Fallback */}
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
