// // src/api/tasks.api.ts
// import axiosClient from "./axiosClient";
// import { Task } from "../types/task.types";

// export const tasksApi = {
//   getAll: () => axiosClient.get<Task[]>("/tasks"),
//   create: (payload: Pick<Task, "title" | "description">) =>
//     axiosClient.post<Task>("/tasks", payload),
//   update: (id: string, payload: Partial<Task>) =>
//     axiosClient.put<Task>(`/tasks/${id}`, payload),
//   remove: (id: string) => axiosClient.delete<{ message: string }>(`/tasks/${id}`)
// };
