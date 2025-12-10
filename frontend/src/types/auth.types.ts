// src/types/auth.types.ts

// This matches the "user" shape returned from backend auth
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];        // just role names, like ["admin"]
  permissions: string[];  // e.g. ["users:read", "tasks:create"]
};

export type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  hasPermission: (perm: string) => boolean;
};
