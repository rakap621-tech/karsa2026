"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau Password salah!");
    } else {
      router.push('/admin'); // Arahkan ke halaman admin jika sukses
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">Login Admin KARSA</h1>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full border p-2 rounded mt-1 outline-none focus:border-green-500"
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full border p-2 rounded mt-1 outline-none focus:border-green-500"
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-green-700 text-white font-bold py-2 rounded mt-2 hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}