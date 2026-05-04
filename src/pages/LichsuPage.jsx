import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { cancelBooking, getBookingHistory } from '@/services/api';

export default function LichsuPage() {
  const [rows, setRows] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    getBookingHistory().then(setRows);
  }, []);

  const filtered = useMemo(
    () => rows.filter((r) => (tab === 'all' ? true : r.status === tab)),
    [rows, tab]
  );

  const onCancel = async (id) => {
    await cancelBooking(id);
    setRows(await getBookingHistory());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] text-white p-8 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Lịch sử đặt phòng</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <div className="flex gap-2">
        {['all', 'pending', 'completed', 'cancelled'].map((x) => (
          <button
            key={x}
            onClick={() => setTab(x)}
            className={`px-4 py-2 rounded-xl text-sm ${tab === x ? 'bg-mb-purple-600' : 'bg-white/10'}`}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((b) => (
          <div key={b.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center">
            <img src={b.image} className="w-36 h-24 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-bold">
                {b.roomName} - {b.customerName}
              </p>
              <p className="text-sm text-gray-300">
                {b.date} {b.time} | {b.duration} | Cọc: {b.deposit}
              </p>
            </div>
            <div className="text-right space-y-2">
              <p className="text-xs uppercase text-gray-300">{b.status}</p>
              {b.status === 'pending' && (
                <button
                  onClick={() => onCancel(b.id)}
                  className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs"
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


