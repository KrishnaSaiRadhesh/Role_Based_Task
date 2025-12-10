// src/pages/RolesPage.tsx
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import PermissionGuard from "../../components/PermissionGuard";

interface Role {
  _id: string;
  name: string;
  permissions: string[];
}

// TS: React.FC means this is a component, no props.
const RolesPage: React.FC = () => {
  // useState<Role[]>([]) : the state is an array of Role
  const [roles, setRoles] = useState<Role[]>([]);
  const [name, setName] = useState<string>("");
  const [permissionsInput, setPermissionsInput] = useState<string>("");

  const fetchRoles = async () => {
    const res = await axiosClient.get("/roles");
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const permissions = permissionsInput
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    await axiosClient.post("/roles", { name, permissions });
    setName("");
    setPermissionsInput("");
    fetchRoles();
  };

  const handleDelete = async (id: string) => {
    await axiosClient.delete(`/roles/${id}`);
    fetchRoles();
  };

  return (
    <div>
      <h2>Roles</h2>

      {/* READ */}
      <PermissionGuard
        permission="roles:read"
        fallback={<p>You do not have access to view roles.</p>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(", ")}</td>
                <td>
                  <PermissionGuard permission="roles:delete">
                    <button onClick={() => handleDelete(role._id)}>Delete</button>
                  </PermissionGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PermissionGuard>

      {/* CREATE */}
      <PermissionGuard permission="roles:create">
        <div className="card">
          <h3>Create Role</h3>
          <form onSubmit={handleCreate} className="form">
            <input
              type="text"
              placeholder="Role name (e.g. manager)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Permissions, comma separated (e.g. users:read, tasks:create)"
              value={permissionsInput}
              onChange={(e) => setPermissionsInput(e.target.value)}
              rows={3}
            />
            <button type="submit">Create Role</button>
          </form>
        </div>
      </PermissionGuard>
    </div>
  );
};

export default RolesPage;
