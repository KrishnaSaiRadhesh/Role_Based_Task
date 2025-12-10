// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

/**
 * 🔹 TypeScript: define the shape of our User object
 * In JS you'd just "assume" what a user looks like.
 * In TS we describe it clearly, so editor can help us.
 */
type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];        // array of strings
  permissions: string[];  // array of strings
};

/**
 * 🔹 TypeScript: define the shape of context value
 * What things are available from AuthContext? user, token, etc.
 */
type AuthContextType = {
  user: User | null;                // can be User OR null
  token: string | null;             // can be string OR null
  login: (token: string, user: User) => void; // function type
  logout: () => void;               // function with no args, no return value
  hasPermission: (perm: string) => boolean;   // returns boolean
};

/**
 * 🔹 createContext<AuthContextType | undefined>
 * We tell TS: this context will hold AuthContextType OR undefined initially.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 🔹 React.FC<{ children: React.ReactNode }>
 * React.FC means "React Functional Component".
 * The component receives props with a 'children' property.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * 🔹 useState<User | null>
   * In JS: const [user, setUser] = useState(null)
   * In TS: we say what type 'user' will be: User or null
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * 🔹 useState<string | null>
   * token is either a string or null
   */
  const [token, setToken] = useState<string | null>(null);

  /**
   * On first render, read token + user from localStorage (if present)
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      // storedUser is a string, so we parse it as JSON and tell TS it's of type User
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * login function: store token + user in state + localStorage
   */
  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  /**
   * logout function: clear everything
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  /**
   * hasPermission: check if user has a specific permission string
   */
  const hasPermission = (perm: string): boolean => {
    // optional chaining ?. because user can be null
    return !!user?.permissions?.includes(perm);
  };

  /**
   * Provide the value to all children
   */
  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use AuthContext more easily
 */
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);

  // if used outside AuthProvider, throw error
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};
