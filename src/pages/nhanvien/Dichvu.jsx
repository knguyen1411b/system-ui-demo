import { useState, useEffect } from 'react';

export default function DichVu() {
  // Trạng thái thời gian thực
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [currentDate, setCurrentDate] = useState('Chủ Nhật, 03/05/2026');

  // Quản lý dữ liệu danh sách dịch vụ các phòng (Chuyển từ HTML sang State)
  const [roomsData, setRoomsData] = useState([
    {
      roomId: '402',
      requestsCount: 2,
      items: [
        {
          id: 'P402-Bia',
          name: 'Bia Heineken (Lon)',
          category: 'Đồ uống',
          img: 'https://yumbiltong.com/cdn/shop/files/Heineken330ml5_acl.png?v=1745140579&width=1946',
          quantity: '06',
          time: '21:15',
          date: '03/05/2026',
          status: 'Chờ xử lý',
        },
        {
          id: 'P402-TraiCay',
          name: 'Trái cây thập cẩm',
          category: 'Món ăn',
          img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=100',
          quantity: '01',
          time: '21:20',
          date: '03/05/2026',
          status: 'Chờ xử lý',
        }
      ]
    },
    {
      roomId: '305',
      requestsCount: 1,
      items: [
        {
          id: 'P305-NuocSuoi',
          name: 'Nước suối Aquafina',
          category: 'Đồ uống',
          img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=100',
          quantity: '03',
          time: '21:45',
          date: '03/05/2026',
          status: 'Chờ xử lý',
        }
      ]
    }
  ]);

  // --- EFFECT: ĐỒNG HỒ THỜI GIAN THỰC ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('vi-VN', { hour12: false });
      const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
      const dateStr = now.toLocaleDateString('vi-VN', options);

      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateTime(); // Chạy ngay lập tức lần đầu
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId); // Cleanup khi unmount
  }, []);

  const handleStatusChange = (roomId, itemId, newStatus) => {
    setRoomsData(prevData =>
      prevData.map(room => {
        if (room.roomId === roomId) {
          return {
            ...room,
            items: room.items.map(item =>
              item.id === itemId ? { ...item, status: newStatus } : item
            )
          };
        }
        return room;
      })
    );
  };

  const handleSave = (roomLabel, itemLabel) => {
    alert(`Đã cập nhật trạng thái: P${roomLabel} - ${itemLabel}`);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* --- NỘI DUNG CHÍNH --- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent">
          TIẾP NHẬN DỊCH VỤ
        </h1>
        <div className="border-l-4 border-[#8b5cf6] pl-4 text-left sm:text-right">
          <span className="block text-xl font-bold font-mono text-orange-400 tracking-wider">{currentTime}</span>
          <span className="text-xs text-slate-400 font-medium">{currentDate}</span>
        </div>
      </header>

      {/* VÙNG LẶP DANH SÁCH CÁC CARD PHÒNG */}
      <div className="space-y-6">
        {roomsData.map((room) => (
          <section
            key={room.roomId}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[#8b5cf6]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2.5 text-orange-400 font-bold text-lg tracking-wide">
                <i className="fas fa-microphone-alt"></i>
                <span>PHÒNG {room.roomId}</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-[#8b5cf6]/10 border border-[#8b5cf6] rounded-full text-[#c4b5fd]">
                {room.requestsCount < 10 ? `0${room.requestsCount}` : room.requestsCount} yêu cầu mới
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Sản phẩm</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Số lượng</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Thời gian yêu cầu</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {room.items.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <img src={item.img} className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-inner" alt={item.name} />
                          <div className="flex flex-col">
                            <b className="text-sm font-semibold text-slate-100">{item.name}</b>
                            <span className="text-xs text-slate-400">{item.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-base font-bold text-[#c4b5fd] font-mono">{item.quantity}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col font-mono">
                          <span className="text-sm font-semibold text-white">{item.time}</span>
                          <span className="text-[11px] text-slate-400">{item.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(room.roomId, item.id, e.target.value)}
                          className="bg-[#1e293b] text-white border border-white/10 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-[#8b5cf6] cursor-pointer"
                        >
                          <option value="Chờ xử lý" className="bg-[#1e1b4b]">Chờ xử lý</option>
                          <option value="Đã giao" className="bg-[#1e1b4b]">Đã giao</option>
                          <option value="Hủy" className="bg-[#1e1b4b]">Hủy</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleSave(room.roomId, item.name)}
                          className="bg-[#8b5cf6] hover:bg-[#6d28d9] text-white px-5 py-1.5 rounded-lg text-xs font-bold tracking-wider border border-[#8b5cf6] transition-all duration-200 active:scale-95 shadow-lg shadow-[#8b5cf6]/10"
                        >
                          LƯU
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      {/* CSS Nhúng phục vụ chuyển động mượt của menu con */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}