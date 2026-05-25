import { useState } from 'react';

export default function QuanLyLoaiPhong() {
  // Khởi tạo dữ liệu mẫu dựa trên giao diện cũ của bạn
  const [roomTypes, setRoomTypes] = useState([
    {
      id: 1,
      name: 'VIP',
      capacity: 15,
      deposit: '200.000đ',
      description: 'Phòng VIP với dàn âm thanh 7.1 cực đỉnh, hệ thống đèn laser theo nhạc và ghế massage cho khách chờ. Không gian sang trọng, riêng tư.',
      typeClass: 'from-yellow-400/10 text-yellow-400 bg-amber-400/20 text-amber-500'
    },
    {
      id: 2,
      name: 'Thường',
      capacity: 8,
      deposit: '100.000đ',
      description: 'Phòng hát tiêu chuẩn, sạch sẽ, âm thanh trung thực. Phù hợp cho nhóm bạn sinh viên và gia đình.',
      typeClass: 'from-purple-400/10 text-purple-400 bg-purple-400/20 text-purple-400'
    }
  ]);

  // Các hàm xử lý sự kiện hành động
  const handleCreate = () => {
    alert('Chức năng "Tạo loại mới" đang được phát triển hoặc mở Modal.');
  };

  const handleEdit = (id) => {
    alert(`Chỉnh sửa loại phòng có ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa loại phòng này?')) {
      setRoomTypes(roomTypes.filter(room => room.id !== id));
    }
  };

  return (
    <div className="bg-[#0f172a] text-slate-200 p-8 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Quản lý Loại Phòng</h1>
          <p className="text-gray-500 mt-2 font-medium">Thiết lập giá và thông số kỹ thuật cho phòng hát</p>
        </div>

        <button 
          onClick={handleCreate}
          className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-purple-600/20 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Tạo loại mới
        </button>
      </header>

      {/* Grid danh sách loại phòng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomTypes.map((room) => {
          // Tách class để render phù hợp với từng loại phòng VIP/Thường
          const isVip = room.name.toLowerCase() === 'vip';
          
          return (
            <div
              key={room.id}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2.5rem] overflow-hidden flex flex-col group transition-all hover:border-purple-500/50 hover:bg-white/5"
            >
              {/* Card Header Top */}
              <div className={`flex flex-col items-center p-6 bg-gradient-to-br ${isVip ? 'from-yellow-400/10' : 'from-purple-400/10'} to-transparent`}>
                <span className={`text-2xl font-extrabold uppercase mb-2 ${isVip ? 'text-yellow-400' : 'text-purple-400'}`}>
                  {room.name}
                </span>
                <span className="text-lg font-bold text-white mb-1">
                  Sức chứa: {room.capacity} người
                </span>
                <span className={`inline-block font-bold rounded-xl px-4 py-2 text-xl mb-2 ${isVip ? 'bg-amber-400/20 text-amber-500' : 'bg-purple-400/20 text-purple-400'}`}>
                  Cọc: {room.deposit}
                </span>
              </div>

              {/* Card Body & Actions */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-300 text-sm mb-4">
                  {room.description}
                </p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(room.id)}
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase transition-all text-white"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-xs font-bold uppercase transition-all"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}