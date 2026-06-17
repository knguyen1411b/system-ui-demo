import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import QR_DAT_PHONG from '@/assets/imgs/QRDatPhong.png';
import Logo from '@/components/Logo';

export default function BookingSystem() {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1);
  const [searched, setSearched] = useState(false);
  const [availableRoom, setAvailableRoom] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [filter, setFilter] = useState({
    size: 'Small',
    date: new Date().toISOString().split('T')[0],
    timeStart: '19:00',
    timeEnd: '21:00'
  });

  const [customer, setCustomer] = useState({
    name: '',
    phone: ''
  });

  const captureAreaRef = useRef(null);

  // --- DATA MOCK ---
  const rooms = [
    { size: "Small", gia: { n: "50" } },
    { size: "Medium", gia: { n: "70" } },
    { size: "Large", gia: { n: "90" } }
  ];

  // --- EFFECT FOR BACKGROUND STYLE ---
  useEffect(() => {
    // Áp dụng style nền đặc trưng của trang từ file HTML cũ
    document.body.style.background = 'radial-gradient(circle at top right, #1e1b4b, #0f172a)';
    document.body.className = 'text-slate-200 min-h-screen p-4 md:p-8';

    return () => {
      document.body.style.background = '';
    };
  }, []);

  // --- LOGIC FUNCTIONS ---
  const searchRooms = () => {
    const found = rooms.find(r => r.size === filter.size);
    setAvailableRoom(found || null);
    setSearched(true);
  };

  const getRoomImage = (size) => {
    const imgs = {
      'Small': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
      'Medium': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
      'Large': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400'
    };
    return imgs[size] || '';
  };

  const getMaxPeople = (size) => {
    const p = { 'Small': '3 người', 'Medium': '7 người', 'Large': '20+ người' };
    return p[size] || '';
  };

  const confirmBooking = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const processPayment = () => {
    if (!customer.name || !customer.phone) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    setBookingDate(formattedDate);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const downloadTicket = () => {
    if (captureAreaRef.current) {
      html2canvas(captureAreaRef.current, {
        backgroundColor: '#1e1b4b',
        scale: 2,
        borderRadius: 40
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `MusicBox-Ticket-${customer.phone}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  // --- CSS GLASSMORPHISM STYLE ---
  const glassCardStyle = {
    background: 'rgba(30, 27, 75, 0.6)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(196, 181, 253, 0.1)'
  };

  return (
    <>
      {/* Top Navigation */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <a href="../index.html" className="flex items-center gap-2 text-purple-300 hover:text-white transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span className="font-medium text-sm">Quay về trang chủ</span>
        </a>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Hệ thống bảo mật</span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto">
        {/* STEP 1: Tìm kiếm phòng */}
        {step === 1 && (
          <section className="rounded-3xl p-6 mb-8" style={glassCardStyle}>
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-purple-500">Tìm phòng trống</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-purple-300 mb-2">Loại phòng</label>
                <select
                  value={filter.size}
                  onChange={(e) => setFilter({ ...filter, size: e.target.value })}
                  className="w-full bg-indigo-950 border border-purple-300/20 rounded-xl px-4 py-3 focus:border-purple-500 outline-none text-white"
                >
                  <option value="Small">Small (2-3 người)</option>
                  <option value="Medium">Medium (4-7 người)</option>
                  <option value="Large">Large (10+ người)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-purple-300 mb-2">Ngày đặt</label>
                <input
                  type="date"
                  value={filter.date}
                  onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                  className="w-full bg-indigo-950 border border-purple-300/20 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-purple-300 mb-2">Giờ vào</label>
                  <input
                    type="time"
                    value={filter.timeStart}
                    onChange={(e) => setFilter({ ...filter, timeStart: e.target.value })}
                    className="w-full bg-indigo-950 border border-purple-300/20 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-purple-300 mb-2">Giờ ra</label>
                  <input
                    type="time"
                    value={filter.timeEnd}
                    onChange={(e) => setFilter({ ...filter, timeEnd: e.target.value })}
                    className="w-full bg-indigo-950 border border-purple-300/20 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={searchRooms}
                  className="w-full bg-purple-500 hover:bg-purple-700 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/30 text-white"
                >
                  KIỂM TRA TÌNH TRẠNG
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Kết quả tìm kiếm phòng ở Step 1 */}
        {step === 1 && searched && (
          <section className="max-w-md mx-auto">
            {availableRoom ? (
              <div className="rounded-[2rem] overflow-hidden flex flex-col group border border-purple-500/30 transition-all duration-500" style={glassCardStyle}>
                <div className="relative h-48 overflow-hidden">
                  <img src={getRoomImage(filter.size)} className="w-full h-full object-cover" alt="Room type" />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-300/30 bg-purple-500/20 text-purple-300">
                      Phòng còn trống
                    </span>
                    <h3 className="text-2xl font-black mt-3 tracking-tighter uppercase text-white">
                      LOẠI PHÒNG {filter.size}
                    </h3>
                    <p className="text-[10px] text-purple-300 italic mt-1">* Số phòng cụ thể sẽ được cung cấp khi bạn đến quầy</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[8px] text-purple-300 uppercase font-bold">Giá cọc</p>
                      <p className="text-lg font-black text-purple-500">{availableRoom.gia.n}K/h</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <p className="text-[8px] text-purple-300 uppercase font-bold">Số người tối đa</p>
                      <p className="text-lg font-black text-purple-500">{getMaxPeople(filter.size)}</p>
                    </div>
                  </div>

                  <button
                    onClick={confirmBooking}
                    className="w-full py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] bg-purple-500 text-white hover:bg-purple-700 transition-all uppercase shadow-lg shadow-purple-500/20"
                  >
                    TIẾP TỤC ĐẶT PHÒNG
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 rounded-3xl" style={glassCardStyle}>
                <p className="text-purple-300 font-bold">Rất tiếc, loại phòng này hiện đã hết vào khung giờ bạn chọn.</p>
              </div>
            )}
          </section>
        )}

        {/* STEP 2: Xác nhận đặt phòng & Thông tin khách hàng */}
        {step === 2 && (
          <section className="max-w-md mx-auto">
            <div className="rounded-3xl p-8 border border-purple-500/20" style={glassCardStyle}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/40 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Xác nhận đặt phòng</h2>
                  <p className="text-xs text-purple-300">Bảo mật thông tin khách hàng</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-purple-300 mb-2">Họ và tên khách hàng</label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn Anh"
                    className="w-full bg-indigo-950 border border-purple-300/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-purple-300 mb-2">Số điện thoại nhận mã</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="0905 xxx xxx"
                    className="w-full bg-indigo-950 border border-purple-300/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                  />
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 mb-8">
                <div className="flex justify-between text-sm mb-2 text-purple-300">
                  <span>Phí giữ phòng (Tạm tính):</span>
                  <span className="font-bold text-white">50.000đ</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-white">Cần thanh toán:</span>
                  <span className="font-black text-purple-500">50.000đ</span>
                </div>
              </div>

              <button
                onClick={processPayment}
                disabled={isProcessing}
                className="w-full py-4 bg-purple-500 hover:bg-purple-700 text-white rounded-2xl font-black shadow-xl shadow-purple-500/30 transition-all mb-4 flex items-center justify-center gap-3"
              >
                {isProcessing ? "ĐANG KẾT NỐI VNPAY..." : "THANH TOÁN QUA VNPAY"}
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full text-xs text-purple-300 font-bold uppercase tracking-widest hover:text-white transition"
              >
                Thay đổi lựa chọn
              </button>
            </div>
          </section>
        )}

        {/* STEP 3: Đặt phòng thành công */}
        {step === 3 && (
          <section className="max-w-md mx-auto text-center py-12">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)] text-white">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <h2 className="text-3xl font-black mb-2 text-purple-500 uppercase">Đặt phòng thành công!</h2>
            <p className="text-purple-300 text-xs mb-6">Mã đã được gửi đến số: {customer.phone}</p>

            {/* Capture Area */}
            <div
              id="capture-area"
              ref={captureAreaRef}
              className="rounded-[2.5rem] p-8 mb-8 border border-purple-500/30 relative overflow-hidden text-left shadow-2xl"
              style={{
                ...glassCardStyle,
                background: "linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
              }}
            >
              {/* Các đốm sáng trang trí */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px]"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Phần Đầu: Mã số & Logo */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[#a78bfa] uppercase text-[10px] font-black tracking-[0.3em] mb-1">
                      E-Voucher Booking
                    </p>
                    <p className="text-4xl font-black text-white tracking-tighter">
                      MB-<span className="text-[#a78bfa]">8899</span>
                    </p>
                  </div>
                </div>

                {/* Phần Giữa: Thông tin khách hàng */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                      <p className="text-purple-400/60 uppercase text-[9px] font-black tracking-widest mb-1">Khách hàng</p>
                      <p className="text-white font-black text-lg">{customer.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400/60 uppercase text-[9px] font-black tracking-widest mb-1">Loại phòng</p>
                      <p className="text-[#a78bfa] font-black text-lg uppercase">{filter.size}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-purple-400/60 uppercase text-[9px] font-black tracking-widest mb-1">Ngày sử dụng</p>
                      <p className="text-white font-bold text-sm">{filter.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400/60 uppercase text-[9px] font-black tracking-widest mb-1">Thời lượng</p>
                      <p className="text-white font-bold text-sm">{filter.timeStart} — {filter.timeEnd}</p>
                    </div>
                  </div>
                </div>

                {/* Đường kẻ đứt đoạn (Perforated Line effect) */}
                <div className="relative h-px border-t border-dashed border-purple-500/30 my-2 flex justify-between">
                  <div className="absolute -left-10 -top-2 w-4 h-4 bg-[#0f172a] rounded-full"></div>
                  <div className="absolute -right-10 -top-2 w-4 h-4 bg-[#0f172a] rounded-full"></div>
                </div>

                {/* Phần Dưới: QR Code CHÍNH */}
                <div className="pt-8 flex flex-col items-center">
                  <div className="relative group">
                    {/* Glow hiệu ứng cho QR */}
                    <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/40 transition-all"></div>

                    <div className="relative bg-white p-3 rounded-[1.5rem] shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                      <img
                        src={QR_DAT_PHONG}
                        alt="QR Booking"
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-[10px] text-purple-300/60 font-bold uppercase tracking-[0.2em]">
                    Quét mã để check-in tại quầy
                  </p>
                </div>

                {/* Chân vé */}
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center opacity-40">
                  <span className="text-[10px] text-purple-300 uppercase tracking-widest">MusicBox System Booking</span>
                  <span className="text-[12px] text-white font-mono">{bookingDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={downloadTicket}
                className="flex items-center justify-center gap-2 px-4 py-4 bg-white text-indigo-950 rounded-2xl font-black text-[11px] uppercase hover:bg-purple-300 transition shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Lưu ảnh mã
              </button>

              <a
                href="../index.html"
                className="flex items-center justify-center px-4 py-4 bg-purple-700 text-white rounded-2xl font-black text-[11px] uppercase hover:bg-purple-500 transition shadow-lg"
              >
                Về trang chủ
              </a>
            </div>

            <p className="text-purple-300 text-[10px] italic">
              *Vui lòng đưa ảnh đã lưu hoặc tin nhắn SMS cho nhân viên tại quầy.
            </p>
          </section>
        )}
      </main>
    </>
  );
}