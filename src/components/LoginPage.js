import React, { useState } from 'react';
import { Code, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const defaultEmail = "apg@gmail.com";
    const defaultPassword = "123";

    setTimeout(() => {
      setIsLoading(false);

      if (
        (isLogin && formData.email === defaultEmail && formData.password === defaultPassword) ||
        !isLogin
      ) {
        navigate('/code-debug-quiz'); // Redirects here after login/signup
      } else {
        alert("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Code className="w-16 h-16 text-teal-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Debug Master</h1>
          <p className="text-slate-300">Master the art of debugging code</p>
        </div>

        <div className="bg-slate-900/20 backdrop-blur-sm rounded-2xl p-8 border border-teal-500/20 shadow-2xl">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isLogin 
                  ? 'bg-teal-500 text-white shadow-lg transform scale-105' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                !isLogin 
                  ? 'bg-teal-500 text-white shadow-lg transform scale-105' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/30 border border-teal-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/30 border border-teal-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-4 bg-slate-800/30 border border-teal-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/30 border border-teal-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-300">
                  <input type="checkbox" className="mr-2 rounded" />
                  Remember me
                </label>
                <button type="button" className="text-teal-400 hover:text-teal-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>{isLogin ? 'Login to Debug' : 'Start Debugging'}</span>
                )}
              </div>
            </button>

            {isLogin && (
              <p className="text-xs text-amber-400 text-center mt-2">
                Default: <strong>apg@gmail.com</strong> / <strong>123</strong>
              </p>
            )}
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            By continuing, you agree to our{' '}
            <button className="text-teal-400 hover:text-teal-300 transition-colors">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-teal-400 hover:text-teal-300 transition-colors">
              Privacy Policy
            </button>
          </p>
        </div>

        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>Ready to become a debugging expert?</p>
          <p className="mt-2">Join thousands of developers mastering their skills!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
