import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/auth/users', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };
    fetchUsers();
  }, [user]);

  return (
    <div className="max-w-[1200px] mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50">
      <h2 className="text-brand mb-5">User Directory</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left text-zinc-400 text-sm">ID</th>
              <th className="p-4 text-left text-zinc-400 text-sm">NAME</th>
              <th className="p-4 text-left text-zinc-400 text-sm">EMAIL</th>
              <th className="p-4 text-left text-zinc-400 text-sm">ROLE</th>
              <th className="p-4 text-left text-zinc-400 text-sm">JOINED</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b border-white/10">
                <td className="p-4 text-left">{u._id.substring(0, 8)}...</td>
                <td className="p-4 text-left">{u.name}</td>
                <td className="p-4 text-left">{u.email}</td>
                <td className="p-4 text-left">
                  <span className={`py-1 px-2 rounded text-sm font-bold ${u.role === 'admin' ? 'bg-brand/20 text-brand' : 'bg-emerald-500/20 text-emerald-500'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-left">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
