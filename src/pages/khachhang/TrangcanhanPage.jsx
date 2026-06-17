import Logo from '@/components/Logo';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function TrangCaNhanPage() {
  // --- Quản lý Trạng thái (React States) ---
  const [showEdit, setShowEdit] = useState(false);


  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    phone: '0901 234 567',
    points: 1250,
    avatar: 'https://lh3.googleusercontent.com/-o5CbReVbK0o/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclyO2oG33QIPjqJimd3Rvd145GAMA/c/photo.jpg?height=180&width=180'
  });

  // Form input state cho việc chỉnh sửa thông tin
  const [editName, setEditName] = useState(user.name);



  // --- Xử lý sự kiện ---
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, name: editName });
    setShowEdit(false);
  };



  const openEditModal = () => {
    setEditName(user.name); // Reset input value về tên hiện tại trước khi mở
    setShowEdit(true);
  };

  // Định nghĩa danh sách menu để code gọn hơn
  const menuItems = [
    {
      name: 'Thông tin cá nhân',
      path: '/pages/trangcanhan/info',
    },
    {
      name: 'Lịch sử đặt phòng',
      path: '/pages/trangcanhan/booking-history',
    },
    {
      name: 'Lịch sử thuê phòng',
      path: '/pages/trangcanhan',
      end: true, // Chỉ active khi khớp chính xác đường dẫn này
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">

      {/* HEADER */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-[100] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <Logo></Logo>

          <nav className="flex items-center gap-6 ml-8">
            <a href="/index.html" className="text-sm font-bold text-white hover:text-[#a78bfa] transition-colors uppercase tracking-widest">
              Trang chủ
            </a>
            <a href="/phonghientai.html" className="text-sm font-bold text-white hover:text-[#a78bfa] transition-colors uppercase tracking-widest">
              Phòng hiện tại
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Khách hàng</p>
                <p className="text-xs font-bold text-white">{user.name}</p>
              </div>
              <div className="w-10 h-10 rounded-lg border border-white/10 p-0.5 bg-white/5">
                <img src={user.avatar} className="w-full h-full rounded-md object-cover" alt="User UserAvatar" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-4">

        {/* ASIDE - SIDEBAR */}
        <aside className="w-full md:w-72 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img src={user.avatar} className="w-20 h-20 rounded-full border border-white/10 p-1" alt="Profile" />
                <div className="absolute -bottom-1 -right-1 bg-purple-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter shadow-lg">
                  Khách
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-white">{user.name}</h2>
                <button onClick={openEditModal} className="p-1 rounded hover:bg-[#8b5cf6]/20 transition" title="Sửa thông tin">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#a78bfa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3zm0 0v3a1 1 0 001 1h3" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400 text-xs font-medium">{user.phone}</p>
            </div>

            <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/5 text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Điểm tích lũy</p>
              <p className="text-2xl font-black text-white">{user.points.toLocaleString()} điểm</p>
            </div>
          </div>

          {/* NAVIGATION TABS */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${isActive
                      ? 'bg-[#7c3aed] border-[#8b5cf6]/30 text-white shadow-lg shadow-purple-900/40'
                      : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}

            {/* Nút Đăng xuất - Thường không cần trạng thái Active */}
            <div className="mt-4 pt-6 border-t border-white/5">
              <a
                href="/dangnhap.html"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-wider"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </a>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow">
          <Outlet></Outlet>
        </main>

        {/* --- MODAL: SỬA THÔNG TIN CÁ NHÂN --- */}
        {showEdit && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" onClick={() => setShowEdit(false)}></div>

            <form onSubmit={handleEditSubmit} className="[animation:modalScale_0.3s_ease-out_forwards] [box-shadow:0_0_25px_rgba(139,92,246,0.2),_inset_0_0_1px_rgba(255,255,255,0.2)] w-full max-w-sm rounded-[2rem] overflow-hidden relative z-10 border border-white/20 bg-[#161b33]/90 shadow-2xl">
              <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#8b5cf6]/20 to-transparent">
                <div>
                  <h4 className="font-extrabold text-white text-lg tracking-tight uppercase">Sửa thông tin</h4>
                  <p className="text-[10px] text-[#a78bfa] font-bold tracking-[0.2em]">CẬP NHẬT TÀI KHOẢN</p>
                </div>
                <button type="button" onClick={() => setShowEdit(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-rose-500/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div className="space-y-2 group">
                  <label className="text-[11px] font-black text-[#a78bfa] uppercase ml-1 tracking-wider">Họ và Tên</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all duration-300 placeholder-gray-500"
                      placeholder="Nhập tên của bạn..."
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#a78bfa] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 opacity-60">
                  <label className="text-[11px] font-black text-gray-400 uppercase ml-1 tracking-wider">Số điện thoại (Cố định)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user.phone}
                      className="w-full rounded-2xl px-4 py-3 bg-black/20 border border-white/5 text-gray-400 cursor-not-allowed"
                      disabled
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-2 flex gap-3">
                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300">
                  Hủy
                </button>
                <button type="submit" className="flex-[2] py-3 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-95">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}