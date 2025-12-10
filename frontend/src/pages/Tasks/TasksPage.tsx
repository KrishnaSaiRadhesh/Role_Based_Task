// import React from "react";

// const TasksPage: React.FC = () => {
//   return (
//     <div className="page-container">
//       <h2>Tasks</h2>
//       <p>Here we will manage tasks with CRUD operations.</p>
//     </div>
//   );
// };

// export default TasksPage;


// src/pages/TasksPage.tsx
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import PermissionGuard from "../../components/PermissionGuard";

interface Task {
  _id: string;
  title: string;
  description?: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const fetchTasks = async () => {
    const res = await axiosClient.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosClient.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await axiosClient.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* READ */}
      <PermissionGuard
        permission="tasks:read"
        fallback={<p>You do not have access to view tasks.</p>}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>
                  {t.createdBy
                    ? `${t.createdBy.name} (${t.createdBy.email})`
                    : "N/A"}
                </td>
                <td>
                  <PermissionGuard permission="tasks:delete">
                    <button onClick={() => handleDelete(t._id)}>Delete</button>
                  </PermissionGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PermissionGuard>

      {/* CREATE */}
      <PermissionGuard permission="tasks:create">
        <div className="card">
          <h3>Create Task</h3>
          <form onSubmit={handleCreate} className="form">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <button type="submit">Create Task</button>
          </form>
        </div>
      </PermissionGuard>
    </div>
  );
};

export default TasksPage;
