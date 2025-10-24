import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../api/userAPI";
import "../styles/users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await getUsers();
    setUsers(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createUser(form);
    setForm({ username: "", email: "", password: "" });
    fetchUsers();
  }

  async function handleDelete(id) {
    await deleteUser(id);
    fetchUsers();
  }

  return (
    <div className="page">
      <h2>Users</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.username} — {u.email}
            <button onClick={() => handleDelete(u._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
