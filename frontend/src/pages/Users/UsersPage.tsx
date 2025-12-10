// import React from "react";

// const UsersPage: React.FC = () => {
//   return (
//     <div className="page-container">
//       <h2>Users</h2>
//       <p>Here we will list users and allow admin to assign roles.</p>
//     </div>
//   );
// };

// export default UsersPage;

import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import PermissionGuard from "../../components/PermissionGuard";

// 👇 TypeScript "interface" = shape of an object (similar to a JS object type)
interface Role {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  roles: Role[];
}

const UsersPage: React.FC = () => {
  // In JS: const [users, setUsers] = useState([]);
  // In TS: we tell React what type is inside this state: User[]
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    try {
      setError("");
      const [usersRes, rolesRes] = await Promise.all([
        axiosClient.get<User[]>("/users"),
        axiosClient.get<Role[]>("/roles")
      ]);
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users or roles");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignRoles = async () => {
    if (!selectedUserId) return;

    try {
      setError("");
      await axiosClient.put(`/users/${selectedUserId}/roles`, {
        roleIds: selectedRoles
      });

      await fetchData(); // refresh list after update
      setSelectedUserId(null);
      setSelectedRoles([]);
    } catch (err) {
      console.error(err);
      setError("Failed to assign roles");
    }
  };

  const toggleRoleInSelection = (roleId: string, checked: boolean) => {
    // TypeScript knows 'selectedRoles' is string[]
    if (checked) {
      setSelectedRoles((prev) => [...prev, roleId]);
    } else {
      setSelectedRoles((prev) => prev.filter((id) => id !== roleId));
    }
  };

  return (
    <div className="page-container">
      <h2>Users</h2>
      <p>Here we will list users and allow admin to assign roles.</p>

      {error && <p className="error-text">{error}</p>}

      {/* Only users with users:read permission can see the table */}
      <PermissionGuard
        permission="users:read"
        fallback={<p>You do not have access to view users.</p>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.roles.map((r) => r.name).join(", ") || "No roles"}</td>
                <td>
                  {/* Only users with users:update can see Assign Roles button */}
                  <PermissionGuard permission="users:update">
                    <button
                      className="btn"
                      onClick={() => {
                        setSelectedUserId(u._id);
                        // pre-select existing roles
                        setSelectedRoles(u.roles.map((r) => r._id));
                      }}
                    >
                      Assign Roles
                    </button>
                  </PermissionGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PermissionGuard>

      {/* Simple side panel/modal for assigning roles */}
      {selectedUserId && (
        <div className="assign-roles-panel">
          <h3>Assign Roles</h3>
          <div className="roles-list">
            {roles.map((role) => (
              <label key={role._id} className="role-item">
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role._id)}
                  onChange={(e) =>
                    toggleRoleInSelection(role._id, e.target.checked)
                  }
                />
                {role.name}
              </label>
            ))}
          </div>

          <div className="panel-actions">
            <button className="btn" onClick={handleAssignRoles}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedUserId(null);
                setSelectedRoles([]);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;

