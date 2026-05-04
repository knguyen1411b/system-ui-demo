import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/services/api';

export default function DangkyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.username || !form.phone || !form.password || !form.confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (form.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      setLoading(true);
      await registerUser(form);
      setSuccess('Đăng ký thành công. Đang chuyển sang trang đăng nhập...');
      setTimeout(() => navigate('/pages/dangnhap'), 900);
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1b4b] min-h-screen text-white flex items-center justify-center px-6 py-10">
      <main className="w-full max-w-lg rounded-3xl p-8 border-t border-white/10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <h1 className="text-2xl font-extrabold tracking-tight text-center">Đăng ký tài khoản</h1>
        <p className="text-center text-sm text-gray-300 mt-2">MusicBox System</p>

        {error && (
          <p className="mt-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
            {success}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4 mt-6">
          <input
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Họ tên"
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm"
          />
          <input
            value={form.username}
            onChange={(e) => onChange('username', e.target.value)}
            placeholder="Tên đăng nhập"
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm"
          />
          <input
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Số điện thoại"
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm"
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => onChange('password', e.target.value)}
            placeholder="Mật khẩu"
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm"
          />
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            placeholder="Xác nhận mật khẩu"
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm"
          />

          <button
            disabled={loading}
            className="w-full bg-mb-purple-600 hover:bg-mb-purple-500 rounded-xl py-3 font-bold disabled:opacity-70"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>

          <p className="text-sm text-center text-gray-300">
            Đã có tài khoản?{' '}
            <Link to="/pages/dangnhap" className="text-mb-purple-400 hover:text-mb-purple-300">
              Đăng nhập
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}


