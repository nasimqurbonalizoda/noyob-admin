import { useState } from 'react';
import { useLoginMutation } from '../../store/authApi/authApi'; 
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, User, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [userName, setUserName] = useState('SuperAdmin');
  const [password, setPassword] = useState('SuperAdmin2024');

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (userName !== 'SuperAdmin' || password !== 'SuperAdmin2024') {
      toast.error('Access denied. Only SuperAdmin can log in.', {
        duration: 6000,
      });
      return;
    }

    try {
      const result = await login({
        userName,
        password,
      }).unwrap();

      localStorage.setItem('adminToken', result.data);

      toast.success('Login successful! Welcome back, SuperAdmin ', {
        duration: 4000,
        icon: '🚀',
      });

      navigate('/orders');
    } catch (error: any) {
      toast.error('Invalid username or password. Please try again.', {
        duration: 5000,
      });
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 w-full max-w-lg border border-white/20">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600/20 rounded-2xl">
              <ShoppingCart className="w-20 h-20 text-blue-300" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">NoyobTech Admin</h1>
          <p className="text-blue-200 text-lg">Sign in to your admin panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-900/50 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-6 h-6" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-blue-100 text-center text-sm mb-3">Demo Credentials:</p>
          <div className="space-y-2 text-blue-200 text-sm">
            <p className="flex justify-between">
              <span>Username:</span>
              <span className="font-semibold">SuperAdmin</span>
            </p>
            <p className="flex justify-between">
              <span>Password:</span>
              <span className="font-semibold">SuperAdmin2024</span>
            </p>
          </div>
        </div>
        <p className="text-center text-blue-300 text-xs mt-8">
          © 2026 NoyobTech. All rights reserved.
        </p>
      </div>
    </div>
  );
};
export default Login;