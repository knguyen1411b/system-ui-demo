import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPriceRule, getPriceRules, updatePriceRule } from '@/services/api';

const emptyForm = {
  slotName: '',
  fromHour: 8,
  toHour: 12,
  dayType: 'Ngày thường',
  roomType: 'VIP',
  price: 150000,
};

export default function QuanlybanggiaPage() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => setRows(await getPriceRules());
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) await updatePriceRule(editingId, form);
    else await createPriceRule(form);
    setEditingId(null);
    setForm(emptyForm);
    await load();
  };

  const grouped = useMemo(() => rows, [rows]);

  return (
    <div className="min-h-screen bg-[#0f1424] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Quản lý bảng giá</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <form
        onSubmit={submit}
        className="glass-card rounded-2xl p-4 grid grid-cols-1 md:grid-cols-6 gap-2"
      >
        <input
          value={form.slotName}
          onChange={(e) => setForm({ ...form, slotName: e.target.value })}
          placeholder="Tên khung giờ"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          type="number"
          step="0.25"
          value={form.fromHour}
          onChange={(e) => setForm({ ...form, fromHour: Number(e.target.value) })}
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          type="number"
          step="0.25"
          value={form.toHour}
          onChange={(e) => setForm({ ...form, toHour: Number(e.target.value) })}
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <select
          value={form.dayType}
          onChange={(e) => setForm({ ...form, dayType: e.target.value })}
          className="bg-white/10 rounded-lg px-2 py-2"
        >
          <option>Ngày thường</option>
          <option>Cuối tuần</option>
          <option>Ngày lễ</option>
        </select>
        <select
          value={form.roomType}
          onChange={(e) => setForm({ ...form, roomType: e.target.value })}
          className="bg-white/10 rounded-lg px-2 py-2"
        >
          <option>VIP</option>
          <option>Thường</option>
        </select>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <button className="md:col-span-2 bg-mb-purple-600 rounded-lg py-2 font-bold">
          {editingId ? 'Cập nhật giá' : 'Thêm khung giá'}
        </button>
      </form>

      <div className="glass-card rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3">Mã</th>
              <th className="p-3">Tên khung giờ</th>
              <th className="p-3">Từ</th>
              <th className="p-3">Đến</th>
              <th className="p-3">Loại ngày</th>
              <th className="p-3">Loại phòng</th>
              <th className="p-3 text-right">Giá/Giờ</th>
              <th className="p-3 text-center">Sửa</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-3 font-mono text-purple-300">{r.code}</td>
                <td className="p-3">{r.slotName}</td>
                <td className="p-3 text-center">{r.fromHour}</td>
                <td className="p-3 text-center">{r.toHour}</td>
                <td className="p-3">{r.dayType}</td>
                <td className="p-3">{r.roomType}</td>
                <td className="p-3 text-right font-bold">{r.price.toLocaleString('vi-VN')}đ</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => {
                      setEditingId(r.id);
                      setForm({
                        slotName: r.slotName,
                        fromHour: r.fromHour,
                        toHour: r.toHour,
                        dayType: r.dayType,
                        roomType: r.roomType,
                        price: r.price,
                      });
                    }}
                    className="px-2 py-1 rounded bg-blue-600 text-xs"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


