import { useState, useRef } from 'react';

export default function Checkin() {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState('checkin'); 
  const [typeFilter, setTypeFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');
  
  // Quản lý trạng thái các phòng (Mô phỏng dữ liệu từ HTML)
  const [rooms, setRooms] = useState([
    {
      id: '402',
      type: 'VIP',
      capacity: '5',
      capacityText: '5 người',
      img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
      status: 'TRỐNG',
      prices: { weekday: '150K/h', weekend: '200K/h', holiday: '300K/h' },
      isRentFormOpen: false,
      phoneInput: '',
    },
    {
      id: '305',
      type: 'VIP',
      capacity: '8',
      capacityText: '8 người',
      img: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=500',
      status: 'TRỐNG',
      prices: { weekday: '180K/h', weekend: '250K/h', holiday: '350K/h' },
      isRentFormOpen: false,
      phoneInput: '',
    },
    {
      id: '101',
      type: 'Thường',
      capacity: '10',
      capacityText: '10 người',
      img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
      status: 'TRỐNG',
      prices: { weekday: '100K/h', weekend: '140K/h', holiday: '200K/h' },
      isRentFormOpen: false,
      phoneInput: '',
    }
  ]);

  // Quản lý trạng thái phân hệ Check-in
  const [bookingCode, setBookingCode] = useState('');
  const [checkinAlert, setCheckinAlert] = useState({ show: false, type: '', message: '' });
  const [checkinStep, setCheckinStep] = useState('scanner'); // 'scanner' hoặc 'success'
  const [successData, setSuccessData] = useState({ code: '', name: '', room: '', qr: '' });
  const [isCheckinFormDisabled, setIsCheckinFormDisabled] = useState(false);
  
  const bookingInputRef = useRef(null);

  // --- LOGIC XỬ LÝ PHÒNG TẠI CHỖ ---
  const handleOpenRentForm = (id) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, isRentFormOpen: true } : r));
  };

  const handlePhoneInputChange = (id, val) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, phoneInput: val } : r));
  };

  const handleSaveRent = (id) => {
    const targetRoom = rooms.find(r => r.id === id);
    const customer = targetRoom.phoneInput.trim() === "" ? "Khách vãng lai" : targetRoom.phoneInput;
    
    alert(`Đã tiếp nhận yêu cầu thuê Phòng ${id} thành công!\nKhách hàng: ${customer}`);
    
    setRooms(rooms.map(r => r.id === id ? {
      ...r,
      status: 'ĐANG BẬN',
      isRentFormOpen: false
    } : r));
  };

  const copyTextLink = (textValue) => {
    navigator.clipboard.writeText(textValue).then(() => {
      alert("Đã copy link phòng: " + textValue);
    });
  };

  const triggerPrintAction = (id) => {
    alert(`Đang tiến hành in mã QR cho Phòng ${id}...`);
    window.print();
  };

  // --- LOGIC XỬ LÝ CHECK-IN ĐẶT TRƯỚC ---
  const handleSwitchView = (view) => {
    setCurrentView(view);
    setCheckinAlert({ show: false, type: '', message: '' });
    if (view === 'check-in') {
      setTimeout(() => bookingInputRef.current?.focus(), 50);
    }
  };

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

    // Giả lập check-in thành công
    setSuccessData({
      code: code.toUpperCase(),
      name: "Trần Hải Long (Thành viên VIP)",
      room: "Phòng VIP 402 - [Tầng 4]",
      qr: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://musicbox.com/verify-entrance?code=${code}`
    });
    setCheckinStep('success');
  };

  const resetCheckInForm = () => {
    setBookingCode('');
    setCheckinAlert({ show: false, type: '', message: '' });
    setIsCheckinFormDisabled(false);
    setTimeout(() => bookingInputRef.current?.focus(), 50);
  };

  const backToScannerState = () => {
    setCheckinStep('scanner');
    resetCheckInForm();
  };

  // --- LỌC DỮ LIỆU ---
  const filteredRooms = rooms.filter(room => {
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    const matchesCapacity = capacityFilter === 'all' || room.capacity === capacityFilter;
    return matchesType && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Nút giả lập Menu điều hướng (Tương ứng switchView trong file script của bạn) */}
      <div className="mb-8 flex gap-4 border-b border-white/10 pb-4">
        <button 
          onClick={() => handleSwitchView('checkin')}
          className={`px-4 py-2 rounded-lg transition-all ${currentView === 'checkin' ? 'bg-[#8b5cf6] text-white font-semibold' : 'text-slate-400 hover:text-white bg-white/5'}`}
        >
          <i className="fas fa-microphone-alt mr-2"></i>Danh Sách Phòng
        </button>
        <button 
          onClick={() => handleSwitchView('check-in')}
          className={`px-4 py-2 rounded-lg transition-all ${currentView === 'check-in' ? 'bg-[#8b5cf6] text-white font-semibold' : 'text-slate-400 hover:text-white bg-white/5'}`}
        >
          <i className="fas fa-qrcode mr-2"></i>Check-in Đặt Chỗ
        </button>
      </div>

      <div className="main-content">
        
        {/* ================= PHÂN VÙNG 1: DANH SÁCH PHÒNG HÁT ================= */}
        {currentView === 'checkin' && (
          <div id="danhSachPhongView" className="space-y-6 animate-fadeIn">
            <div className="header-top flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent">
                DANH SÁCH PHÒNG HÁT
              </h1>
              
              <div className="filter-bar flex flex-wrap gap-4">
                <div className="filter-group flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <label className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                    <i className="fas fa-filter text-[#c4b5fd]"></i> Loại phòng:
                  </label>
                  <select 
                    id="typeFilter" 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#1e1b4b]">Tất cả loại phòng</option>
                    <option value="VIP" className="bg-[#1e1b4b]">VIP</option>
                    <option value="Thường" className="bg-[#1e1b4b]">Thường</option>
                  </select>
                </div>
                
                <div className="filter-group flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <label className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                    <i className="fas fa-users text-[#c4b5fd]"></i> Sức chứa:
                  </label>
                  <select 
                    id="capacityFilter" 
                    value={capacityFilter}
                    onChange={(e) => setCapacityFilter(e.target.value)}
                    className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#1e1b4b]">Tất cả sức chứa</option>
                    <option value="5" className="bg-[#1e1b4b]">Phòng nhỏ (1-5 người)</option>
                    <option value="8" className="bg-[#1e1b4b]">Phòng vừa (5-8 người)</option>
                    <option value="10" className="bg-[#1e1b4b]">Phòng lớn (8-12 người)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="room-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6" id="roomGrid">
              {filteredRooms.map((room) => (
                <div 
                  key={room.id}
                  className="room-card bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-[#8b5cf6]/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] flex flex-col"
                  data-type={room.type} 
                  data-capacity={room.capacity}
                >
                  <div className="room-thumb relative h-48 overflow-hidden">
                    <img src={room.img} alt="Karaoke Room" className="w-full h-full object-cover" />
                    <span className={`status-tag absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md text-white border border-white/20 shadow-lg ${room.status === 'TRỐNG' ? 'bg-emerald-500/80' : 'bg-rose-500/80'}`}>
                      {room.status}
                    </span>
                  </div>
                  
                  <div className="room-details p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="room-title-wrapper flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold tracking-wide">Phòng {room.id}</h3>
                        <span className={`text-xs font-black tracking-widest px-2 py-0.5 rounded border ${room.type === 'VIP' ? 'text-[#c4b5fd] border-[#8b5cf6]' : 'text-slate-400 border-white/10'}`}>
                          {room.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="capacity-info text-sm text-slate-300 flex items-center gap-2 mb-4">
                        <i className="fas fa-user-friends text-[#c4b5fd]"></i> Sức chứa: {room.capacityText}
                      </div>
                      
                      <div className="price-row grid grid-cols-3 gap-1 bg-black/20 p-2.5 rounded-xl border border-white/5 text-center text-xs">
                        <div>
                          <p className="text-slate-400 mb-0.5">Ngày thường</p>
                          <b className="text-white block font-semibold">{room.prices.weekday}</b>
                        </div>
                        <div className="border-x border-white/10">
                          <p className="text-slate-400 mb-0.5">Cuối tuần</p>
                          <b className="text-white block font-semibold">{room.prices.weekend}</b>
                        </div>
                        <div>
                          <p className="text-slate-400 mb-0.5">Ngày lễ</p>
                          <b className="text-white block font-semibold">{room.prices.holiday}</b>
                        </div>
                      </div>
                    </div>

                    <div className="action-box pt-2">
                      {room.status === 'TRỐNG' && !room.isRentFormOpen && (
                        <button 
                          className="btn-rent w-full bg-[#8b5cf6] hover:bg-[#6d28d9] text-white text-sm font-bold tracking-wider py-3 rounded-xl transition-all duration-200 border border-[#8b5cf6] active:scale-[0.98]" 
                          onClick={() => handleOpenRentForm(room.id)}
                        >
                          THUÊ PHÒNG NGAY
                        </button>
                      )}

                      {room.status === 'ĐANG BẬN' && (
                        <button 
                          className="w-full bg-white/5 text-slate-400 border border-white/10 text-sm font-bold tracking-wider py-3 rounded-xl cursor-not-allowed" 
                          disabled
                        >
                          ĐANG SỬ DỤNG
                        </button>
                      )}
                      
                      {room.isRentFormOpen && (
                        <div className="rent-form-container bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col space-y-2.5 animate-fadeIn">
                          <label className="text-xs text-slate-400">Số điện thoại khách hàng:</label>
                          <input 
                            type="text" 
                            placeholder={room.id === '402' ? "Khách vãng lai..." : "..."}
                            value={room.phoneInput}
                            onChange={(e) => handlePhoneInputChange(room.id, e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#8b5cf6] placeholder-slate-500"
                          />
                          <button 
                            className="btn-save w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg transition-all" 
                            onClick={() => handleSaveRent(room.id)}
                          >
                            XÁC NHẬN THUÊ
                          </button>
                        </div>
                      )}

                      {room.status === 'ĐANG BẬN' && (
                        <div className="active-room-box mt-4 bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center space-y-4 animate-fadeIn">
                          <div className="ticket-print-zone text-center w-full">
                            <span className="qr-caption block text-xs font-bold tracking-wider text-slate-300 mb-2">MUSICBOX - VÉ PHÒNG {room.id}</span>
                            <div className="qr-wrapper inline-block p-2 bg-white rounded-xl shadow-inner">
                              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://musicbox.com/room/${room.id}`} alt="QR Code" className="w-28 h-28" />
                            </div>
                          </div>
                          
                          <div className="w-full text-left space-y-1">
                            <label className="text-[11px] text-slate-400">Đường dẫn vào phòng:</label>
                            <div className="link-display-field flex justify-between items-center bg-black/20 border border-white/5 rounded-lg p-2 gap-2 overflow-hidden">
                              <span className="link-text-url text-xs text-slate-300 truncate">https://musicbox.com/room/{room.id}</span>
                              <button 
                                className="btn-mini-copy text-slate-400 hover:text-[#c4b5fd] p-1 transition-all" 
                                onClick={() => copyTextLink(`https://musicbox.com/room/${room.id}`)} 
                                title="Sao chép"
                              >
                                <i className="fas fa-copy text-xs"></i>
                              </button>
                            </div>
                          </div>

                          <button 
                            className="btn-print-large w-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#1e1b4b] text-white text-xs font-bold py-2.5 rounded-lg border border-[#8b5cf6] flex items-center justify-center gap-2 transition-all" 
                            onClick={() => triggerPrintAction(room.id)}
                          >
                            <i className="fas fa-print"></i> IN MÃ QR NGAY
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PHÂN VÙNG 2: CHECK-IN THUÊ PHÒNG ================= */}
        {currentView === 'check-in' && (
          <div id="checkInBookingView" className="checkin-view bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto animate-fadeIn">
            <div className="header-top mb-6 text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent">
                CHECK-IN THUÊ PHÒNG
              </h1>
            </div>

            {/* Thông báo Alert */}
            {checkinAlert.show && (
              <div className={`alert-box flex items-center gap-3 p-4 rounded-xl mb-6 text-sm border animate-pulse ${
                checkinAlert.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                <i className={`fas ${checkinAlert.type === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'} text-base`}></i>
                <div dangerouslySetInnerHTML={{ __html: checkinAlert.message }}></div>
              </div>
            )}

            {/* Bước quét mã / Nhập mã */}
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

            {/* Bước hiển thị kết quả thành công */}
            {checkinStep === 'success' && (
              <div id="checkinSuccessBody" className="success-result-box flex flex-col space-y-6 animate-fadeIn">
                <div id="successAlert" className="alert-box bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 p-4 rounded-xl text-sm">
                  <i className="fas fa-check-circle text-base text-emerald-400"></i>
                  <span>Xác thực thành công! Đơn đặt phòng đã cập nhật sang trạng thái <b>Hoàn thành</b>.</span>
                </div>

                <div className="info-card bg-black/20 border border-white/5 rounded-2xl p-4 space-y-3 text-sm">
                  <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-slate-400">Mã đặt phòng</span>
                    <span id="resBookingCode" className="font-mono font-bold text-[#c4b5fd]">{successData.code}</span>
                  </div>
                  <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-slate-400">Tên khách hàng</span>
                    <span id="resCustomerName" className="font-medium text-white">{successData.name}</span>
                  </div>
                  <div className="info-row flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-slate-400">Phòng chỉ định</span>
                    <span id="resRoomID" className="font-medium text-white">{successData.room}</span>
                  </div>
                  <div className="info-row flex justify-between pt-0.5">
                    <span className="text-slate-400">Trạng thái đơn</span>
                    <span><span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">Đã hoàn thành</span></span>
                  </div>
                </div>

                <div className="ticket-print-zone bg-white/5 p-6 rounded-2xl border border-dashed border-white/20 flex flex-col items-center text-center space-y-3">
                  <span className="qr-caption block text-sm font-bold tracking-wider text-slate-200" id="printTicketCaption">
                    MUSICBOX - VÉ VÀO PHÒNG KHÁCH HÀNG ({successData.code})
                  </span>
                  <div className="qr-wrapper p-3 bg-white rounded-xl shadow-xl inline-block">
                    <img id="roomEntranceQR" src={successData.qr} alt="Entrance QR Code" className="w-36 h-36" />
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    Mã QR dùng để kích hoạt hệ thống âm thanh ánh sáng tự động tại cửa phòng hát
                  </p>
                </div>

                <div className="checkin-actions flex flex-col sm:flex-row justify-between gap-3 pt-2">
                  <button 
                    className="btn-secondary px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm flex items-center justify-center gap-2" 
                    onClick={backToScannerState}
                  >
                    <i className="fas fa-arrow-left text-xs"></i> TIẾP TỤC CHECK-IN KHÁC
                  </button>
                  <button 
                    className="btn-print-large px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#1e1b4b] text-white font-bold transition-all text-sm border border-[#8b5cf6] flex items-center justify-center gap-2 shadow-lg shadow-[#8b5cf6]/10" 
                    onClick={() => window.print()}
                  >
                    <i className="fas fa-print"></i> IN MÃ QR VÀO PHÒNG
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* CSS Nhúng phục vụ chuyển động mượt và hiệu ứng Scanner của Glassmorphism */}
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