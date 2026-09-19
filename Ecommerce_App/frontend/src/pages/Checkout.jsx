import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 🚀 Dedicated Bypass Payment Function
  const bypassPayment = async () => {
    try {
      console.log("⚡ Using Student Bypass Mode...");
      
      const saveOrderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: totalPrice,
          address,
          paymentId: 'bypass_txn_' + Date.now() // Fake test transaction ID
        })
      });

      if (saveOrderRes.ok) {
        alert("✅ Success! Order placed using Student Bypass Mode.");
        dispatch(clearCart());
        navigate('/ordersuccess');
      } else {
        const errorData = await saveOrderRes.json();
        alert(errorData.message || "Order saving failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during bypass order placement.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    // Yahan hum seedha bypassPayment function ko call kar rahe hain
    bypassPayment();
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <h2 className="heading-fade text-[2.2rem]">Checkout</h2>
      <div className="bg-zinc-900 p-10 rounded-xl border border-white/5 max-w-[600px] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 className="text-xl">Shipping Address (Bypass Mode Active)</h3>
          <input
            type="text" placeholder="Full Name" required value={address.fullName}
            onChange={(e) => setAddress({...address, fullName: e.target.value})}
            className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-[15px] outline-none focus:border-brand"
          />
          <input
            type="text" placeholder="Street" required value={address.street}
            onChange={(e) => setAddress({...address, street: e.target.value})}
            className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-[15px] outline-none focus:border-brand"
          />
          <input
            type="text" placeholder="City" required value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
            className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-[15px] outline-none focus:border-brand"
          />
          <input
            type="text" placeholder="Postal Code" required value={address.postalCode}
            onChange={(e) => setAddress({...address, postalCode: e.target.value})}
            className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-[15px] outline-none focus:border-brand"
          />
          <input
            type="text" placeholder="Country" required value={address.country}
            onChange={(e) => setAddress({...address, country: e.target.value})}
            className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-[15px] outline-none focus:border-brand"
          />
          <div className="mt-7 border-t border-white/10 pt-5 text-right">
            <h4 className="text-2xl mb-5 text-brand">Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn">Pay via Bypass Mode</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;