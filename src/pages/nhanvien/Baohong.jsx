import { useState, useEffect } from 'react';

export default function BaoHong() {
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [currentDate, setCurrentDate] = useState('---');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');

  const [incidents, setIncidents] = useState([
    {
      id: 'incident-1',
      room: 'P101',
      content: 'Micro bên trái không lên tiếng dù đã thay pin mới. Khách đang cần gấp.',
      time: '14:20',
      date: '03/05/2026',
      status: 'Chờ tiếp nhận'
    },
    {
      id: 'incident-2',
      room: 'P302',
      content: 'Loa sub có hiện tượng rè khi mở âm lượng lớn. Cần kỹ thuật kiểm tra dây cáp.',
      time: '14:45',
      date: '03/05/2026',
      status: 'Chờ tiếp nhận'
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

    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
  };

  const handleSave = (room) => {
    alert(`Đã lưu trạng thái cho ${room}`);
  };

  // --- FILTER LOGIC ---
  const filteredIncidents = incidents.filter(item => {
    const matchesSearch = item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tất cả' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#1e1b4b] p-4 sm:p-6 lg:p-8 text-white font-sans antialiased selection:bg-[#8b5cf6] selection:text-white">
      {/* CONTAINER CHÍNH BỌC NỘI DUNG (Fix lỗi layout tràn/ép dòng) */}
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-[30px]">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent uppercase">
          Tiếp Nhận Báo Hỏng
        </h1>
        <div className="border-l-4 border-[#8b5cf6] pl-[15px] text-left sm:text-right">
          <span className="block text-2xl font-bold text-[#fb923c] font-mono tracking-wide">{currentTime}</span>
          <span className="text-xs text-[#94a3b8] uppercase">{currentDate}</span>
        </div>
      </div>

      {/* --- NAVBAR FILTER (GLASSMORPHISM) --- */}
      <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-[25px] flex flex-col sm:flex-row gap-[15px]">
        <div className="relative flex-[3]">
          {/* Thêm icon search nếu dùng FontAwesome, nếu không icon sẽ là khoảng trống */}
          <span className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#c4b5fd]">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Tìm số phòng hoặc nội dung báo hỏng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/20 border border-white/10 py-3 pl-[45px] pr-4 rounded-xl text-white text-sm outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
          />
        </div>

        <select
          className="flex-1 bg-[#1e293b]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl text-white text-sm outline-none cursor-pointer focus:border-[#8b5cf6] transition-all"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Tất cả" className="bg-[#1e1b4b]">Trạng thái: Tất cả</option>
          <option value="Chờ tiếp nhận" className="bg-[#1e1b4b]">Chờ tiếp nhận</option>
          <option value="Đang xử lý" className="bg-[#1e1b4b]">Đang xử lý</option>
          <option value="Đã hoàn thành" className="bg-[#1e1b4b]">Đã hoàn thành</option>
        </select>
      </div>

      {/* --- BẢNG DANH SÁCH SỰ CỐ (GLASSMORPHISM) --- */}
      <div className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-[20px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.05] border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-bold text-[#c4b5fd] uppercase tracking-wider">Phòng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#c4b5fd] uppercase tracking-wider max-w-[400px]">Nội dung báo hỏng</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#c4b5fd] uppercase tracking-wider">Thời gian yêu cầu</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#c4b5fd] uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-[#c4b5fd] uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#fb923c] font-extrabold text-base tracking-wide">{item.room}</span>
                    </td>
                    <td className="px-6 py-4 text-sm leading-relaxed max-w-[400px] text-[#f1f5f9]">
                      {item.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col font-mono">
                        <span className="font-semibold text-white text-sm">{item.time}</span>
                        <span className="text-[11px] text-[#94a3b8]">{item.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className="bg-[#1e293b]/90 border border-white/10 px-3 py-2 rounded-lg text-xs outline-none cursor-pointer focus:border-[#8b5cf6] transition-colors"
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      >
                        <option value="Chờ tiếp nhận" className="bg-[#1e1b4b]">Chờ tiếp nhận</option>
                        <option value="Đang xử lý" className="bg-[#1e1b4b]">Đang xử lý</option>
                        <option value="Đã hoàn thành" className="bg-[#1e1b4b]">Đã hoàn thành</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        className="bg-[#8b5cf6] hover:bg-[#6d28d9] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-[#8b5cf6]/20 hover:-translate-y-0.5 active:translate-y-0"
                        onClick={() => handleSave(item.room)}
                      >
                        LƯU
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-[#94a3b8]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-base">Không tìm thấy dữ liệu báo hỏng nào phù hợp.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* CSS Animation phong nền */}
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