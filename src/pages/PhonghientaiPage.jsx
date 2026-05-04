import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  createSupportRequest,
  getCurrentRoomSession,
  getServiceCatalog,
  getSupportHistory,
  placeRoomServiceOrder,
} from '@/services/api';

export default function PhonghientaiPage() {
  const [tab, setTab] = useState('all');
  const [session, setSession] = useState(null);
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportTab, setSupportTab] = useState('new');
  const [supportNote, setSupportNote] = useState('');
  const [supportHistory, setSupportHistory] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const load = async () => {
    const [s, catalog, support] = await Promise.all([
      getCurrentRoomSession(),
      getServiceCatalog(),
      getSupportHistory(),
    ]);
    setSession(s);
    setServices(catalog);
    setSupportHistory(support);
  };

  useEffect(() => {
    load();
  }, []);

  const visibleServices = useMemo(() => {
    if (tab === 'all' || tab === 'cart') return services;
    return services.filter((x) => x.type === tab);
  }, [tab, services]);

  const addToCart = (s) => {
    setCart((prev) => {
      const i = prev.findIndex((x) => x.id === s.id);
      if (i < 0) return [...prev, { ...s, qty: 1, selected: true }];
      return prev.map((x) => (x.id === s.id ? { ...x, qty: x.qty + 1 } : x));
    });
  };

  const roomTotal = useMemo(() => {
    if (!session) return 0;
    const started = new Date(session.startedAt).getTime();
    const now = Date.now();
    const hours = Math.max(0, (now - started) / (1000 * 60 * 60));
    return Math.floor(hours * session.roomPricePerHour);
  }, [session]);

  const cartTotal = cart.filter((x) => x.selected).reduce((sum, x) => sum + x.price * x.qty, 0);

  const confirmOrder = async () => {
    const selected = cart.filter((x) => x.selected);
    if (!selected.length) return;
    await placeRoomServiceOrder(selected);
    setCart((prev) => prev.filter((x) => !x.selected));
    setConfirmOpen(false);
    await load();
  };

  const sendSupport = async () => {
    if (!supportNote.trim()) return;
    await createSupportRequest(supportNote.trim());
    setSupportNote('');
    setSupportOpen(false);
    setSupportTab('history');
    setSupportHistory(await getSupportHistory());
  };

  if (!session) return <div className="min-h-screen bg-[#0f172a] text-white p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] text-white">
      <header className="bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-mb-purple-400"
            >
              Trang chủ
            </Link>
            <span className="text-xl font-extrabold tracking-tighter">
              MUSIC<span className="text-mb-purple-400">BOX</span>
            </span>
          </div>
          <button
            onClick={() => setSupportOpen(true)}
            className="bg-rose-500/20 text-rose-400 border border-rose-500/50 px-4 py-2 rounded-lg text-xs font-bold hover:bg-rose-500 hover:text-white"
          >
            GỌI HỖ TRỢ
          </button>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 border-l-4 border-mb-purple-500">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Đang sử dụng
            </span>
            <h1 className="text-4xl font-black mt-1 uppercase">{session.roomCode}</h1>
            <p className="text-gray-400 text-xs">
              Phí dịch vụ: {session.roomPricePerHour.toLocaleString('vi-VN')}đ/h
            </p>
            <div className="bg-white/5 rounded-2xl p-5 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Khách</span>
                <span className="font-bold">{session.customerName}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Tiền phòng</span>
                <span className="text-2xl font-black text-mb-purple-400">
                  {roomTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-4">
              Lịch sử gọi dịch vụ
            </h3>
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {session.orderedServices.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mb-purple-600/20 text-mb-purple-400 flex items-center justify-center text-[10px] font-bold">
                      {item.qty}x
                    </div>
                    <div>
                      <p className="text-xs font-bold">{item.name}</p>
                      <p className="text-[9px] text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-1 rounded font-bold uppercase tracking-tighter ${item.status === 'Đã giao' ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-4 gap-2 bg-white/5 rounded-2xl p-1 border border-white/10">
            {['all', 'food', 'drink', 'cart'].map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`py-2 text-[10px] font-black uppercase tracking-widest rounded-xl ${tab === k ? 'bg-mb-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {k === 'all'
                  ? 'Tất cả'
                  : k === 'food'
                    ? 'Thức ăn'
                    : k === 'drink'
                      ? 'Đồ uống'
                      : `Giỏ hàng (${cart.length})`}
              </button>
            ))}
          </div>

          {tab !== 'cart' && (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleServices.map((s) => (
                <div key={s.id} className="glass-card rounded-2xl p-3 flex flex-col">
                  <div className="aspect-square rounded-xl overflow-hidden mb-3">
                    <img src={s.img} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-xs mb-1 line-clamp-1">{s.name}</h4>
                  <p className="text-mb-purple-400 font-bold text-xs mb-3">
                    {s.price.toLocaleString('vi-VN')}đ
                  </p>
                  <button
                    onClick={() => addToCart(s)}
                    className="w-full py-2 bg-mb-purple-600 hover:bg-mb-purple-500 rounded-xl text-[10px] font-bold uppercase"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'cart' && (
            <div className="space-y-4">
              {cart.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-gray-500">
                  Giỏ hàng đang trống.
                </div>
              )}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={(e) =>
                        setCart((prev) =>
                          prev.map((x) =>
                            x.id === item.id ? { ...x, selected: e.target.checked } : x
                          )
                        )
                      }
                    />
                    <img src={item.img} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-bold">{item.name}</p>
                      <p className="text-[10px] text-mb-purple-400 font-bold">
                        {item.price.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 rounded-xl p-1">
                    <button
                      onClick={() =>
                        setCart((prev) =>
                          prev.map((x) =>
                            x.id === item.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x
                          )
                        )
                      }
                      className="w-8 h-8"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() =>
                        setCart((prev) =>
                          prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x))
                        )
                      }
                      className="w-8 h-8"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setCart((prev) => prev.filter((x) => x.id !== item.id))}
                      className="w-8 h-8 text-rose-500"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
              {cart.length > 0 && (
                <div className="glass-card rounded-2xl p-6 border-t-4 border-mb-purple-500">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold uppercase">Tổng tiền tạm tính:</span>
                    <span className="text-2xl font-black text-mb-purple-400">
                      {cartTotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setConfirmOpen(true)}
                      disabled={!cart.some((i) => i.selected)}
                      className="bg-mb-purple-600 hover:bg-mb-purple-500 disabled:bg-gray-700 px-12 py-4 rounded-2xl font-black text-xs uppercase"
                    >
                      Xác nhận gọi món
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-sm w-full rounded-3xl p-8 text-center">
            <h3 className="text-xl font-black mb-2 uppercase">GỌI DỊCH VỤ?</h3>
            <p className="text-gray-400 text-xs mb-6">
              Món đã gọi sẽ không được hoàn trả/hủy. Xác nhận đặt món?
            </p>
            <button
              onClick={confirmOrder}
              className="w-full py-3 bg-mb-purple-600 rounded-xl font-bold uppercase text-xs mb-3"
            >
              Xác nhận
            </button>
            <button
              onClick={() => setConfirmOpen(false)}
              className="w-full py-2 text-gray-500 text-xs font-bold uppercase"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {supportOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-md w-full rounded-3xl overflow-hidden border border-white/10 bg-[#161b2e]">
            <div className="flex border-b border-white/5 bg-white/5">
              <button
                onClick={() => setSupportTab('new')}
                className={`flex-1 py-4 text-[10px] uppercase tracking-widest ${supportTab === 'new' ? 'border-b-2 border-rose-500 text-white font-bold' : 'text-gray-500'}`}
              >
                Gửi yêu cầu
              </button>
              <button
                onClick={() => setSupportTab('history')}
                className={`flex-1 py-4 text-[10px] uppercase tracking-widest ${supportTab === 'history' ? 'border-b-2 border-rose-500 text-white font-bold' : 'text-gray-500'}`}
              >
                Lịch sử
              </button>
            </div>
            <div className="p-6">
              {supportTab === 'new' && (
                <>
                  <textarea
                    value={supportNote}
                    onChange={(e) => setSupportNote(e.target.value)}
                    rows={4}
                    placeholder="Mô tả vấn đề bạn gặp phải..."
                    className="w-full bg-black/20 border border-white/10 px-4 py-3 rounded-xl text-sm text-white outline-none mb-4"
                  />
                  <button
                    onClick={sendSupport}
                    className="w-full py-3 bg-rose-500 hover:bg-rose-600 rounded-xl font-black text-xs uppercase"
                  >
                    Gửi yêu cầu ngay
                  </button>
                </>
              )}
              {supportTab === 'history' && (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {supportHistory.map((item) => (
                    <div key={item.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-gray-500">{item.time}</span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${item.statusColor}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{item.content}</p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setSupportOpen(false)}
                className="w-full mt-6 text-gray-500 hover:text-white text-[10px] font-bold uppercase"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


