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
  const [selectedQR, setSelectedQR] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedQRIds, setSelectedQRIds] = useState(new Set());

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      setProfile(p);
      setNameDraft(p.name);
      setHistory(await getBookingHistory());
    })();
  }, []);

  const visibleHistory = useMemo(() => history.slice(0, 6), [history]);
  const pendingBookings = useMemo(() => history.filter(h => h.status === 'pending'), [history]);
  const completedBookings = useMemo(() => history.filter(h => h.status === 'completed'), [history]);

  // Generate simple QR code placeholder (in production, use a QR library)
  const generateQRCode = (text) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  };

  const handleQRToggle = (id) => {
    const newSelected = new Set(selectedQRIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedQRIds(newSelected);
  };

  const handleSelectAllQR = () => {
    if (selectedQRIds.size === pendingBookings.length) {
      setSelectedQRIds(new Set());
    } else {
      setSelectedQRIds(new Set(pendingBookings.map(b => b.id)));
    }
  };

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
          <button
            onClick={() => setTab('qrcode')}
            className={`w-full py-3 rounded-xl text-sm font-bold ${tab === 'qrcode' ? 'bg-mb-purple-600' : 'bg-white/10'}`}
          >
            Mã QR chờ xử lý
          </button>
          <button
            onClick={() => setTab('invoice')}
            className={`w-full py-3 rounded-xl text-sm font-bold ${tab === 'invoice' ? 'bg-mb-purple-600' : 'bg-white/10'}`}
          >
            Hóa đơn hoàn thành
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

          {tab === 'qrcode' && (
            <div className="space-y-3">
              {pendingBookings.length === 0 ? (
                <div className="glass-card rounded-xl p-8 text-center text-gray-400">
                  Không có mã QR chờ xử lý
                </div>
              ) : (
                <>
                  <div className="glass-card rounded-xl p-4 flex items-center justify-between bg-white/5">
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={selectedQRIds.size === pendingBookings.length && pendingBookings.length > 0}
                        onChange={handleSelectAllQR}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className="text-sm font-semibold">
                        Chọn tất cả ({selectedQRIds.size}/{pendingBookings.length})
                      </span>
                    </label>
                    {selectedQRIds.size > 0 && (
                      <button className="px-3 py-1 rounded bg-mb-purple-600 hover:bg-mb-purple-500 text-xs font-semibold">
                        Xuất ({selectedQRIds.size})
                      </button>
                    )}
                  </div>
                  {pendingBookings.map((h) => (
                    <div
                      key={h.id}
                      className={`glass-card rounded-xl p-4 hover:bg-white/10 transition flex items-center gap-4 ${
                        selectedQRIds.has(h.id) ? 'ring-2 ring-mb-purple-500 bg-white/5' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedQRIds.has(h.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleQRToggle(h.id);
                        }}
                        className="w-5 h-5 cursor-pointer flex-shrink-0"
                      />
                      <img src={h.image} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 cursor-pointer" onClick={() => setSelectedQR(h)}>
                        <p className="font-bold">
                          {h.roomName} - {h.customerName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {h.date} | {h.time} | {h.duration}
                        </p>
                        <div className="mt-2 inline-block px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-semibold">
                          ⏱️ Chờ xử lý
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {tab === 'invoice' && (
            <div className="space-y-3">
              {completedBookings.length === 0 ? (
                <div className="glass-card rounded-xl p-8 text-center text-gray-400">
                  Không có hóa đơn hoàn thành
                </div>
              ) : (
                completedBookings.map((h) => (
                  <div key={h.id} className="glass-card rounded-xl p-4 hover:bg-white/10 transition cursor-pointer" onClick={() => setSelectedInvoice(h)}>
                    <div className="flex items-center gap-4">
                      <img src={h.image} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-bold">
                          {h.roomName} - {h.customerName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {h.date} | {h.time} | {h.duration}
                        </p>
                        <div className="mt-2 inline-block px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                          ✓ Hoàn thành
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
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

      {selectedQR && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-bold text-lg">Mã QR - {selectedQR.id}</h3>
            <div className="bg-white/10 rounded-xl p-4">
              <img 
                src={generateQRCode(`BOOKING:${selectedQR.id}:${selectedQR.roomName}:${selectedQR.customerName}`)}
                alt="QR Code"
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>
            <div className="space-y-2 bg-white/5 rounded-xl p-3">
              <p className="text-sm"><span className="text-gray-400">Phòng:</span> {selectedQR.roomName}</p>
              <p className="text-sm"><span className="text-gray-400">Khách:</span> {selectedQR.customerName}</p>
              <p className="text-sm"><span className="text-gray-400">Điện thoại:</span> {selectedQR.phone}</p>
              <p className="text-sm"><span className="text-gray-400">Ngày:</span> {selectedQR.date}</p>
              <p className="text-sm"><span className="text-gray-400">Giờ:</span> {selectedQR.time}</p>
              <p className="text-sm"><span className="text-gray-400">Thời lượng:</span> {selectedQR.duration}</p>
              <p className="text-sm"><span className="text-gray-400">Cọc:</span> {selectedQR.deposit}</p>
            </div>
            <button
              onClick={() => setSelectedQR(null)}
              className="w-full py-2 rounded-xl bg-white text-slate-900 font-bold"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Hóa đơn #{selectedInvoice.id}</h3>
              <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                ✓ Hoàn thành
              </div>
            </div>
            <div className="space-y-2 bg-white/5 rounded-xl p-4">
              <div className="pb-3 border-b border-white/10">
                <p className="text-sm font-semibold text-gray-400">Thông tin phòng</p>
              </div>
              <p className="text-sm"><span className="text-gray-400">Phòng:</span> <b>{selectedInvoice.roomName}</b></p>
              <p className="text-sm"><span className="text-gray-400">Loại:</span> {selectedInvoice.roomType}</p>
              
              <div className="py-3 border-b border-white/10 border-t">
                <p className="text-sm font-semibold text-gray-400">Thông tin khách</p>
              </div>
              <p className="text-sm"><span className="text-gray-400">Khách:</span> <b>{selectedInvoice.customerName}</b></p>
              <p className="text-sm"><span className="text-gray-400">Điện thoại:</span> {selectedInvoice.phone}</p>

              <div className="py-3 border-b border-white/10 border-t">
                <p className="text-sm font-semibold text-gray-400">Chi tiết đặt phòng</p>
              </div>
              <p className="text-sm"><span className="text-gray-400">Ngày:</span> {selectedInvoice.date}</p>
              <p className="text-sm"><span className="text-gray-400">Giờ:</span> {selectedInvoice.time}</p>
              <p className="text-sm"><span className="text-gray-400">Thời lượng:</span> {selectedInvoice.duration}</p>

              <div className="py-3 border-b border-white/10 border-t">
                <p className="text-sm font-semibold text-gray-400">Thanh toán</p>
              </div>
              <p className="text-sm font-semibold flex justify-between">
                <span>Cọc:</span> 
                <span className="text-green-400">{selectedInvoice.deposit}</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedInvoice(null)}
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


