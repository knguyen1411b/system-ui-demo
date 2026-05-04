import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkoutSession, getCurrentSessions } from '@/services/api';

export default function TraphongPage() {
  const [sessions, setSessions] = useState([]);
  const [active, setActive] = useState(null);
  const [points, setPoints] = useState(0);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    getCurrentSessions().then(setSessions);
  }, []);

  const openInvoice = async (session) => {
    setActive(session);
    setPoints(0);
    setInvoice(await checkoutSession(session.id, 0));
  };

  const recalc = async (nextPoints) => {
    setPoints(nextPoints);
    if (active) setInvoice(await checkoutSession(active.id, nextPoints));
  };

  const _serviceTotal = useMemo(
    () => (active ? active.services.reduce((s, x) => s + x.qty * x.price, 0) : 0),
    [active]
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Trả phòng & thanh toán</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions.map((s) => (
          <div key={s.id} className="glass-card rounded-2xl p-5 space-y-3">
            <div className="flex justify-between">
              <h2 className="font-bold">
                {s.roomCode} - {s.roomType}
              </h2>
              <span className="text-rose-300 text-xs">ĐANG HÁT</span>
            </div>
            <p className="text-sm text-gray-300">
              Khách: {s.customerName} • {s.phone}
            </p>
            <p className="text-sm text-gray-300">Đã dùng: {s.durationHours} giờ</p>
            <div className="bg-black/20 rounded-xl p-3 text-sm text-gray-300">
              {s.services.map((x) => (
                <div key={x.id} className="flex justify-between">
                  <span>
                    {x.name} x{x.qty}
                  </span>
                  <span>{(x.qty * x.price).toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => openInvoice(s)}
              className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500"
            >
              Thanh toán ngay
            </button>
          </div>
        ))}
      </div>

      {active && invoice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-xl bg-white text-black rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-black text-center">Hóa đơn thanh toán</h3>
            <div className="text-sm space-y-1">
              <p>
                <b>Khách:</b> {active.customerName}
              </p>
              <p>
                <b>Phòng:</b> {active.roomCode}
              </p>
            </div>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Nội dung</th>
                  <th>SL</th>
                  <th className="text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Giờ hát</td>
                  <td className="text-center">{active.durationHours}</td>
                  <td className="text-right">{invoice.roomCost.toLocaleString('vi-VN')}đ</td>
                </tr>
                {active.services.map((x) => (
                  <tr key={x.id} className="border-b">
                    <td className="py-2">{x.name}</td>
                    <td className="text-center">{x.qty}</td>
                    <td className="text-right">{(x.qty * x.price).toLocaleString('vi-VN')}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <b>{invoice.subtotal.toLocaleString('vi-VN')}đ</b>
              </div>
              <div className="flex items-center justify-between">
                <span>Điểm dùng (1 điểm=1.000đ)</span>
                <input
                  type="number"
                  value={points}
                  min={0}
                  onChange={(e) => recalc(Number(e.target.value || 0))}
                  className="w-24 border rounded px-2 py-1"
                />
              </div>
              <div className="flex justify-between text-lg">
                <b>Tổng thanh toán</b>
                <b className="text-rose-600">{invoice.totalText}</b>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded bg-black text-white"
              >
                In hóa đơn
              </button>
              <button
                onClick={() => {
                  setActive(null);
                  setInvoice(null);
                }}
                className="flex-1 py-2 rounded bg-gray-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


