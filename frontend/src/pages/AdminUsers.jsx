import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      {users.map(user => (
        <div key={user.id} className="border p-3 mb-2 rounded">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </div>
      ))}
    </div>
  );
}
