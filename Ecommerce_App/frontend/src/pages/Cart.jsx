import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="heading-fade text-[2.2rem]">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop" className="text-brand font-semibold hover:underline">Go Shopping</Link></p>
      ) : (
        <div className="flex flex-col md:flex-row gap-10 mt-7">
          <div className="flex-[2] flex flex-col gap-5">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center bg-zinc-900 p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5 transition-transform duration-300 hover:translate-x-1 hover:border-brand/20"
              >
                <img src={item.imageUrl} alt={item.name} className="w-[120px] h-[120px] object-cover rounded-lg mr-7" />
                <div className="flex-1">
                  <h4 className="mb-4 text-xl">{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="flex items-center gap-4 my-4">
                    <button
                      onClick={() => handleUpdateQty(item, item.qty - 1)}
                      className="bg-zinc-800 text-white border border-zinc-700 w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition-all duration-200 hover:bg-brand hover:border-brand"
                    >-</button>
                    <span className="text-lg font-semibold">{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item, item.qty + 1)}
                      className="bg-zinc-800 text-white border border-zinc-700 w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition-all duration-200 hover:bg-brand hover:border-brand"
                    >+</button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="bg-red-500/10 text-red-500 border border-red-500/30 py-2 px-4 rounded-md cursor-pointer font-semibold transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 bg-zinc-900 p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/5 h-fit sticky top-[100px]">
            <h3 className="text-3xl mb-6 border-b border-white/10 pb-4">Total: ₹{totalPrice.toFixed(2)}</h3>
            <button onClick={() => navigate('/checkout')} className="btn w-full py-4 text-lg tracking-wide">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
