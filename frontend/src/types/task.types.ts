// src/types/task.types.ts

// Representing a Task document from backend
export type Task = {
  _id: string;
  title: string;
  description?: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
