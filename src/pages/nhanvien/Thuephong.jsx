import { useState } from 'react';

// DỮ LIỆU KHỞI TẠO CÁC PHÒNG TRỐNG TRONG HỆ THỐNG
const INITIAL_ROOMS_DATA = [
  {
    id: '402',
    type: 'VIP',
    capacity: '20', 
    capacityText: '5 người',
    img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
    prices: { weekday: '150K/h', weekend: '200K/h', holiday: '300K/h' }
  },
  {
    id: '305',
    type: 'VIP',
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
  }
];

export default function ThuePhong() {
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

    setRoomStates(prev => ({
      ...prev,
      [roomId]: { 
        showForm: false, 
        isRented: true, 
        customerName: customer,
        qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://musicbox.com/room/${roomId}`
      }
    }));
  };

  const handlePhoneChange = (roomId, value) => {
    setRoomStates(prev => ({
      ...prev,
      [roomId]: { ...prev[roomId], phone: value }
    }));
  };

  const handleCopyLink = (textValue) => {
    navigator.clipboard.writeText(textValue).then(() => {
      alert("Đã copy link phòng: " + textValue);
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

  // Logic lọc dữ liệu phòng hát
  const filteredRooms = rooms.filter(room => {
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    const matchesCapacity = capacityFilter === 'all' || room.capacity === capacityFilter;
    return matchesType && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      
      {/* Header trên + Thanh lọc bộ lọc */}
      <div className="flex flex-col items-start gap-6 mb-10 print:hidden">
        <h1 className="text-2xl font-bold border-l-4 border-[#8b5cf6] pl-[15px] tracking-wide uppercase">
          Quản Lý Thuê Phòng
        </h1>
        
        {/* Thanh Filter bar đồng bộ */}
        <div className="flex gap-5 w-full bg-white/5 p-[15px_25px] rounded-2xl border border-white/10 shadow-md">
          <div className="flex items-center gap-2.5">
            <label className="text-xs text-[#94a3b8] font-semibold flex items-center gap-1.5">
              <i className="fas fa-filter text-[#c4b5fd]"></i> Loại phòng:
            </label>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#0f172a] border border-white/10 p-[8px_15px] rounded-lg text-white text-xs outline-none cursor-pointer focus:border-[#8b5cf6] transition-all"
            >
              <option value="all">Tất cả loại phòng</option>
              <option value="VIP">VIP</option>
              <option value="Thuường">Thường</option>
            </select>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="text-xs text-[#94a3b8] font-semibold flex items-center gap-1.5">
              <i className="fas fa-users text-[#c4b5fd]"></i> Sức chứa:
            </label>
            <select 
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="bg-[#0f172a] border border-white/10 p-[8px_15px] rounded-lg text-white text-xs outline-none cursor-pointer focus:border-[#8b5cf6] transition-all"
            >
              <option value="all">Tất cả sức chứa</option>
              <option value="10">Phòng nhỏ (1-3 người)</option>
              <option value="20">Phòng vừa (3-5 người)</option>
              <option value="30">Phòng lớn (5-10 người)</option>
            </select>
          </div>
        </div>
      </div>

      {/* GRID HIỂN THỊ DANH SÁCH CARD PHÒNG */}
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
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}