import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableRoomsForRent, rentRoom } from '@/services/api';

export default function ThuephongPage() {
  const [rooms, setRooms] = useState([]);
  const [openId, setOpenId] = useState('');
  const [phones, setPhones] = useState({});

  useEffect(() => {
    getAvailableRoomsForRent().then(setRooms);
  }, []);

  const onRent = async (id) => {
    await rentRoom(id, phones[id]);
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Đang bận' } : r)));
    setOpenId('');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Thuê phòng</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((r) => (
          <div key={r.id} className="glass-card rounded-2xl overflow-hidden">
            <img src={r.image} className="w-full h-44 object-cover" />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{r.code}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded ${r.status === 'Trống' ? 'bg-emerald-600/20 text-emerald-300' : 'bg-rose-600/20 text-rose-300'}`}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {r.type} • Ngày thường {r.priceWeekday.toLocaleString('vi-VN')}đ/h • Cuối tuần{' '}
                {r.priceWeekend.toLocaleString('vi-VN')}đ/h
              </p>

              {r.status === 'Trống' && openId !== r.id && (
                <button
                  onClick={() => setOpenId(r.id)}
                  className="w-full py-2 rounded-xl border border-mb-purple-500 text-mb-purple-300 hover:bg-mb-purple-600 hover:text-white"
                >
                  Thuê phòng ngay
                </button>
              )}

              {openId === r.id && (
                <div className="space-y-2">
                  <input
                    value={phones[r.id] || ''}
                    onChange={(e) => setPhones((p) => ({ ...p, [r.id]: e.target.value }))}
                    placeholder="Số điện thoại khách (không bắt buộc)"
                    className="w-full bg-slate-900 border border-white/20 rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={() => onRent(r.id)}
                    className="w-full py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500"
                  >
                    Xác nhận thuê
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


