import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/services/api';

export default function DangNhapPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    try {
      setIsLoading(true);
      const result = await login({ username, password });
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', result.token);
      localStorage.setItem('userRole', result.user.role);
      navigate('/pages/lichsu');
    } catch (error) {
      setErrorMessage(error.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1b4b] min-h-screen text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[300px] h-[300px] rounded-full z-0 pointer-events-none top-[-50px] left-[-50px] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,rgba(30,27,75,0)_70%)]" />
      <div className="absolute w-[400px] h-[400px] rounded-full z-0 pointer-events-none bottom-[-50px] right-[-50px] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,rgba(30,27,75,0)_70%)]" />

      <main className="w-full max-w-md px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="p-3 bg-[#8b5cf6] rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.4)] mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter">
            MUSIC<span className="text-[#8b5cf6]">BOX</span>
          </h1>
          <p className="text-[#c4b5fd] text-sm mt-2">Hệ thống quản trị & Đặt phòng</p>
        </div>

        <div className="rounded-3xl p-8 border-t border-white/10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <h2 className="text-xl font-bold mb-6 text-center">Đăng nhập tài khoản</h2>

          {errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-sm">
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#c4b5fd] uppercase tracking-wider mb-2">
                Tên đăng nhập / SĐT
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                placeholder="Nhập tài khoản của bạn"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-[#c4b5fd] uppercase tracking-wider">
                  Mật khẩu
                </label>
                <a
                  href="#"
                  className="text-xs text-[#8b5cf6] hover:text-[#c4b5fd] transition-colors"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3.5 px-4 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-4 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/pages/dangky"
                className="text-xs text-[#8b5cf6] hover:text-[#c4b5fd] transition-colors"
              >
                Bạn chưa có tài khoản? Đăng ký ngay
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8b5cf6] hover:bg-[#6d28d9] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng Nhập Ngay'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}


