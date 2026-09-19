import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-500 border border-white/[0.03] flex flex-col relative hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(168,85,247,0.3)] group">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-5 text-left flex-grow flex flex-col justify-between bg-gradient-to-t from-zinc-900 from-80% to-transparent relative z-[2]">
        <h3 className="text-[1.1rem] mb-2.5 text-white whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h3>
        <p className="text-[22px] font-bold text-brand mb-4">₹{product.price}</p>
        <Link to={`/product/${product._id}`} className="btn">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
