const giaCocTheoLoai = { VIP: 200, Thường: 100 };

export default function RoomCard({ room, onBook }) {
  const loaiClass =
    room.loai === 'VIP'
      ? 'text-yellow-400 bg-yellow-500/20 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]'
      : 'text-cyan-400 bg-cyan-500/10 border-cyan-400';

  const isAvailable = room.trangThai === 'Trống';

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:border-mb-purple-500 transition-all duration-300">
      <div className="relative h-44 overflow-hidden">
        <img
          src={room.img}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[9px] font-bold uppercase ${isAvailable ? 'bg-emerald-500' : 'bg-red-500'}`}
        >
          {room.trangThai}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Phòng {room.id}</h3>
          <span className={`text-[9px] font-bold px-2 py-1 rounded border ${loaiClass}`}>
            {room.loai}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 mb-3">
          <div className="bg-white/5 p-2 rounded-lg text-center">
            <p className="text-[7px] text-gray-500 uppercase">Ngày thường</p>
            <p className="text-xs font-bold">{room.gia.n}K/h</p>
          </div>
          <div className="bg-mb-purple-600/10 p-2 rounded-lg text-center border border-mb-purple-600/20">
            <p className="text-[7px] text-mb-purple-400 uppercase">Cuối tuần</p>
            <p className="text-xs font-bold text-mb-purple-400">{room.gia.c}K/h</p>
          </div>
          <div className="bg-rose-500/5 p-2 rounded-lg text-center">
            <p className="text-[7px] text-rose-400 uppercase">Ngày lễ</p>
            <p className="text-xs font-bold text-rose-400">{room.gia.l}K/h</p>
          </div>
        </div>
        <div className="mb-5">
          <div className="bg-amber-400/10 border border-amber-300 rounded px-2 py-2 text-center mb-1 min-h-[38px] flex items-center justify-center gap-1">
            <span className="text-[9px] font-semibold text-amber-500">Cọc:</span>
            <span className="text-sm font-bold text-amber-400">
              {giaCocTheoLoai[room.loai] || 0}.000đ
            </span>
          </div>
        </div>
        <button
          onClick={() => onBook(room)}
          disabled={!isAvailable}
          className={`w-full py-2.5 rounded-xl font-bold text-xs ${isAvailable ? 'bg-mb-purple-600 hover:bg-mb-purple-500 shadow-lg shadow-mb-purple-600/20' : 'bg-gray-800 text-gray-600 cursor-not-allowed'} uppercase transition-all`}
        >
          {isAvailable ? 'Đặt phòng ngay' : 'Đang phục vụ'}
        </button>
      </div>
    </div>
  );
}

