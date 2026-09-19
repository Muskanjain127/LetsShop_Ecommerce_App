import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="max-w-[600px] mx-auto my-12 py-12 px-8 bg-zinc-900 rounded-2xl border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-center">
      <h2 className="text-4xl mb-5 text-emerald-500">Payment Successful!</h2>
      <p className="text-zinc-400 text-xl mb-10">
        Thank you for your order. We have securely received your payment and will process your shipment shortly.
      </p>
      <Link to="/shop" className="btn">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
