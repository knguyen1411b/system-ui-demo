<<<<<<< HEAD
import { useState } from 'react';

// DỮ LIỆU KHỞI TẠO CÁC PHÒNG TRỐNG TRONG HỆ THỐNG
=======
import CurrentTimeBox from '@/components/CurrentTimeBox';
import { useState } from 'react';

// Giả định giờ đóng cửa của quán là 24.0 (12h đêm)
const GIOR_DONG_CUA = 24.0;

// DỮ LIỆU MẪU CÁC PHÒNG VỚI LỊCH ĐẶT TRƯỚC (Schedules)
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
const INITIAL_ROOMS_DATA = [
  {
    id: '402',
    type: 'VIP',
<<<<<<< HEAD
    capacity: '20',
    capacityText: '5 người',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
    prices: { weekday: '150K/h', weekend: '200K/h', holiday: '300K/h' }
=======
    capacityText: '5 người',
    capacity: '5',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
    schedules: [
      { batDau: 17.0, ketThuc: 19.0 },
      { batDau: 19.0, ketThuc: 20.0 }
    ]
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
  },
  {
    id: '305',
    type: 'VIP',
<<<<<<< HEAD
    capacity: '30',
    capacityText: '8 người',
    img: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=500',
    prices: { weekday: '180K/h', weekend: '250K/h', holiday: '350K/h' }
  },
  {
    id: '101',
    type: 'Thuường', // Giữ nguyên chữ "Thuường" theo bộ lọc của bạn
    capacity: '10',
    capacityText: '3 người',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
    prices: { weekday: '100K/h', weekend: '140K/h', holiday: '200K/h' }
=======
    capacityText: '8 người',
    capacity: '8',
    img: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=500',
    schedules: [
      { batDau: 16.0, ketThuc: 18.0 } // Sẽ bị ẩn nếu mốc tính toán rơi vào khoảng 16h-18h
    ]
  },
  {
    id: '101',
    type: 'Thường',
    capacityText: '3 người',
    capacity: '5',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
    schedules: [
      { batDau: 21.0, ketThuc: 23.0 }
    ]
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
  }
];

export default function ThuePhong() {
<<<<<<< HEAD
  const [rooms, setRooms] = useState(INITIAL_ROOMS_DATA);
  const [typeFilter, setTypeFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');

  // Trạng thái tương tác của từng phòng (Thuê phòng, Điền SĐT, Đã thuê)
  const [roomStates, setRoomStates] = useState({});

  const handleOpenRentForm = (roomId) => {
    setRoomStates(prev => ({
      ...prev,
      [roomId]: { ...prev[roomId], showForm: true }
    }));
  };

  const handleConfirmRent = (roomId) => {
    const phoneInput = roomStates[roomId]?.phone?.trim();
    const customer = phoneInput === "" || !phoneInput ? "Khách vãng lai" : phoneInput;

    alert(`Đã tiếp nhận yêu cầu thuê Phòng ${roomId} thành công!`);
=======
  // Mốc thời gian dạng số (float) dùng để chạy thuật toán ẩn/hiển thị phòng
  const [appliedTime, setAppliedTime] = useState(new Date().getHours() + new Date().getMinutes() / 60);

  // --- Trạng thái bộ lọc và phòng ---
  const [rooms] = useState(INITIAL_ROOMS_DATA);
  const [typeFilter, setTypeFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [roomStates, setRoomStates] = useState({});


  // HÀNH ĐỘNG: Căn cứ vào giờ hiện tại để tính toán lại lịch trống các phòng
  const handleRefreshAvailableRooms = () => {
    const now = new Date();
    // setHours(giờ, phút, giây, mili-giây)
    now.setHours(15, 0, 0, 0);
    const floatTime = now.getHours() + (now.getMinutes() / 60);
    setAppliedTime(floatTime);
    setRoomStates({}); // Reset trạng thái các form đang nhập để cập nhật theo mốc mới
    alert("Đã cập nhật danh sách phòng trống theo giờ hiện tại!");
  };

  // Mở form chọn GIỜ RA dự kiến
  const handleOpenRentForm = (roomId, maxOutTime) => {
    // Mặc định gợi ý giờ ra là +1 tiếng so với giờ hiện tại (nhưng không vượt quá giờ chặn)
    const currentHour = new Date().getHours();
    const defaultOutHour = Math.min(currentHour + 1, Math.floor(maxOutTime));
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e

    setRoomStates(prev => ({
      ...prev,
      [roomId]: {
<<<<<<< HEAD
        showForm: false,
        isRented: true,
        customerName: customer,
=======
        ...prev[roomId],
        showForm: true,
        outHour: defaultOutHour,
        outMinute: 0
      }
    }));
  };

  const handleConfirmRent = (roomId, maxOutTime) => {
    const state = roomStates[roomId];
    const chosenOutTime = parseInt(state?.outHour || 0) + (parseInt(state?.outMinute || 0) / 60);

    // Validate kiểm tra nếu giờ ra nhỏ hơn giờ hiện tại hoặc vượt quá giờ chặn lịch tiếp theo
    if (chosenOutTime <= appliedTime) {
      alert("Thời gian ra dự kiến phải lớn hơn thời gian hiện tại!");
      return;
    }
    if (chosenOutTime > maxOutTime) {
      alert(`Thời gian ra vượt quá khung giờ trống cho phép! Vui lòng chọn trước ${formatHour(maxOutTime)}.`);
      return;
    }

    alert(`Đã tiếp nhận vào phòng ${roomId} thành công! Giờ ra dự kiến: ${state.outHour}:${state.outMinute.toString().padStart(2, '0')}`);

    setRoomStates(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        showForm: false,
        isRented: true,
        expectedCheckout: chosenOutTime,
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
        qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://musicbox.com/room/${roomId}`
      }
    }));
  };

<<<<<<< HEAD
  const handlePhoneChange = (roomId, value) => {
    setRoomStates(prev => ({
      ...prev,
      [roomId]: { ...prev[roomId], phone: value }
=======
  const handleOutTimeChange = (roomId, field, value) => {
    setRoomStates(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [field]: parseInt(value)
      }
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
    }));
  };

  const handleCopyLink = (textValue) => {
    navigator.clipboard.writeText(textValue).then(() => {
<<<<<<< HEAD
      alert("Đã copy link phòng: " + textValue);
=======
      alert("Đã sao chép link phòng!");
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
    });
  };

  const handleTriggerPrint = (roomId) => {
    const element = document.getElementById(`room-card-${roomId}`);
    if (element) {
      element.classList.add('printing-target');
      window.print();
      element.classList.remove('printing-target');
    }
  };

<<<<<<< HEAD
  // Logic lọc dữ liệu phòng hát
  const filteredRooms = rooms.filter(room => {
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    const matchesCapacity = capacityFilter === 'all' || room.capacity === capacityFilter;
    return matchesType && matchesCapacity;
  });
=======
  // Chuyển đổi số float (16.5) -> Chuỗi hiển thị (16:30)
  const formatHour = (num) => {
    const hours = Math.floor(num);
    const minutes = Math.round((num - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">

<<<<<<< HEAD
      {/* Header trên + Thanh lọc bộ lọc */}
      <div className="flex flex-col items-start gap-6 mb-10 print:hidden">
        <h1 className="text-2xl font-bold border-l-4 border-[#8b5cf6] pl-[15px] tracking-wide uppercase">
          Quản Lý Thuê Phòng
        </h1>

        {/* Thanh Filter bar đồng bộ */}
        <div className="flex gap-5 w-full bg-white/5 p-[15px_25px] rounded-2xl border border-white/10 shadow-md">
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
=======
      {/* HEADER ĐỒNG BỘ THỜI GIAN THỰC */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent uppercase">
          Thuê phòng
        </h1>
        <CurrentTimeBox></CurrentTimeBox>
      </header>

      {/* THANH BỘ LỌC & NÚT TÌM PHÒNG TRỐNG THEO GIỜ HIỆN TẠI */}
      <div className="flex flex-col gap-4 mb-10 print:hidden">
        <div className="flex flex-wrap gap-5 w-full bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg items-end">

          {/* Bộ lọc Loại phòng */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loại phòng:</label>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer w-full"
              >
                <option value="all" className="bg-[#1e1b4b]">Tất cả loại</option>
                <option value="VIP" className="bg-[#1e1b4b]">VIP</option>
                <option value="Thường" className="bg-[#1e1b4b]">Thường</option>
              </select>
            </div>
          </div>

          {/* Bộ lọc Sức chứa */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sức chứa:</label>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer w-full"
              >
                <option value="all" className="bg-[#1e1b4b]">Tất cả sức chứa</option>
                <option value="5" className="bg-[#1e1b4b]">Phòng nhỏ (1-5 người)</option>
                <option value="8" className="bg-[#1e1b4b]">Phòng vừa (5-8 người)</option>
              </select>
            </div>
          </div>

          {/* NÚT TÌM PHÒNG TRỐNG CĂN CỨ VÀO GIỜ HIỆN TẠI */}
          <button
            onClick={handleRefreshAvailableRooms}
            className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs px-5 h-[42px] rounded-xl transition-all uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/20"
          >
            <i className="fas fa-search"></i> Tìm phòng trống
          </button>
        </div>

        <div className="text-xs text-slate-400 pl-1">
          📊 Đang tính toán dữ liệu phòng trống từ mốc: <span className="text-purple-400 font-bold font-mono text-sm">{formatHour(appliedTime)}</span>
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
        </div>
      </div>

      {/* GRID HIỂN THỊ DANH SÁCH CARD PHÒNG */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] print:block">
        {filteredRooms.map((room) => {
          const state = roomStates[room.id] || { showForm: false, isRented: false, phone: '' };

          return (
            <div
              key={room.id}
              id={`room-card-${room.id}`}
              className={`bg-white/5 border border-white/10 rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#8b5cf6] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] print:border-none print:bg-white print:text-black print:shadow-none print:hidden print:m-0 print:p-0 ${state.isRented ? 'print-target-active' : ''}`}
            >
              {/* Ảnh cover phòng */}
              <div className="h-[180px] relative bg-[#222] print:hidden">
                <img src={room.img} alt={`Karaoke Room ${room.id}`} className="w-full h-full object-cover" />
                <span className={`absolute top-[15px] right-[15px] p-[6px_12px] rounded-lg text-[11px] font-black tracking-wider ${state.isRented ? 'bg-[#ef4444]' : 'bg-[#2ecc71]'}`}>
                  {state.isRented ? 'ĐANG BẬN' : 'TRỐNG'}
                </span>
              </div>

              {/* Chi tiết thông tin phòng */}
              <div className="p-6 print:p-0">
                <div className="flex justify-between items-center mb-1.5 print:hidden">
                  <h3 className="text-lg font-bold text-white">Phòng {room.id}</h3>
                  <span className="text-[#fb923c] text-xs font-black uppercase tracking-wide">{room.type}</span>
                </div>

                <div className="text-xs text-[#94a3b8] mb-4 flex items-center gap-1.5 print:hidden">
                  <i className="fas fa-user-friends"></i> Sức chứa: {room.capacityText}
                </div>

                {/* Giá tiền các loại ngày */}
                <div className="grid grid-cols-3 text-[11px] text-[#94a3b8] bg-white/[0.02] p-3 rounded-xl mb-6 text-center border border-white/5 print:hidden">
                  <div>Ngày thường<b className="text-[#c4b5fd] text-sm block mt-1 font-bold">{room.prices.weekday}</b></div>
                  <div className="border-x border-white/10">Cuối tuần<b className="text-[#c4b5fd] text-sm block mt-1 font-bold">{room.prices.weekend}</b></div>
                  <div>Ngày lễ<b className="text-[#c4b5fd] text-sm block mt-1 font-bold">{room.prices.holiday}</b></div>
                </div>

                {/* KHỐI XỬ LÝ ACTION TƯƠNG TÁC */}
                <div className="space-y-3">

                  {!state.showForm && (
                    <button
                      onClick={() => !state.isRented && handleOpenRentForm(room.id)}
                      disabled={state.isRented}
                      className={`w-full p-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all border ${state.isRented ? 'bg-white/5 border-white/10 text-[#94a3b8] cursor-not-allowed' : 'bg-transparent border-[#8b5cf6] text-[#c4b5fd] hover:bg-[#8b5cf6] hover:text-white active:scale-98'}`}
                    >
                      {state.isRented ? 'ĐANG SỬ DỤNG' : 'THUÊ PHÒNG NGAY'}
                    </button>
                  )}

                  {state.showForm && (
                    <div className="bg-black/30 border border-white/10 p-4 rounded-xl flex flex-col gap-3 animate-slideDown print:hidden">
                      <label className="text-xs text-[#94a3b8]">Số điện thoại khách hàng:</label>
                      <input
                        type="text"
                        placeholder="Khách vãng lai..."
                        value={state.phone}
                        onChange={(e) => handlePhoneChange(room.id, e.target.value)}
                        className="bg-[#0f172a] border border-white/10 p-3 rounded-lg text-white text-sm outline-none focus:border-[#8b5cf6] transition-all"
                      />
                      <button
                        onClick={() => handleConfirmRent(room.id)}
                        className="bg-[#8b5cf6] hover:bg-[#6d28d9] text-white p-3 rounded-lg text-xs font-bold transition-all"
                      >
                        XÁC NHẬN THUÊ
                      </button>
                    </div>
                  )}

                  {state.isRented && (
                    <div className="bg-[#8b5cf6]/5 border border-[#8b5cf6]/25 p-[18px] rounded-2xl flex flex-col items-center gap-3.5 animate-slideDown print:flex print:bg-white print:text-black print:border-none print:p-5">

                      <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-xs font-bold text-[#f1f5f9] tracking-wide text-center print:text-black print:text-lg print:font-sans print:mb-2 font-mono">
                          MUSICBOX - VÉ PHÒNG {room.id}
                        </span>
                        <div className="bg-white p-3 rounded-xl shadow-lg flex items-center justify-center print:shadow-none print:p-0">
                          <img src={state.qrUrl} alt="QR Code Vé Vào Phòng" className="w-[140px] h-[140px] block print:w-[220px] print:h-[220px]" />
                        </div>
                      </div>

                      <div className="w-full text-left print:hidden">
                        <label className="text-[11px] text-[#94a3b8]">Đường dẫn vào phòng:</label>
                        <div className="flex w-full bg-[#0f172a] border border-white/10 rounded-lg overflow-hidden mt-1">
                          <span className="flex-1 p-[10px_12px] text-xs text-[#c4b5fd] whitespace-nowrap overflow-hidden text-ellipsis select-all">
                            {`https://musicbox.com/room/${room.id}`}
                          </span>
                          <button
                            onClick={() => handleCopyLink(`https://musicbox.com/room/${room.id}`)}
                            className="bg-white/5 border-l border-white/10 text-[#94a3b8] px-3 hover:text-white hover:bg-[#8b5cf6]/20 transition-all"
                            title="Sao chép đường dẫn"
                          >
                            <i className="fas fa-copy text-xs"></i>
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleTriggerPrint(room.id)}
                        className="w-full p-3 bg-[#fb923c] text-[#0f172a] border-none rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-all uppercase tracking-wide print:hidden"
                      >
                        <i className="fas fa-print"></i> IN MÃ QR NGAY
                      </button>

                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* INJECT ANIMATION VÀ PRINT STYLE */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        @media print {
          body, div:not(.print-target-active), h1, select, label, button, span:not(.print-target-active span) {
=======
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] print:block">
        {rooms
          .filter(room => (typeFilter === 'all' || room.type === typeFilter) && (capacityFilter === 'all' || room.capacity === capacityFilter))
          .map((room) => {
            const state = roomStates[room.id] || { showForm: false, isRented: false, outHour: 0, outMinute: 0, expectedCheckout: 0 };

            // === THỰC THI THUẬT TOÁN ĐỀ BÀI ===
            // 1. Lọc: Xóa các lịch có ketThuc <= mốc giờ áp dụng
            const validSchedules = room.schedules.filter(sch => sch.ketThuc > appliedTime);

            // 2. Sort: Sắp xếp tăng dần theo thời gian bắt đầu
            const sortedSchedules = [...validSchedules].sort((a, b) => a.batDau - b.batDau);

            // 3. Tìm mốc chặn (T_chặn)
            const nextSchedule = sortedSchedules.find(sch => sch.batDau > appliedTime);
            const tChan = nextSchedule ? nextSchedule.batDau : GIOR_DONG_CUA;

            // 4. Tính số giờ trống khả dụng
            const hasOngoingSchedule = sortedSchedules.some(sch => sch.batDau <= appliedTime && sch.ketThuc > appliedTime);
            const soGioTrong = hasOngoingSchedule ? 0 : (tChan - appliedTime);

            // Ẩn phòng có Số Giờ Trống <= 0 theo đúng nghiệp vụ đầu ra OUTPUT
            if (soGioTrong <= 0 && !state.isRented) {
              return null;
            }

            // Tính số phút đếm ngược còn lại cho tới khi bị chặn lịch
            const minutesLeftToNextBooking = Math.round((tChan - appliedTime) * 60);

            return (
              <div
                key={room.id}
                id={`room-card-${room.id}`}
                className={`bg-white/5 border border-white/10 rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#8b5cf6] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] print:border-none print:bg-white print:text-black print:shadow-none ${state.isRented ? 'print-target-active' : ''}`}
              >
                {/* Ảnh cover phòng */}
                <div className="h-[140px] relative bg-[#222] print:hidden">
                  <img src={room.img} alt={`Room ${room.id}`} className="w-full h-full object-cover opacity-75" />
                  <span className={`absolute top-[15px] right-[15px] p-[6px_12px] rounded-lg text-[11px] font-black tracking-wider ${state.isRented ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'}`}>
                    {state.isRented ? 'ĐANG BẬN' : `TRỐNG TIẾP ${soGioTrong.toFixed(1)}H`}
                  </span>
                </div>

                {/* Nội dung chi tiết phòng */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2 print:block">
                    <h3 className="text-lg font-bold text-white print:text-black print:text-2xl">Phòng {room.id}</h3>
                    <span className="text-[#fb923c] text-xs font-black uppercase tracking-wide print:text-sm">{room.type}</span>
                  </div>

                  <div className="text-xs text-[#94a3b8] mb-4 print:text-black">
                    <i className="fas fa-user-friends"></i> Sức chứa: {room.capacityText}
                  </div>

                  {/* KHUNG GIỜ KHÁCH SẮP ĐẶT SAU ĐÓ */}
                  <div className="mb-4 bg-white/5 p-3 rounded-xl border border-white/5 print:hidden">
                    <span className="text-[11px] text-purple-400 block font-bold uppercase mb-1.5 tracking-wider">
                      <i className="fas fa-calendar-alt"></i> Khung giờ khách đặt sau đó:
                    </span>
                    {sortedSchedules.length > 0 ? (
                      <div className="space-y-1">
                        {sortedSchedules.map((sch, idx) => (
                          <div key={idx} className="text-xs text-slate-300">
                            ⏱ <b>{formatHour(sch.batDau)} - {formatHour(sch.ketThuc)}</b>
                            {sch.batDau === tChan && <span className="text-amber-400 text-[10px] ml-1.5">(Lịch tiếp theo)</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic">Không có lịch đặt sau đó</div>
                    )}
                  </div>

                  {/* THỜI GIAN ĐẾM NGƯỢC CÒN BAO LÂU CÓ LỊCH ĐẶT */}
                  {!state.isRented && nextSchedule && (
                    <div className="mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs p-2.5 rounded-lg flex items-center gap-2 print:hidden">
                      <i className="fas fa-hourglass-half animate-pulse"></i>
                      <span>Còn <b>{minutesLeftToNextBooking} phút</b> nữa tới lịch đặt phòng</span>
                    </div>
                  )}

                  {/* KHỐI ĐIỀU KHIỂN ĐẶT PHÒNG */}
                  <div className="space-y-3">
                    {!state.showForm && !state.isRented && (
                      <button
                        onClick={() => handleOpenRentForm(room.id, tChan)}
                        className="w-full p-3 bg-transparent border border-[#8b5cf6] text-[#c4b5fd] rounded-xl text-xs font-bold tracking-wider uppercase transition-all hover:bg-[#8b5cf6] hover:text-white active:scale-95"
                      >
                        THUÊ PHÒNG NGAY
                      </button>
                    )}

                    {/* TÍNH NĂNG CHỌN GIỜ VÀ PHÚT RA DỰ KIẾN */}
                    {state.showForm && (
                      <div className="bg-black/30 border border-white/10 p-3.5 rounded-xl flex flex-col gap-3 animate-slideDown print:hidden">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-[#94a3b8] font-bold">Chọn giờ ra dự kiến:</label>
                          <span className="text-[11px] text-amber-400 font-mono">Trống đến: {formatHour(tChan)}</span>
                        </div>

                        <div className="flex gap-2">
                          {/* Dropdown chọn Giờ */}
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 text-center">Giờ</span>
                            <select
                              value={state.outHour}
                              onChange={(e) => handleOutTimeChange(room.id, 'outHour', e.target.value)}
                              className="bg-slate-900 border border-white/10 p-2 rounded-lg text-white font-mono text-sm outline-none focus:border-purple-500"
                            >
                              {Array.from({ length: 24 }, (_, i) => i).map(h => (
                                <option key={h} value={h}>{h.toString().padStart(2, '0')} giờ</option>
                              ))}
                            </select>
                          </div>

                          {/* Dropdown chọn Phút */}
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 text-center">Phút</span>
                            <select
                              value={state.outMinute}
                              onChange={(e) => handleOutTimeChange(room.id, 'outMinute', e.target.value)}
                              className="bg-slate-900 border border-white/10 p-2 rounded-lg text-white font-mono text-sm outline-none focus:border-purple-500"
                            >
                              {Array.from({ length: 60 }, (_, i) => i).map(m => (
                                <option key={m} value={m}>{m.toString().padStart(2, '0')} phút</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={() => handleConfirmRent(room.id, tChan)}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider mt-1"
                        >
                          XÁC NHẬN VÀO PHÒNG
                        </button>
                      </div>
                    )}

                    {/* VÉ VÀO PHÒNG KHI ĐÃ ĐƯỢC THUÊ THÀNH CÔNG */}
                    {state.isRented && (
                      <div className="bg-[#8b5cf6]/5 border border-[#8b5cf6]/25 p-4 rounded-2xl flex flex-col items-center gap-3 animate-slideDown print:flex print:bg-white print:text-black print:border-none print:p-2">
                        <div className="w-full text-center border-b border-white/10 pb-2 print:border-black">
                          <div className="text-xs font-mono font-bold text-slate-300 print:text-black print:text-md">
                            VÉ VÀO PHÒNG MUSICBOX
                          </div>
                          <div className="text-[11px] text-amber-400 mt-0.5 font-bold print:text-black">
                            Giờ trả phòng dự kiến: {formatHour(state.expectedCheckout)}
                          </div>
                        </div>

                        <div className="bg-white p-2 rounded-xl shadow-lg flex items-center justify-center print:shadow-none print:p-0">
                          <img src={state.qrUrl} alt="QR Vé Phòng" className="w-[120px] h-[120px] block print:w-[200px] print:h-[200px]" />
                        </div>

                        <div className="w-full text-left print:hidden">
                          <div className="flex w-full bg-[#0f172a] border border-white/10 rounded-lg overflow-hidden mt-1">
                            <span className="flex-1 p-2 text-[11px] text-[#c4b5fd] whitespace-nowrap overflow-hidden text-ellipsis">
                              {`https://musicbox.com/room/${room.id}`}
                            </span>
                            <button
                              onClick={() => handleCopyLink(`https://musicbox.com/room/${room.id}`)}
                              className="bg-white/5 border-l border-white/10 text-[#94a3b8] px-2.5 hover:text-white hover:bg-[#8b5cf6]/20 transition-all"
                            >
                              <i className="fas fa-copy text-xs"></i>
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleTriggerPrint(room.id)}
                          className="w-full p-2.5 bg-[#fb923c] text-[#0f172a] rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all uppercase print:hidden"
                        >
                          <i className="fas fa-print"></i> IN MÃ QR VÉ
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        @media print {
          body, div:not(.print-target-active), h1, header, select, label, button, span:not(.print-target-active span), input {
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
            display: none !important;
          }
          .print-target-active {
            display: block !important;
            width: 100% !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            background: white !important;
            color: black !important;
            margin: 0 !important;
<<<<<<< HEAD
            padding: 0 !important;
=======
            padding: 20px !important;
            border: none !important;
>>>>>>> 62fd5846e29b2a2f817c30a37e85c5c9f09b7f0e
          }
        }
      `}</style>
    </div>
  );
}