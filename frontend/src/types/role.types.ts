// src/types/roles.types.ts

// Basic Role type matching backend Role model
export type Role = {
  _id: string;
  name: string;
  permissions: string[]; // e.g. ["tasks:create", "tasks:read"]
  createdAt?: string;
  updatedAt?: string;
};
