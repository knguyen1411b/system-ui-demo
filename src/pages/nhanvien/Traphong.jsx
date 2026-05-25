import { useState, useEffect } from 'react';

// 1. DỮ LIỆU GỐC ĐÃ ĐƯỢC THÊM GIỜ VÀO / GIỜ RA CỦA TỪNG PHÒNG
const INITIAL_ROOMS = [
  {
    id: '402',
    type: 'VIP',
    customerName: 'Nguyễn Quốc Đạt',
    phone: '0905 123 456',
    duration: '02 giờ 30 phút',
    timeIn: '14:00',
    timeOut: '16:30',
    services: 'Bia Tiger (6 lon), Trái cây đĩa lớn, Snack Oishi (3 gói).',
    subtotal: 720000,
    items: [
      { name: 'Giờ hát (Phòng VIP)', quantity: 2.5, price: 150000, total: 375000 },
      { name: 'Bia Tiger', quantity: 6, price: 25000, total: 150000 },
      { name: 'Trái cây đĩa (Lớn)', quantity: 1, price: 150000, total: 150000 },
      { name: 'Snack Oishi', quantity: 3, price: 15000, total: 45000 }
    ]
  },
  {
    id: '105',
    type: 'Thường',
    customerName: 'Trần Hoàng Long',
    phone: '0935 999 888',
    duration: '01 giờ 15 phút',
    timeIn: '15:15',
    timeOut: '16:30',
    services: 'Nước suối (2 chai), Hạt hướng dương (1 đĩa).',
    subtotal: 137000, // Đã cập nhật lại đúng tổng số tiền (92k + 30k + 15k)
    items: [
      { name: 'Giờ hát (Phòng Thường)', quantity: 1.15, price: 80000, total: 92000 },
      { name: 'Nước suối', quantity: 2, price: 15000, total: 30000 },
      { name: 'Hạt hướng dương', quantity: 1, price: 15000, total: 15000 }
    ]
  }
];

export default function TraPhongPage() {
  const [rooms] = useState(INITIAL_ROOMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Bộ lọc danh sách phòng
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.id.includes(searchQuery) || room.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = roomTypeFilter === '' || room.type.toLowerCase() === roomTypeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      
      {/* Tiêu đề trang con */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-white border-l-4 border-[#8b5cf6] pl-4 uppercase tracking-wider drop-shadow-md">
          Danh Sách Phòng Đang Hát
        </h1>
      </div>

      {/* --- THANH BỘ LỌC (FILTER BAR) --- */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 backdrop-blur-md shadow-lg">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4b5fd]">
            <i className="fas fa-search"></i>
          </span>
          <input 
            type="text" 
            placeholder="Tìm theo tên khách hoặc số phòng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/10 pl-11 pr-4 py-3 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition"
          />
        </div>
        <select 
          value={roomTypeFilter}
          onChange={(e) => setRoomTypeFilter(e.target.value)}
          className="bg-[#1e1b4b] border border-white/10 px-4 py-3 rounded-xl text-[#c4b5fd] text-sm outline-none cursor-pointer focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 min-w-full sm:min-w-[200px] transition"
        >
          <option value="" className="bg-[#1e1b4b]">Tất cả loại phòng</option>
          <option value="thường" className="bg-[#1e1b4b]">Phòng thường</option>
          <option value="vip" className="bg-[#1e1b4b]">Phòng VIP</option>
        </select>
      </div>

      {/* --- LƯỚI DANH SÁCH PHÒNG --- */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
          <i className="fas fa-folder-open text-4xl text-[#c4b5fd]/40 mb-3 block"></i>
          <p className="text-slate-400 text-sm">Không tìm thấy phòng nào phù hợp.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredRooms.map(room => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onSelect={() => setSelectedRoom(room)} 
            />
          ))}
        </div>
      )}

      {/* --- MODAL HÓA ĐƠN ĐỒNG BỘ MÀU TỐI --- */}
      {selectedRoom && (
        <InvoiceModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}
    </div>
  );
}

// ==========================================
// COMPONENT: THẺ PHÒNG ĐANG HÁT (ROOM CARD)
// ==========================================
function RoomCard({ room, onSelect }) {
  return (
    <div className="bg-white/5 border border-white/10 hover:border-[#8b5cf6] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(139,92,246,0.2)] flex flex-col justify-between backdrop-blur-md relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#8b5cf6]/10 rounded-full blur-2xl group-hover:bg-[#8b5cf6]/20 transition-all duration-300 pointer-events-none"></div>
      
      <div>
        <div className="flex justify-between items-center mb-5 relative z-10">
          <span className="bg-[#8b5cf6] text-white px-3 py-1 rounded-lg font-extrabold text-xs tracking-wider shadow-sm">
            PHÒNG {room.id} - {room.type}
          </span>
          <span className="text-red-400 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
            <i className="fas fa-microphone-alt"></i> Đang hát
          </span>
        </div>
        
        <div className="space-y-3 mb-5 text-sm relative z-10">
          <div className="text-slate-300 flex items-center gap-2.5">
            <i className="fas fa-user w-4 text-[#c4b5fd] text-center"></i> 
            <span>Khách hàng: <strong className="text-white font-semibold">{room.customerName}</strong></span>
          </div>
          <div className="text-slate-300 flex items-center gap-2.5">
            <i className="fas fa-phone w-4 text-[#c4b5fd] text-center"></i> 
            <span>SĐT: <strong className="text-white font-semibold">{room.phone}</strong></span>
          </div>
          <div className="text-slate-300 flex items-center gap-2.5">
            <i className="fas fa-hourglass-half w-4 text-[#c4b5fd] text-center"></i> 
            <span>Đã dùng: <strong className="text-[#c4b5fd] font-bold">{room.duration}</strong></span>
          </div>
        </div>

        <div className="bg-black/20 border-l-4 border-orange-500 p-3.5 rounded-r-xl mb-6">
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-slate-200 block mb-1 font-bold">Dịch vụ đang dùng:</strong>
            {room.services}
          </p>
        </div>
      </div>

      <button 
        onClick={onSelect}
        className="w-full bg-[#8b5cf6] hover:bg-[#6d28d9] active:scale-[0.98] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-[#8b5cf6]/20"
      >
        <i className="fas fa-file-invoice-dollar"></i> THANH TOÁN NGAY
      </button>
    </div>
  );
}

// ==========================================
// COMPONENT: MODAL HÓA ĐƠN (INVOICE MODAL)
// ==========================================
function InvoiceModal({ room, onClose }) {
  const [points, setPoints] = useState(0);
  const [qrUrl, setQrUrl] = useState('');

  const discountAmount = points * 10;
  const finalPayAmount = Math.max(0, room.subtotal - discountAmount);

  useEffect(() => {
    const rawPayload = `https://musicbox.com/pay?amount=${finalPayAmount}&room=${room.id}`;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(rawPayload)}`);
  }, [finalPayAmount, room.id]);

  const handlePointsChange = (val) => {
    const enteredPoints = parseInt(val) || 0;
    if (enteredPoints < 0) return setPoints(0);
    
    if (enteredPoints * 10 > room.subtotal) {
      setPoints(Math.floor(room.subtotal / 10));
    } else {
      setPoints(enteredPoints);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex justify-center items-center p-2 sm:p-4 overflow-y-auto">
      
      <div className="bg-[#1e1b4b]/90 border border-white/10 text-white w-full max-w-[550px] p-5 sm:p-8 rounded-2xl shadow-[0_25px_50px_-12px_rgba(139,92,246,0.3)] backdrop-blur-xl max-h-[92vh] overflow-y-auto transform transition-all animate-in fade-in zoom-in-95 duration-200 print:absolute print:inset-0 print:bg-white print:text-black print:p-0 print:max-h-none print:shadow-none print:border-none">
        
        {/* Header Bill */}
        <div className="text-center mb-6 border-b-2 border-white/20 pb-4 print:border-slate-800">
          <h2 className="text-xl font-black text-white tracking-wider print:text-black">HÓA ĐƠN THANH TOÁN</h2>
          <p className="text-xs text-[#c4b5fd] font-semibold uppercase mt-1 print:text-slate-600">MusicBox Karaoke - Chất Lượng Đỉnh Cao</p>
          <p className="text-[11px] text-slate-400 print:text-slate-500">Đ/C: Quận Liên Chiểu, TP. Đà Nẵng</p>
        </div>

        {/* Khách hàng Info - ĐÃ TÍCH HỢP DATA GIỜ VÀO GIỜ RA ĐỘNG */}
        <div className="mb-5 text-sm space-y-2 border-b border-dashed border-white/10 pb-4 print:border-slate-300 print:text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p><span className="text-slate-400 print:text-slate-500">Khách hàng:</span> <b className="text-white print:text-black">{room.customerName}</b></p>
            <p><span className="text-slate-400 print:text-slate-500">Số điện thoại:</span> <b className="text-white print:text-black">{room.phone}</b></p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-white/5 print:border-slate-100">
            <p><span className="text-slate-400 print:text-slate-500">Phòng:</span> <b className="text-[#c4b5fd] print:text-black">{room.id} ({room.type})</b></p>
            <p><span className="text-slate-400 print:text-slate-500">Ngày thanh toán:</span> <b className="text-white print:text-black">03/05/2026</b></p>
          </div>

          {/* Khối hiển thị thời gian linh hoạt trích xuất từ State */}
          <div className="grid grid-cols-3 gap-2 pt-2 mt-1 text-xs bg-black/20 p-2.5 rounded-xl border border-white/5 print:bg-slate-50 print:border-slate-200 print:text-black">
            <div className="text-center border-r border-white/10 print:border-slate-200">
              <span className="text-slate-400 block mb-0.5 print:text-slate-500">Giờ vào</span>
              <b className="text-emerald-400 font-bold text-sm print:text-black">{room.timeIn}</b>
            </div>
            <div className="text-center border-r border-white/10 print:border-slate-200">
              <span className="text-slate-400 block mb-0.5 print:text-slate-500">Giờ ra</span>
              <b className="text-rose-400 font-bold text-sm print:text-black">{room.timeOut}</b>
            </div>
            <div className="text-center">
              <span className="text-slate-400 block mb-0.5 print:text-slate-500">Tổng thời gian</span>
              <b className="text-[#c4b5fd] font-bold text-sm print:text-black">{room.duration}</b>
            </div>
          </div>
        </div>

        {/* Bảng kê chi tiết dịch vụ */}
        <div className="w-full overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse text-sm min-w-[420px]">
            <thead>
              <tr className="border-b border-white/20 print:border-slate-300">
                <th className="py-2.5 text-xs font-bold text-[#c4b5fd] uppercase print:text-slate-500">Nội dung</th>
                <th className="py-2.5 text-center text-xs font-bold text-[#c4b5fd] uppercase w-12 print:text-slate-500">SL</th>
                <th className="py-2.5 text-right text-xs font-bold text-[#c4b5fd] uppercase w-24 print:text-slate-500">Đơn giá</th>
                <th className="py-2.5 text-right text-xs font-bold text-[#c4b5fd] uppercase w-24 print:text-slate-500">T.Tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 print:divide-slate-100">
              {room.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors print:hover:bg-transparent">
                  <td className="py-3 text-slate-200 font-medium print:text-slate-800">{item.name}</td>
                  <td className="py-3 text-center font-semibold text-white print:text-black">{item.quantity}</td>
                  <td className="py-3 text-right text-slate-300 print:text-slate-600">{item.price.toLocaleString('vi-VN')}</td>
                  <td className="py-3 text-right font-bold text-[#c4b5fd] print:text-slate-900">{item.total.toLocaleString('vi-VN')}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Khối tính tiền - Tích điểm */}
        <div className="border-t border-white/20 pt-4 space-y-3 print:border-slate-800">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 print:text-slate-600">Tạm tính (Phòng + DV):</span>
            <b className="text-white font-bold print:text-black">{room.subtotal.toLocaleString('vi-VN')}đ</b>
          </div>
          
          <div className="flex justify-between items-center text-sm print:hidden">
            <span className="text-slate-400">Điểm tích lũy (1đ = 10đ):</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-bold">-</span>
              <input 
                type="number" 
                value={points === 0 ? '' : points}
                placeholder="0"
                min="0"
                onChange={(e) => handlePointsChange(e.target.value)}
                className="w-16 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-center font-bold text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition"
              /> 
              <span className="text-slate-400 font-medium">điểm</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-dashed border-white/10 text-base sm:text-lg font-black text-red-400 print:border-slate-300 print:text-red-600">
            <span>TỔNG THANH TOÁN:</span>
            <span className="tracking-tight text-xl sm:text-2xl text-red-400 print:text-red-600">{finalPayAmount.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        {/* QR Code động */}
        <div className="mt-6 p-4 bg-black/20 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 print:border-none print:bg-white print:mt-4">
          <span className="text-xs font-bold text-[#c4b5fd] uppercase tracking-wide print:text-slate-500">Quét mã để thanh toán</span>
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" className="w-32 h-32 sm:w-36 sm:h-36 border-4 border-white/10 bg-white p-1 shadow-md rounded-lg print:border-slate-200" />
          ) : (
            <div className="w-32 h-32 bg-white/5 animate-pulse rounded-lg"></div>
          )}
        </div>

        {/* Nút thao tác cuối */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
          <button 
            onClick={() => window.print()}
            className="w-full sm:flex-[2] bg-[#8b5cf6] hover:bg-[#6d28d9] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#8b5cf6]/20 active:scale-[0.99]"
          >
            <i className="fas fa-print"></i> IN HÓA ĐƠN
          </button>
          <button 
            onClick={onClose}
            className="w-full sm:flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-[0.99]"
          >
            ĐÓNG
          </button>
        </div>

      </div>
    </div>
  );
}