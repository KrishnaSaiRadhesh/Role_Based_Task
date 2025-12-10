// src/pages/NotAuthorizedPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotAuthorizedPage: React.FC = () => {
  return (
    <div>
      <h2>Not Authorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
};

export default NotAuthorizedPage;
