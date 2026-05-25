import Logo from '@/components/Logo';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  // Mock data danh sách dịch vụ ẩm thực
  const initialServices = [
    { id: 1, type: 'drink', name: 'Bia Heineken (Lon)', price: 35000, unit: 'Lon', img: 'https://product.hstatic.net/1000281508/product/6-lon-bia-heineken-330ml-201904241647511710_50bd7b00db4b40a9958a32df2e8cec08_master.jpg' },
    { id: 2, type: 'drink', name: 'Bia Tiger Crystal', price: 32000, unit: 'Lon', img: 'https://images.unsplash.com/photo-1597290282695-edc43d0e7129?w=400' },
    { id: 3, type: 'drink', name: 'Nước suối Aquafina', price: 15000, unit: 'Chai', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
    { id: 4, type: 'drink', name: 'Coca Cola', price: 20000, unit: 'Lon', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400' },
    { id: 5, type: 'food', name: 'Trái cây dĩa (Lớn)', price: 250000, unit: 'Dĩa', img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400' },
    { id: 6, type: 'food', name: 'Snack khoai tây', price: 45000, unit: 'Gói', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
    { id: 7, type: 'food', name: 'Mực nướng ngũ vị', price: 185000, unit: 'Phần', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
    { id: 8, type: 'food', name: 'Cơm chiên hải sản', price: 120000, unit: 'Phần', img: 'https://cdn.tgdd.vn/2021/01/CookProduct/comchienhaisan-1200x676.jpg' },
    { id: 9, type: 'food', name: 'Gà rán KFC (Phần)', price: 95000, unit: 'Phần', img: 'https://content.jdmagicbox.com/v2/comp/mumbai/m1/022pxx22.xx22.200829100417.u5m1/catalogue/kfc-mumbai-fast-food-1gtb5g7j7r.jpg' },
    { id: 10, type: 'drink', name: 'Rượu vang đỏ', price: 850000, unit: 'Chai', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400' },
    { id: 11, type: 'food', name: 'Đậu phộng rang muối', price: 25000, unit: 'Bịch', img: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_5_13_638511979750318955_lac-rang-muoi-duong-1.jpg' },
    { id: 12, type: 'drink', name: 'Soda chanh', price: 30000, unit: 'Ly', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400' }
  ];

  // State quản lý bộ lọc và số lượng hiển thị
  const [filter, setFilter] = useState('all');
  const [limit, setLimit] = useState(8);

  // Xử lý lọc danh sách dựa trên State
  const filteredServices = useMemo(() => {
    const list = filter === 'all' ? initialServices : initialServices.filter(s => s.type === filter);
    return list.slice(0, limit);
  }, [filter, limit]);

  // Kiểm tra xem còn phần tử để "Xem thêm" hay không
  const hasMore = useMemo(() => {
    const total = filter === 'all' ? initialServices.length : initialServices.filter(s => s.type === filter).length;
    return limit < total;
  }, [filter, limit]);

  // Hàm thay đổi filter (reset luôn limit về 8)
  const handleFilterChange = (type) => {
    setFilter(type);
    setLimit(8);
  };

  // Hàm định dạng giá tiền VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="bg-[#0f172a] bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] min-h-screen text-slate-200 overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">

      {/* HEADER */}
      <header className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Logo></Logo>

          {/* NAVIGATION LINKS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to={"pages/gioithieuhethong"}
             className="text-gray-300 hover:text-white transition"
            >
              Giới thiệu hệ thống
            </Link>
            <a href="#bang-gia" className="text-gray-300 hover:text-white transition">Bảng giá</a>
            <a href="#quy-dinh" className="text-gray-300 hover:text-white transition">Nội quy</a>
            <a href="#vi-tri" className="text-gray-300 hover:text-white transition">Vị trí</a>
            <a href="#dich-vu" className="text-gray-300 hover:text-white transition">Dịch vụ ăn uống</a>
          </div>

          {/* RIGHT SIDE BUTTONS (Cả Desktop và Mobile) */}
          <div className="flex items-center gap-3">
            {/* Nút Đặt phòng ngay (Ẩn bớt padding trên mobile để tránh tràn) */}
            <Link
              to="/pages/datphong"
              className="bg-[#7c3aed] hover:bg-[#8b5cf6] px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/30 text-white whitespace-nowrap"
            >
              Đặt phòng ngay
            </Link>

            {/* HAMBURGER BUTTON (Chỉ hiện trên Mobile < md) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none md:hidden transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                // Icon Đóng (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Icon Menu (3 gạch)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU DROPDOWN (Chỉ xuất hiện khi isOpen = true) */}
        <div
          className={`md:hidden border-t border-white/5 bg-[#0f172a] transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
        >
          <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            <Link to={"pages/gioithieuhethong"}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white py-1 transition"
            >
              Giới thiệu hệ thống
            </Link>
            <a
              href="#bang-gia"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white py-1 transition"
            >
              Bảng giá
            </a>
            <a
              href="#quy-dinh"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white py-1 transition"
            >
              Nội quy
            </a>
            <a
              href="#vi-tri"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white py-1 transition"
            >
              Vị trí
            </a>
            <a
              href="#dich-vu"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white py-1 transition"
            >
              Dịch vụ ăn uống
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#7c3aed]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-xs font-bold uppercase tracking-widest">
            KIẾN TẠO TRẢI NGHIỆM GIẢI TRÍ MỚI
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-white uppercase">
            ÁNH SÁNG CỰC CHILL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-indigo-400">
              ÂM THANH CỰC CHÁY
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Hệ thống Karaoke giải trí hiện đại nhất tại Huế. Không gian sang trọng, cách âm chuẩn studio và hệ thống đặt phòng trực tuyến 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to={"pages/datphong"} className="px-10 py-5 bg-[#7c3aed] text-white rounded-2xl font-extrabold text-lg hover:scale-105 transition-all shadow-2xl shadow-mb-purple-600/50">
              Đặt phòng ngay
            </Link>
            <a href="#bang-gia" className="px-10 py-5 bg-white/5 backdrop-blur rounded-2xl font-extrabold text-lg border border-white/10 hover:bg-white/10 text-white transition-all">
              Xem bảng giá
            </a>
          </div>
        </div>
      </section>

      {/* BẢNG GIÁ */}
      <section id="bang-gia" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              BẢNG GIÁ <span className="text-[#a78bfa]" style={{ textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' }}>DỊCH VỤ</span>
            </h2>
            <p className="text-gray-500 mt-2 italic">Áp dụng tại: 122 Trường Chinh, TP. Huế</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-[#a78bfa] uppercase text-sm tracking-widest">
                  <th className="px-8 py-4">Khung Giờ</th>
                  <th className="px-8 py-4">Small Box (2-3 NG)</th>
                  <th className="px-8 py-4">Medium Box (4-7 NG)</th>
                  <th className="px-8 py-4">Large Box (10 NG)</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6 rounded-l-3xl border-l border-white/10 font-bold">08:00 - 14:00</td>
                  <td className="px-8 py-6 text-xl">49.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                  <td className="px-8 py-6 text-xl text-[#a78bfa]" style={{ textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' }}>69.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                  <td className="px-8 py-6 rounded-r-3xl border-r border-white/10 text-xl font-bold">89.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                </tr>
                <tr className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6 rounded-l-3xl border-l border-white/10 font-bold">14:00 - 17:00</td>
                  <td className="px-8 py-6 text-xl font-bold">69.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                  <td className="px-8 py-6 text-xl font-bold">89.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                  <td className="px-8 py-6 rounded-r-3xl border-r border-white/10 text-xl font-bold">110.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                </tr>
                <tr className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6 rounded-l-3xl border-l border-white/10 font-bold bg-[#7c3aed]/10">17:00 - 24:00</td>
                  <td className="px-8 py-6 text-xl font-bold">89.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                  <td className="px-8 py-6 text-xl font-bold">115.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                  <td className="px-8 py-6 rounded-r-3xl border-r border-white/10 text-xl font-bold text-[#a78bfa]">130.000đ<span className="text-xs text-gray-500 block">/giờ</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NỘI QUY */}
      <section id="quy-dinh" className="py-24 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-black text-white leading-tight uppercase">
                QUY ĐỊNH & <br />
                <span className="text-[#a78bfa]" style={{ textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' }}>NỘI QUY</span>
              </h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Để đảm bảo trải nghiệm tốt nhất cho mọi khách hàng, vui lòng tuân thủ các quy định chung của <span className="font-bold text-white">MUSICBOX</span>.
              </p>
              <div className="mt-8 p-6 rounded-2xl border border-dashed border-[#8b5cf6]/30 bg-[#8b5cf6]/5">
                <span className="text-xs text-[#a78bfa] font-bold uppercase block mb-2 text-center underline">Hotline hỗ trợ 24/7</span>
                <p className="text-2xl font-black text-white text-center tracking-widest">034 3132 123</p>
              </div>
            </div>

            <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] p-6 rounded-2xl flex gap-4">
                <span className="text-2xl font-black text-[#7c3aed]">#1</span>
                <p className="text-sm text-gray-300">Không hút thuốc và sử dụng chất kích thích (ma túy, shisha, bia...).</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] p-6 rounded-2xl flex gap-4">
                <span className="text-2xl font-black text-[#7c3aed]">#2</span>
                <p className="text-sm text-gray-300">Không mang thức ăn và đồ uống bên ngoài vào MUSICBOX.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] p-6 rounded-2xl flex gap-4 border-l-2 border-l-[#8b5cf6]">
                <span className="text-2xl font-black text-[#7c3aed]">#3</span>
                <p className="text-sm text-gray-300">Tự bảo quản tư trang cá nhân trong quá trình sử dụng phòng.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] p-6 rounded-2xl flex gap-4">
                <span className="text-2xl font-black text-[#7c3aed]">#4</span>
                <p className="text-sm text-gray-300">Liên hệ nhân viên nếu không hài lòng về âm thanh hoặc microphone.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] p-6 rounded-2xl flex gap-4">
                <span className="text-2xl font-black text-[#7c3aed]">#5</span>
                <p className="text-sm text-gray-300">Vui lòng bảo quản và nâng niu tài sản (mic, màn hình, sofa...).</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] p-6 rounded-2xl flex gap-4">
                <span className="text-2xl font-black text-[#7c3aed]">#6</span>
                <p className="text-sm text-gray-300">Hãy cùng nhau giữ gìn vệ sinh chung và sử dụng đúng mục đích.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VỊ TRÍ BẢN ĐỒ */}
      <section id="vi-tri" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-white/[0.02] border border-[#8b5cf6]/20 backdrop-blur-[5px] w-full max-w-5xl mx-auto p-6 md:p-10 rounded-[2.5rem] shadow-2xl">
            <div className="mb-8">
              <div className="w-16 h-16 bg-[#7c3aed]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#8b5cf6]/20">
                <svg className="w-8 h-8 text-[#a78bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                Ghé thăm <span className="text-[#a78bfa]" style={{ textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' }}>chúng tôi</span>
              </h3>
              <p className="text-gray-400 font-medium">122 Trường Chinh, Phường An Cựu, TP. Huế</p>
            </div>

            <div className="relative w-full h-[450px] bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-inner group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.446824982635!2d107.5937996!3d16.4528775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a13fa3df6a1b%3A0x6e9f2ff2b01da42a!2zMTIyIFRyxrDhu51uZyBDaGluaCwgQW4gQ-G7sXUsIFRowbmggcGjhu5EgSHXhur8!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                className="absolute inset-0 w-full h-full border-0 transition-all duration-700 contrast-[1.1] brightness-[0.9] grayscale-[0.2] group-hover:grayscale-0 group-hover:brightness-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MusicBox Location"
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent rounded-3xl group-hover:border-[#8b5cf6]/10 transition-all duration-500"></div>
            </div>

            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white/5 hover:bg-[#7c3aed]/20 text-gray-300 hover:text-white rounded-xl border border-white/10 transition-all font-bold text-sm uppercase tracking-widest">
              <span>Xem bản đồ lớn hơn</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* MENU ẨM THỰC */}
      <section id="dich-vu" className="py-24 relative overflow-hidden bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              MENU <span className="text-[#a78bfa]" style={{ textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' }}>ẨM THỰC</span>
            </h2>

            {/* Các nút bấm lọc chuyển sang React State */}
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-6 py-2 rounded-xl font-bold transition-all border border-white/10 text-sm ${filter === 'all' ? 'bg-[#7c3aed] shadow-[0_0_15px_rgba(139,92,246,0.4)] text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Tất cả
              </button>
              <button
                onClick={() => handleFilterChange('food')}
                className={`px-6 py-2 rounded-xl font-bold transition-all border border-white/10 text-sm ${filter === 'food' ? 'bg-[#7c3aed] shadow-[0_0_15px_rgba(139,92,246,0.4)] text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Món ăn
              </button>
              <button
                onClick={() => handleFilterChange('drink')}
                className={`px-6 py-2 rounded-xl font-bold transition-all border border-white/10 text-sm ${filter === 'drink' ? 'bg-[#7c3aed] shadow-[0_0_15px_rgba(139,92,246,0.4)] text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Đồ uống
              </button>
            </div>
          </div>

          {/* Grid hiển thị danh sách sản phẩm */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredServices.map((item) => (
              <div
                key={item.id}
                className="bg-white/[0.02] border border-white/5 backdrop-blur-[5px] rounded-[2rem] overflow-hidden hover:border-[#8b5cf6]/50 transition-all duration-300 group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#0f172a]/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-[#a78bfa] border border-white/10">
                    {item.unit}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold text-sm mb-1 truncate">{item.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[#a78bfa] font-black text-lg">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cụm điều khiển Xem thêm / Thu gọn bằng React State */}
          <div className="mt-16 text-center">
            {hasMore ? (
              <button
                onClick={() => setLimit(prev => prev + 4)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Xem thêm món khác
                <svg className="w-4 h-4 inline-block ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 14l-7 7-7-7m14-8l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              initialServices.filter(s => filter === 'all' ? true : s.type === filter).length > 8 && (
                <button
                  onClick={() => setLimit(8)}
                  className="px-8 py-4 bg-[#7c3aed]/10 text-[#a78bfa] rounded-2xl font-bold border border-[#8b5cf6]/20 transition-all hover:bg-[#7c3aed]/20"
                >
                  Thu gọn danh sách
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-gray-600 border-t border-white/5 bg-slate-950/50">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Music<span className="text-[#7c3aed]/70">Box</span> • Team AnD2
        </p>
        <p className="text-xs mt-2 italic text-gray-700 underline">Địa điểm: 122 Trường Chinh, An Cựu, Huế.</p>
      </footer>

    </div>
  );
}