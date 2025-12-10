// // src/api/roles.api.ts
// import axiosClient from "./axiosClient";
// import { Role } from "../types/role.types";

// // <Role[]> means the response .data will be an array of Role
// export const rolesApi = {
//   getAll: () => axiosClient.get<Role[]>("/roles"),
//   create: (payload: Pick<Role, "name" | "permissions">) =>
//     axiosClient.post<Role>("/roles", payload),
//   update: (id: string, payload: Partial<Role>) =>
//     axiosClient.put<Role>(`/roles/${id}`, payload),
//   remove: (id: string) => axiosClient.delete<{ message: string }>(`/roles/${id}`)
// };
