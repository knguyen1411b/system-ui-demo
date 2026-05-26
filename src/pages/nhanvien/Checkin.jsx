import CurrentTimeBox from '@/components/CurrentTimeBox';
import { useState, useRef } from 'react';

export default function Checkin() {

  // Quản lý trạng thái phân hệ Check-in
  const [bookingCode, setBookingCode] = useState('');
  const [checkinAlert, setCheckinAlert] = useState({ show: false, type: '', message: '' });
  const [checkinStep, setCheckinStep] = useState('scanner'); // 'scanner' hoặc 'success'
  const [successData, setSuccessData] = useState({
    code: '',
    name: '',
    roomName: '', // Tên phòng riêng
    roomType: '', // Loại phòng riêng
    bookingAt: '', // Ngày đặt phòng (Ngày giờ)
    usageDate: '', // Ngày sử dụng
    checkInTime: '',
    checkOutTime: '',
    qr: ''
  });
  const [isCheckinFormDisabled, setIsCheckinFormDisabled] = useState(false);
  const [isRented, setIsRented] = useState(false); // Trạng thái đã bấm Thuê phòng chưa

  const bookingInputRef = useRef(null);

  // --- LOGIC XỬ LÝ CHECK-IN ĐẶT TRƯỚC ---

  const processCheckInVerification = () => {
    const code = bookingCode.trim();
    setCheckinAlert({ show: false, type: '', message: '' });

    if (code === "") {
      setCheckinAlert({
        show: true,
        type: 'warning',
        message: 'Vui lòng nhập hoặc quét mã đặt phòng để xử lý!'
      });
      return;
    }

    if (code.toLowerCase().includes('error')) {
      setCheckinAlert({
        show: true,
        type: 'danger',
        message: 'Lỗi hệ thống: Lỗi kết nối đến CSDL! Sử dụng ca làm việc bị gián đoạn.'
      });
      setIsCheckinFormDisabled(true);
      return;
    }

    if (code.toLowerCase().includes('expired') || code.length < 4) {
      setCheckinAlert({
        show: true,
        type: 'danger',
        message: 'Mã đặt phòng đã quá hạn hoặc không hợp lệ! Vui lòng thử lại.'
      });
      setBookingCode('');
      bookingInputRef.current?.focus();
      return;
    }

    // Giả lập dữ liệu check-in đúng các trường thông tin yêu cầu
    setSuccessData({
      code: code.toUpperCase(),
      name: "Trần Hải Long (Thành viên VIP)",
      roomName: "Phòng 402 (Tầng 4)",
      roomType: "VIP",
      bookingAt: "25/05/2026 - 14:25", // Khách đặt từ hôm qua
      usageDate: "26/05/2026",         // Ngày sử dụng là hôm nay
      checkInTime: "16:00 (16.0)",
      checkOutTime: "17:30 (17.5)",
      qr: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://musicbox.com/verify-entrance?code=${code}`
    });
    setIsRented(false);
    setCheckinStep('success');
  };

  const handleRentRoom = () => {
    setIsRented(true);
  };

  const resetCheckInForm = () => {
    setBookingCode('');
    setCheckinAlert({ show: false, type: '', message: '' });
    setIsCheckinFormDisabled(false);
    setTimeout(() => bookingInputRef.current?.focus(), 50);
  };

  const backToScannerState = () => {
    setCheckinStep('scanner');
    setIsRented(false);
    resetCheckInForm();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent uppercase">
          Check-in Đặt phòng
        </h1>
        <CurrentTimeBox></CurrentTimeBox>
      </header>

      <div className="main-content">
        {/* ================= PHÂN VÙNG CHECK-IN THUÊ PHÒNG ================= */}
        <div id="checkInBookingView" className="checkin-view bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto animate-fadeIn">
          <div className="header-top mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent">
              CHECK-IN THUÊ PHÒNG
            </h1>
          </div>

          {/* Thông báo Alert */}
          {checkinAlert.show && (
            <div className={`alert-box flex items-center gap-3 p-4 rounded-xl mb-6 text-sm border animate-pulse ${checkinAlert.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
              <i className={`fas ${checkinAlert.type === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'} text-base`}></i>
              <div dangerouslySetInnerHTML={{ __html: checkinAlert.message }}></div>
            </div>
          )}

          {/* Bước 1: Quét / Nhập mã */}
          {checkinStep === 'scanner' && (
            <div id="checkinFormBody" className="space-y-6" style={{ opacity: isCheckinFormDisabled ? 0.3 : 1 }}>
              <div className="checkin-scanner-box relative bg-black/30 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center justify-center overflow-hidden group">
                <div className="scanner-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent w-full top-0 animate-scanner"></div>
                <i className="fas fa-qrcode text-5xl text-[#c4b5fd] mb-3 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]"></i>
                <p className="text-sm font-semibold tracking-wide">HỆ THỐNG ĐANG QUÉT MÃ QR KHÁCH HÀNG...</p>
                <p className="text-xs text-slate-400 mt-1">(Đặt mã đặt chỗ của khách hàng trước mắt camera)</p>
              </div>

              <div className="checkin-input-wrapper flex flex-col space-y-2">
                <label className="text-xs text-slate-300 font-medium">Hoặc nhập mã đặt phòng thủ công:</label>
                <input
                  type="text"
                  id="bookingCodeInput"
                  ref={bookingInputRef}
                  disabled={isCheckinFormDisabled}
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  placeholder="Ví dụ: MB-2026-VIP79, MB-EXPIRED, MB-ERROR..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] placeholder-slate-600 transition-all disabled:cursor-not-allowed"
                />
              </div>

              <div className="checkin-actions flex justify-end gap-3 pt-2">
                <button
                  className="btn-secondary px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm"
                  disabled={isCheckinFormDisabled}
                  onClick={resetCheckInForm}
                >
                  HỦY BỎ
                </button>
                <button
                  className="btn-save px-6 py-2.5 rounded-xl bg-[#8b5cf6] hover:bg-[#6d28d9] text-white font-bold tracking-wide transition-all text-sm border border-[#8b5cf6] disabled:cursor-not-allowed"
                  disabled={isCheckinFormDisabled}
                  onClick={processCheckInVerification}
                >
                  XÁC NHẬN CHECK-IN
                </button>
              </div>
            </div>
          )}

          {/* Bước 2: Hiển thị kết quả & Xác nhận thuê phòng */}
          {checkinStep === 'success' && (
            <div id="checkinSuccessBody" className="success-result-box flex flex-col space-y-6 animate-fadeIn">
              <div id="successAlert" className={`alert-box border flex items-center gap-3 p-4 rounded-xl text-sm transition-all ${isRented ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'}`}>
                <i className={`fas ${isRented ? 'fa-check-circle text-emerald-400' : 'fa-info-circle text-indigo-400'} text-base`}></i>
                <span>{isRented ? 'Thuê phòng thành công! Phòng đã được kích hoạt sử dụng.' : 'Xác thực thành công! Vui lòng kiểm tra thông tin và ấn nút Thuê Phòng.'}</span>
              </div>

              {/* BẢNG KẾT QUẢ HIỂN THỊ CHI TIẾT ĐƠN */}
              <div className="info-card bg-black/20 border border-white/5 rounded-2xl p-4 space-y-3 text-sm">
                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Mã đặt phòng</span>
                  <span id="resBookingCode" className="font-mono font-bold text-[#c4b5fd]">{successData.code}</span>
                </div>
                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Tên khách hàng</span>
                  <span id="resCustomerName" className="font-medium text-white">{successData.name}</span>
                </div>

                {/* PHÂN TÁCH TÊN PHÒNG VÀ LOẠI PHÒNG */}
                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Tên phòng</span>
                  <span className="font-bold text-white">{successData.roomName}</span>
                </div>
                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Loại phòng</span>
                  <span className="font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">{successData.roomType}</span>
                </div>

                {/* NGÀY ĐẶT PHÒNG VÀ NGÀY SỬ DỤNG */}
                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Ngày đặt phòng (Ngày giờ)</span>
                  <span className="font-medium text-slate-300">{successData.bookingAt}</span>
                </div>
                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Ngày sử dụng</span>
                  <span className="font-medium text-[#c4b5fd] font-semibold">{successData.usageDate}</span>
                </div>

                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Giờ vào dự kiến</span>
                  <span className="font-medium text-emerald-400 font-semibold">{successData.checkInTime}</span>
                </div>
                <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-slate-400">Giờ ra dự kiến</span>
                  <span className="font-medium text-rose-400 font-semibold">{successData.checkOutTime}</span>
                </div>
                <div className="info-row flex justify-between pt-0.5">
                  <span className="text-slate-400">Trạng thái đơn</span>
                  <span>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-bold transition-all ${isRented ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                      {isRented ? 'Đang sử dụng' : 'Chờ kích hoạt'}
                    </span>
                  </span>
                </div>
              </div>

              {/* CHỈ XUẤT HIỆN QR SAU KHI BẤM NÚT THUÊ PHÒNG */}
              {isRented ? (
                <div className="ticket-print-zone bg-white/5 p-6 rounded-2xl border border-dashed border-white/20 flex flex-col items-center text-center space-y-3 animate-fadeIn">
                  <span className="qr-caption block text-sm font-bold tracking-wider text-slate-200" id="printTicketCaption">
                    MUSICBOX - VÉ VÀO PHÒNG KHÁCH HÀNG ({successData.code})
                  </span>
                  <div className="qr-wrapper p-3 bg-white rounded-xl shadow-xl inline-block">
                    <img id="roomEntranceQR" src={successData.qr} alt="Entrance QR Code" className="w-36 h-36" />
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    Mã QR dùng để kích hoạt hệ thống âm thanh ánh sáng tự động tại cửa phòng {successData.roomName}
                  </p>
                </div>
              ) : (
                <div className="py-5 bg-white/[0.02] border border-dashed border-white/5 rounded-2xl text-center text-xs text-slate-500 italic">
                  Vui lòng kiểm tra lại thời gian trên và ấn nút "Thuê phòng ngay" bên dưới để kích hoạt mã QR vào phòng.
                </div>
              )}

              {/* ĐỔI LOGIC NÚT ĐIỀU HƯỚNG */}
              <div className="checkin-actions flex flex-col sm:flex-row justify-between gap-3 pt-2">
                <button
                  className="btn-secondary px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm flex items-center justify-center gap-2"
                  onClick={backToScannerState}
                >
                  <i className="fas fa-arrow-left text-xs"></i> QUAY LẠI QUÉT MÃ
                </button>

                {!isRented ? (
                  <button
                    className="btn-rent px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold uppercase tracking-wider transition-all text-sm border border-emerald-500 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                    onClick={handleRentRoom}
                  >
                    <i className="fas fa-key"></i> Thuê phòng ngay
                  </button>
                ) : (
                  <button
                    className="btn-print-large px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#1e1b4b] text-white font-bold transition-all text-sm border border-[#8b5cf6] flex items-center justify-center gap-2 shadow-lg shadow-[#8b5cf6]/10 animate-fadeIn"
                    onClick={() => window.print()}
                  >
                    <i className="fas fa-print"></i> IN MÃ QR VÀO PHÒNG
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Hoạt họa phục vụ chuyển động */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes scanner {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanner {
          animation: scanner 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}