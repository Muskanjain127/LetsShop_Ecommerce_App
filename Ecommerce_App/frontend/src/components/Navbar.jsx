import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-12 py-4.5 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-[1000] shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex-wrap gap-4 sm:px-5 sm:py-4">
      <div>
        <Link to="/" className="flex items-center gap-2.5 text-[28px] font-bold text-white tracking-tight [text-shadow:0_2px_10px_rgba(168,85,247,0.3)] after:content-['.'] after:text-brand after:text-[36px]">
          <img
            src="/LetsShopLogo.svg"
            alt="LetsShop"
            className="h-9 w-9 rounded-lg object-cover [filter:drop-shadow(0_2px_8px_rgba(168,85,247,0.35))]"
          />
          LetsShop
        </Link>
      </div>
      <ul className="flex items-center gap-7">
        <li><Link to="/shop" className="text-[15px] font-medium text-zinc-400 hover:text-white relative">Shop</Link></li>
        <li><Link to="/cart" className="text-[15px] font-medium text-zinc-400 hover:text-white relative">Cart ({cartItems.length})</Link></li>
        {user ? (
          <>
            <li><Link to="/profile" className="text-[15px] font-medium text-zinc-400 hover:text-white relative">Hi, {user.name}</Link></li>
            {user.role === 'admin' && <li><Link to="/admin" className="text-[15px] font-medium text-zinc-400 hover:text-white relative">Admin</Link></li>}
            <li>
              <button
                onClick={handleLogout}
                className="bg-transparent text-red-500 border border-red-500/30 py-2 px-4 rounded-md cursor-pointer font-semibold transition-all duration-300 hover:bg-red-500/10 hover:border-red-500 hover:-translate-y-px"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login" className="text-[15px] font-medium text-zinc-400 hover:text-white relative">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
