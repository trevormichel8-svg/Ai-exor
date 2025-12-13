"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  async function load() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Email</th>
            <th>Credits</th>
            <th>Plan</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.credits}</td>
              <td>{u.plan}</td>
              <td>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() =>
                    fetch("/api/admin/reset", {
                      method: "POST",
                      body: JSON.stringify({ userId: u.id }),
                    })
                  }
                >
                  Reset Credits
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
      }
            
