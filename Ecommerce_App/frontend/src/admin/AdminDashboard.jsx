import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user, navigate]);

  const cardClass = "p-6 bg-zinc-900 border border-white/5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-center flex flex-col justify-center gap-2.5";
  const numberClass = "text-4xl font-bold text-brand";

  return (
    <div className="p-5 max-w-[1000px] mx-auto">
      <div className="flex items-center gap-4 mb-1.5">
        <img src="/LetsShopLogo.png" alt="Logo" className="h-10 w-10 rounded-lg object-cover [filter:drop-shadow(0_0px_10px_rgba(168,85,247,0.3))]" />
        <h2 className="m-0">Admin Dashboard</h2>
      </div>
      <p className="text-zinc-400 mb-7 text-lg">Welcome back, <span className="text-white">{user?.name}</span></p>

      {stats ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
          <div className={cardClass}>
            <h4 className="text-zinc-400 text-base">Total Orders</h4>
            <div className={numberClass}>{stats.totalOrders}</div>
          </div>
          <div className={cardClass}>
            <h4 className="text-zinc-400 text-base">Total Products</h4>
            <div className={numberClass}>{stats.totalProducts}</div>
          </div>
          <div className={cardClass}>
            <h4 className="text-zinc-400 text-base">Total Users</h4>
            <div className={numberClass}>{stats.totalUsers}</div>
          </div>
          <div className={cardClass}>
            <h4 className="text-zinc-400 text-base">Total Revenue</h4>
            <div className={numberClass}>₹{stats.totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="text-center my-12 text-brand">Loading metrics...</div>
      )}

      <div className="mt-10 p-8 bg-zinc-900 rounded-xl border border-white/5">
        <h3 className="mb-6 text-brand">Administrative Controls</h3>
        <div className="flex gap-5 flex-wrap">
          <button className="btn" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
          <button className="btn bg-none bg-zinc-700 shadow-none" onClick={() => navigate('/admin/products')}>📦 Manage Products</button>
          <button className="btn bg-none bg-zinc-700 shadow-none" onClick={() => navigate('/admin/orders')}>🚚 Manage Orders</button>
          <button className="btn bg-none bg-zinc-700 shadow-none" onClick={() => navigate('/admin/users')}>👥 Users Directory</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
