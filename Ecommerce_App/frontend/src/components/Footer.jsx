import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 px-5 py-10 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-center gap-5">
        <div>
          <h3 className="text-brand mb-2.5">LetsShop</h3>
          <p className="text-zinc-400 text-sm">Premium E-Commerce Platform.</p>
        </div>

        <div className="flex gap-5">
          <Link to="/about" className="text-zinc-400 text-sm hover:text-white">About Us</Link>
          <Link to="/return" className="text-zinc-400 text-sm hover:text-white">Return Policy</Link>
          <Link to="/disclaimer" className="text-zinc-400 text-sm hover:text-white">Disclaimer</Link>
        </div>

        <div className="text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} LetsShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
