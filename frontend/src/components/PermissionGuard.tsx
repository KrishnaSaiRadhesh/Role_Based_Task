// src/components/PermissionGuard.tsx

import React from "react";
import { useAuth } from "../context/AuthContext";

/**
 * ✅ Type for component props
 */
type PermissionGuardProps = {
  permission: string;                  // permission name like "users:read"
  children: React.ReactNode;            // anything React can render
  fallback?: React.ReactNode;            // OPTIONAL UI if permission is missing
};

/**
 * PermissionGuard component
 * It decides whether to render children based on permission
 */
const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallback = null
}) => {
  const { hasPermission } = useAuth();

  // If user does NOT have permission
  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // If user HAS permission
  return <>{children}</>;
};

export default PermissionGuard;
