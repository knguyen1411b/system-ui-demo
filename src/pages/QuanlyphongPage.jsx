import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createRoom, deleteRoom, getManagedRooms, updateRoom } from '@/services/api';

const emptyForm = { code: '', name: '', type: 'Thường', status: 'Trống' };

export default function QuanlyphongPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => setRows(await getManagedRooms());
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (type === 'all' || r.type === type) &&
          (status === 'all' || r.status === status) &&
          `${r.code} ${r.name}`.toLowerCase().includes(q.toLowerCase())
      ),
    [rows, q, type, status]
  );

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) await updateRoom(editingId, form);
    else await createRoom(form);
    setForm(emptyForm);
    setEditingId(null);
    await load();
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Quản lý phòng</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <form
        onSubmit={submit}
        className="glass-card rounded-2xl p-4 grid grid-cols-1 md:grid-cols-5 gap-3"
      >
        <input
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          placeholder="Mã phòng"
          className="bg-white/10 rounded-xl px-3 py-2"
        />
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Tên phòng"
          className="bg-white/10 rounded-xl px-3 py-2"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="bg-white/10 rounded-xl px-3 py-2"
        >
          <option>Thường</option>
          <option>VIP</option>
        </select>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="bg-white/10 rounded-xl px-3 py-2"
        >
          <option>Trống</option>
          <option>Đang hoạt động</option>
        </select>
        <button className="bg-mb-purple-600 rounded-xl py-2 font-bold">
          {editingId ? 'Cập nhật' : 'Thêm phòng'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm kiếm..."
          className="bg-white/10 rounded-xl px-3 py-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white/10 rounded-xl px-3 py-2"
        >
          <option value="all">Tất cả loại</option>
          <option value="Thường">Thường</option>
          <option value="VIP">VIP</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-white/10 rounded-xl px-3 py-2"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="Trống">Trống</option>
          <option value="Đang hoạt động">Đang hoạt động</option>
        </select>
      </div>

      <div className="glass-card rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400">
              <th className="p-4">Mã</th>
              <th className="p-4">Tên</th>
              <th className="p-4">Loại</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-4">{r.code}</td>
                <td className="p-4">{r.name}</td>
                <td className="p-4">{r.type}</td>
                <td className="p-4">{r.status}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(r.id);
                      setForm({ code: r.code, name: r.name, type: r.type, status: r.status });
                    }}
                    className="px-2 py-1 rounded bg-blue-600 text-xs"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={async () => {
                      await deleteRoom(r.id);
                      await load();
                    }}
                    className="px-2 py-1 rounded bg-rose-600 text-xs"
                  >
                    Xóa
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


