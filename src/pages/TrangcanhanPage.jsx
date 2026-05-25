import { useState } from 'react';

export default function TrangCaNhanPage() {
  // --- Quản lý Trạng thái (React States) ---
  const [userRole, setUserRole] = useState('Khách');
  const [tab, setTab] = useState('history');
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [visibleItems, setVisibleItems] = useState(3);
  
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    phone: '0901 234 567',
    points: 1250,
    avatar: 'https://lh3.googleusercontent.com/-o5CbReVbK0o/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclyO2oG33QIPjqJimd3Rvd145GAMA/c/photo.jpg?height=180&width=180'
  });

  // Form input state cho việc chỉnh sửa thông tin
  const [editName, setEditName] = useState(user.name);

  const [history, setHistory] = useState([
    { 
      id: 'BK-77', room: '208', type: 'Thường', 
      date: '08/04/2026', in: '18:00', out: '20:00', duration: 2,
      roomPrice: '250.000', serviceTotal: '100.000', total: '350.000',
      roomImg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
      services: [
        { name: 'Nước ngọt Pepsi', qty: 2, price: '20.000', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100' }
      ] 
    },
    { 
      id: 'BK-66', room: '305', type: 'VIP', 
      date: '05/04/2026', in: '21:00', out: '23:00', duration: 2,
      roomPrice: '900.000', serviceTotal: '300.000', total: '1.200.000',
      roomImg: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
      services: [
        { name: 'Bia Tiger', qty: 6, price: '30.000', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100' }
      ] 
    },
    { 
      id: 'BK-55', room: '405', type: 'VIP', 
      date: '01/04/2026', in: '19:30', out: '22:00', duration: 2.5,
      roomPrice: '1.000.000', serviceTotal: '500.000', total: '1.500.000',
      roomImg: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
      services: [
        { name: 'Trái cây dĩa (Nhỏ)', qty: 1, price: '120.000', img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=100' }
      ] 
    },
    { 
      id: 'BK-44', room: '101', type: 'Thường', 
      date: '28/03/2026', in: '17:00', out: '19:00', duration: 2,
      roomPrice: '200.000', serviceTotal: '80.000', total: '280.000',
      roomImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
      services: [
        { name: 'Nước suối Aquafina', qty: 2, price: '15.000', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=100' }
      ] 
    }
  ]);

  // --- Xử lý sự kiện ---
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, name: editName });
    setShowEdit(false);
  };

  const handleViewMore = () => {
    setVisibleItems(prev => prev + 3);
  };

  const openEditModal = () => {
    setEditName(user.name); // Reset input value về tên hiện tại trước khi mở
    setShowEdit(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-['Plus_Jakarta_Sans',_sans-serif]">
      
      {/* HEADER */}
      <header className="bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-[100] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/index.html" class="flex items-center gap-3 group">
            <div className="p-2 bg-[#7c3aed] rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:bg-[#8b5cf6] transition">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tighter uppercase leading-none">
              Music<span className="text-[#a78bfa]">Box</span>
            </span>
          </a>

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
                  {userRole}
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
          <nav className="space-y-1">
            <button 
              onClick={() => setTab('info')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${tab === 'info' ? 'bg-purple-600 shadow-lg shadow-purple-900/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              Thông tin cá nhân
            </button>
            <button 
              onClick={() => setTab('history')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${tab === 'history' ? 'bg-purple-600 shadow-lg shadow-purple-900/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              Lịch sử thuê phòng
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-tight mt-4 border-t border-white/5 pt-6">
              <a href="/dangnhap.html">Đăng xuất</a>
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow">
          {tab === 'history' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6 px-1">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Giao dịch gần đây</h3>
                <span className="text-[10px] bg-white/5 px-3 py-1.5 rounded-full text-gray-400 font-bold">
                  {history.length} PHÒNG ĐÃ THUÊ
                </span>
              </div>

              {/* LIST BOOKING HISTORY */}
              <div className="space-y-2">
                {history.slice(0, visibleItems).map((item) => (
                  <div key={item.id} className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden hover:border-[#a78bfa] transition-all group flex items-center gap-3 p-3">
                    <img src={item.roomImg} className="w-16 h-16 rounded-lg object-cover border border-white/10" alt="Room" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-white text-base truncate">Phòng {item.room}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-purple-500/10 text-purple-500">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-400">
                        <span>{item.date}</span>
                        <span>|</span>
                        <span>{item.in} - {item.out}</span>
                        <span>|</span>
                        <span>{item.duration.toFixed(1)} Giờ</span>
                      </div>
                    </div>
                    <div className="text-right min-w-[90px]">
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Tổng</p>
                      <p className="text-base font-black text-emerald-400 mb-1">{item.total}đ</p>
                      <button 
                        onClick={() => { setSelectedBooking(item); setShowDetail(true); }}
                        className="text-[10px] font-bold text-[#8b5cf6] bg-white/5 hover:bg-[#8b5cf6]/10 px-3 py-1 rounded transition-all uppercase"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* VIEW MORE BUTTON */}
              {visibleItems < history.length && (
                <div className="mt-16 flex justify-center">
                  <button onClick={handleViewMore} className="group flex flex-col items-center gap-2 text-[#a78bfa] hover:text-white transition-all">
                    <span className="font-bold tracking-widest uppercase text-xs">Xem thêm giao dịch</span>
                    <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}

          {tab === 'info' && (
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
              <h3 className="text-base font-bold uppercase tracking-wider text-gray-400 mb-4">Thông tin cá nhân chi tiết</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Họ và tên</p>
                  <p className="text-lg font-medium text-white">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Số điện thoại</p>
                  <p className="text-lg font-medium text-white">{user.phone}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

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

      {/* --- MODAL: CHI TIẾT HÓA ĐƠN --- */}
      {showDetail && selectedBooking && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDetail(false)}></div>
          <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative z-10">
            
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-950/30">
              <div>
                <h4 className="font-bold text-white text-lg">Hóa đơn điện tử</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  MÃ: {selectedBooking.id} | NGÀY: {selectedBooking.date}
                </p>
              </div>
              <button onClick={() => setShowDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors">✕</button>
            </div>

            <div className="p-4 overflow-y-auto [scrollbar-width:none] [-webkit-scrollbar:none] max-h-[60vh]">
              {/* Chi phí phòng */}
              <div className="mb-6">
                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Chi phí thuê phòng</h5>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 group">
                  <img src={selectedBooking.roomImg} className="w-12 h-12 rounded-lg object-cover border border-white/10" alt="Room Detail" />
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-white text-sm truncate">
                      Phòng {selectedBooking.room} ({selectedBooking.type})
                    </p>
                    <p className="text-xs text-gray-400 font-semibold">
                      {selectedBooking.in} - {selectedBooking.out} | {selectedBooking.duration.toFixed(1)} Giờ
                    </p>
                  </div>
                  <p className="font-extrabold text-white text-base">{selectedBooking.roomPrice}đ</p>
                </div>
              </div>

              {/* Dịch vụ ăn uống */}
              <div>
                <div className="flex justify-between items-center mt-3 mb-3 px-1">
                  <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dịch vụ ăn uống</h5>
                  <p className="text-xs font-bold text-gray-300">{selectedBooking.serviceTotal}đ</p>
                </div>
                
                <div className="space-y-1.5">
                  {selectedBooking.services.map((s, index) => {
                    const cleanPrice = parseInt(s.price.replace(/\./g, '')) || 0;
                    const itemTotal = s.qty * cleanPrice;
                    return (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors">
                        <img src={s.img} className="w-8 h-8 rounded object-cover bg-slate-800 border border-white/10" alt={s.name} />
                        <div className="flex-grow min-w-0">
                          <p className="font-bold text-xs text-white truncate mb-0.5">{s.name}</p>
                          <p className="text-[10px] text-gray-500 font-bold">{s.qty} x {s.price}đ</p>
                        </div>
                        <p className="font-bold text-xs text-purple-400">
                          {itemTotal.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tổng cộng & Footer Modal */}
            <div className="p-4 bg-slate-800/50 border-t border-white/5">
              <div className="flex justify-between items-center mb-4 border border-emerald-500/20 bg-emerald-500/5 p-3 rounded-xl">
                <div className="text-left">
                  <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mb-1">Tổng cộng</p>
                  <p className="text-xl font-black text-emerald-500">{selectedBooking.total}đ</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Trạng thái</p>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                    Đã hoàn tất
                  </span>
                </div>
              </div>
              <button onClick={() => setShowDetail(false)} className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow">
                Đóng hóa đơn
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}