import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };
    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50">
      <h2 className="text-brand mb-5">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left text-zinc-400 text-sm">ORDER ID</th>
              <th className="p-4 text-left text-zinc-400 text-sm">USER</th>
              <th className="p-4 text-left text-zinc-400 text-sm">TOTAL</th>
              <th className="p-4 text-left text-zinc-400 text-sm">DATE</th>
              <th className="p-4 text-left text-zinc-400 text-sm">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-white/10">
                <td className="p-4 text-left">{order._id.substring(0, 8)}...</td>
                <td className="p-4 text-left">{order.userId?.name || 'Deleted User'}</td>
                <td className="p-4 text-left">₹{order.totalAmount.toFixed(2)}</td>
                <td className="p-4 text-left">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-left">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="bg-zinc-950 text-white p-1.5 border border-zinc-800 rounded outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
