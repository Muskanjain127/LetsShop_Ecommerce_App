import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration Successful! Please check your email for the Welcome OTP.');
        login(data);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden bg-zinc-900 p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full max-w-[420px] flex flex-col gap-5 border border-white/5 before:content-[''] before:absolute before:top-0 before:-left-1/2 before:w-[200%] before:h-1 before:bg-gradient-to-r before:from-transparent before:via-brand before:to-transparent before:animate-shimmer"
      >
        <h2 className="text-center text-3xl text-white mb-2.5">Register</h2>
        <input
          type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required
          className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-[15px] text-white outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_2px_rgba(168,85,247,0.2)]"
        />
        <input
          type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-[15px] text-white outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_2px_rgba(168,85,247,0.2)]"
        />
        <input
          type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-[15px] text-white outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_2px_rgba(168,85,247,0.2)]"
        />
        <button type="submit" className="btn">Register</button>
        <p className="text-center mt-4 text-zinc-400">Already have an account? <Link to="/login" className="text-brand font-semibold hover:underline">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
