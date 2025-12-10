// // src/api/users.api.ts
// import axiosClient from "./axiosClient";
// import { User } from "../types/user.types";

// export const usersApi = {
//   getAll: () => axiosClient.get<User[]>("/users"),

//   // roleIds is just string[] of Role._id
//   assignRoles: (userId: string, roleIds: string[]) =>
//     axiosClient.put<User>(`/users/${userId}/roles`, { roleIds })
// };
