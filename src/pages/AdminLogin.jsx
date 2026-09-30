import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!data.success) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }
      
      // Store token
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Connection error. Try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
        
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded mb-4"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded mb-6"
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}