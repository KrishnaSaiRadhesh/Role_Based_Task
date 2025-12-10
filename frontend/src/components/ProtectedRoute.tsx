// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Type for the props of this component
// In JS we normally don't define this, but in TS we describe the shape.
type ProtectedRouteProps = {
  // children means: whatever React element we wrap inside <ProtectedRoute> ... </ProtectedRoute>
  // React.ReactElement is "one React component/element"
  children: React.ReactElement;
};

// We are using a normal function component with TypeScript type on props
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // useAuth() is our custom hook from AuthContext
  const { token } = useAuth();

  // If there is no token, user is not logged in
  if (!token) {
    // Navigate is a React Router component.
    // It redirects to the given route (here: /login).
    return <Navigate to="/login" replace />;
  }

  // If token exists, we allow rendering the requested page (children)
  return children;
};

export default ProtectedRoute;
