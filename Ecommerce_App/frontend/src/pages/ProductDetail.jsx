import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }));
      alert('Successfully added to your cart!');
    }
  };

  if (loading) return <div className="text-center m-24 text-brand">Loading Product...</div>;
  if (!product) return <div className="text-center m-24 text-red-500">Product Not Found</div>;

  return (
    <div className="max-w-[1200px] mx-auto p-5">

      {/* Breadcrumb Navigation */}
      <div className="text-zinc-400 mb-5 text-[0.95rem]">
        <Link to="/" className="text-brand">Home</Link> / <Link to="/shop" className="text-brand">Shop</Link> / {product.category} / <span className="text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-zinc-900 p-10 rounded-2xl border border-zinc-800">
        {/* Left Side: Image */}
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] object-cover" />
        </div>

        {/* Right Side: Information Block */}
        <div className="flex flex-col justify-center">

          <h2 className="text-[2.8rem] mb-2.5">{product.name}</h2>

          <p className="text-[2.5rem] my-4 text-brand font-bold">₹{product.price.toFixed(2)}</p>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-white mb-2.5">Product Description</h4>
            <p className="text-zinc-400 leading-relaxed">{product.description}</p>
          </div>

          {/* Cart & Stock Actions */}
          <div className="flex items-center gap-5">
            <button onClick={handleAddToCart} className="btn flex-grow py-4.5 text-xl">
              Add to Shopping Cart
            </button>
          </div>

          <p className={`mt-5 font-semibold ${product.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {product.stock > 0 ? `● In Stock (${product.stock} units available)` : `● Temporarily Out of Stock`}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
