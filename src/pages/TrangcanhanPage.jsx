import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookingHistory, getProfile, updateProfile } from '@/services/api';

export default function TrangcanhanPage() {
  const [tab, setTab] = useState('history');
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      setProfile(p);
      setNameDraft(p.name);
      setHistory(await getBookingHistory());
    })();
  }, []);

  const visibleHistory = useMemo(() => history.slice(0, 6), [history]);

  if (!profile) return <div className="min-h-screen bg-[#0b0f1a] text-white p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-72 space-y-4">
          <div className="glass-card rounded-2xl p-5 text-center">
            <img
              src={profile.avatar}
              className="w-20 h-20 rounded-full mx-auto border border-white/20"
            />
            <h2 className="mt-3 font-bold text-lg">{profile.name}</h2>
            <p className="text-xs text-gray-400">{profile.phone}</p>
            <p className="mt-3 text-sm">
              Điểm: <b>{profile.points.toLocaleString()}</b>
            </p>
            <button
              onClick={() => setEditing(true)}
              className="mt-3 px-3 py-1 rounded-lg bg-mb-purple-600 hover:bg-mb-purple-500 text-xs"
            >
              Sửa thông tin
            </button>
          </div>
          <button
            onClick={() => setTab('history')}
            className={`w-full py-3 rounded-xl text-sm font-bold ${tab === 'history' ? 'bg-mb-purple-600' : 'bg-white/10'}`}
          >
            Lịch sử thuê phòng
          </button>
          <Link
            to="/"
            className="block w-full py-3 rounded-xl text-center text-sm font-bold bg-white/10"
          >
            Về trang chủ
          </Link>
        </aside>

        <main className="flex-1">
          {tab === 'history' && (
            <div className="space-y-3">
              {visibleHistory.map((h) => (
                <div key={h.id} className="glass-card rounded-xl p-3 flex items-center gap-3">
                  <img src={h.image} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-bold">
                      {h.roomName} - {h.customerName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {h.date} | {h.time} | {h.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(h)}
                    className="px-3 py-1 rounded bg-white/10 text-xs"
                  >
                    Chi tiết
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b33] border border-white/10 rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-lg">Sửa thông tin</h3>
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              className="w-full bg-white/10 rounded-xl px-3 py-2"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-2 rounded-xl bg-white/10"
              >
                Hủy
              </button>
              <button
                onClick={async () => {
                  const p = await updateProfile({ name: nameDraft });
                  setProfile(p);
                  setEditing(false);
                }}
                className="flex-1 py-2 rounded-xl bg-mb-purple-600"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-3">
            <h3 className="font-bold text-lg">Hóa đơn #{selected.id}</h3>
            <p className="text-sm">Phòng: {selected.roomName}</p>
            <p className="text-sm">Khách: {selected.customerName}</p>
            <p className="text-sm">Cọc: {selected.deposit}</p>
            <button
              onClick={() => setSelected(null)}
              className="w-full py-2 rounded-xl bg-white text-slate-900 font-bold"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


