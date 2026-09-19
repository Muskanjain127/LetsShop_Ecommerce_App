import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden text-white text-center py-24 px-8 rounded-2xl mb-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5 [background:radial-gradient(circle_at_top_right,rgba(168,85,247,0.2),transparent_60%),linear-gradient(135deg,#18181b_0%,#09090b_100%)]">
        <h1 className="text-[3.5rem] mb-5 [text-shadow:0_4px_20px_rgba(0,0,0,0.8)]">Welcome to LetsShop</h1>
        <p className="text-xl text-zinc-300">Discover the best products at unbeatable prices.</p>
      </div>
      <h2 className="heading-fade text-[2.2rem]">Featured Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-7 mt-7" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
