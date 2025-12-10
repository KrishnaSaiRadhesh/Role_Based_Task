// src/App.tsx
import React from "react";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    // AuthProvider gives user + token info to the whole app
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
