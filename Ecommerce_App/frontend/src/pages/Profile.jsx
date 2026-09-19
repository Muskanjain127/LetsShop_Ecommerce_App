import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          // Token obsolete or 401: clear and bounce
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const statusColor = (status) =>
    status === 'Delivered' ? 'text-emerald-500 bg-emerald-500/10' :
    status === 'Shipped' ? 'text-blue-500 bg-blue-500/10' :
    'text-amber-500 bg-amber-500/10';

  return (
    <div className="max-w-[1000px] mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50">
      <div className="flex justify-between items-start border-b border-white/10 pb-8 mb-8 flex-wrap gap-5">
        <div>
          <h2 className="text-white text-[2.2rem] mb-2.5">My Profile</h2>
          <p className="text-zinc-400 text-xl mb-1"><strong>Name:</strong> {user.name}</p>
          <p className="text-zinc-400 text-xl mb-4"><strong>Email:</strong> {user.email}</p>
          <span className="bg-brand/10 text-brand py-1.5 px-3 rounded-lg text-sm font-bold inline-block">Account Type: {user.role.toUpperCase()}</span>
        </div>
        <button onClick={handleLogout} className="btn shadow-none bg-red-500 hover:brightness-110">Logout</button>
      </div>

      <h3 className="text-brand mb-5 text-2xl">Order History</h3>
      {loading ? (
        <p className="text-zinc-400">Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-zinc-950 p-8 rounded-lg text-center border border-zinc-800">
          <p className="text-zinc-400 mb-4">You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map(order => (
            <div key={order._id} className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-wrap justify-between items-center gap-5">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Order ID: <span className="text-white">{order._id}</span></p>
                <p className="text-zinc-400 text-sm mb-1">Placed On: <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <p className="text-zinc-400 text-sm">Total: <strong className="text-emerald-500">₹{order.totalAmount.toFixed(2)}</strong></p>
              </div>
              <div>
                <span className={`py-2 px-4 rounded-full font-bold ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
