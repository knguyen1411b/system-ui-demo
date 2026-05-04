import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createAccount, deleteAccount, getAccounts, updateAccount } from '@/services/api';

const emptyForm = { name: '', phone: '', role: 'Nhân viên', points: 0 };

export default function QuanlytaikhoanPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = async () => setRows(await getAccounts());
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        const matchQ = `${r.name} ${r.phone}`.toLowerCase().includes(q.toLowerCase());
        const matchRole = roleFilter === 'all' || r.role === roleFilter;
        return matchQ && matchRole;
      }),
    [rows, q, roleFilter]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpenForm(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({ name: row.name, phone: row.phone, role: row.role, points: Number(row.points || 0) });
    setOpenForm(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      phone: form.phone,
      role: form.role,
      points: form.role === 'Khách hàng' ? Number(form.points || 0) : 0,
    };
    if (editingId) await updateAccount(editingId, payload);
    else await createAccount(payload);
    setOpenForm(false);
    await load();
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Danh sách tài khoản</h2>
          <p className="text-gray-400 text-sm">Quản lý thông tin khách hàng và nội bộ</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="px-4 py-3 rounded-2xl bg-white/10 font-bold text-sm">
            Về trang chủ
          </Link>
          <button
            onClick={openCreate}
            className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-2xl font-bold text-sm"
          >
            + Thêm mới
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm theo tên, sđt..."
          className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-gray-300"
        >
          <option value="all">Tất cả vai trò</option>
          <option value="Quản lý">Quản lý</option>
          <option value="Nhân viên">Nhân viên</option>
          <option value="Khách hàng">Khách hàng</option>
        </select>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-[10px] uppercase text-gray-400 tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Thành viên</th>
              <th className="px-6 py-4">Số điện thoại</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4">Điểm</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs border border-white/20">
                      {(a.name || '?').charAt(0)}
                    </div>
                    <span className="font-bold text-gray-200">{a.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 font-mono">{a.phone}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md text-[9px] font-black uppercase border border-purple-500/50 text-purple-300 bg-purple-500/10">
                    {a.role}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-emerald-400">
                  {a.role === 'Khách hàng' ? Number(a.points || 0).toLocaleString('vi-VN') : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => setSelected(a)} className="p-2 hover:text-purple-400">
                    Chi tiết
                  </button>
                  <button onClick={() => openEdit(a)} className="p-2 hover:text-blue-400">
                    Sửa
                  </button>
                  <button
                    onClick={async () => {
                      await deleteAccount(a.id);
                      await load();
                    }}
                    className="p-2 hover:text-rose-500"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <form
            onSubmit={submit}
            className="glass-card w-full max-w-md rounded-[2.5rem] p-8 bg-[#161b33]"
          >
            <h4 className="text-xl font-bold mb-6">
              {editingId ? 'Cập nhật thành viên' : 'Thêm thành viên'}
            </h4>
            <div className="space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Họ và tên"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="Số điện thoại"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                <option value="Quản lý">Quản lý</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Khách hàng">Khách hàng</option>
              </select>
              {form.role === 'Khách hàng' && (
                <input
                  type="number"
                  value={form.points}
                  onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                  placeholder="Điểm tích lũy"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                />
              )}
            </div>
            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setOpenForm(false)}
                className="flex-1 py-3 text-sm font-bold opacity-60 hover:opacity-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-purple-600 rounded-xl text-sm font-bold hover:bg-purple-500"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-card w-full max-w-sm rounded-[2.5rem] p-8 bg-[#161b33] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-3xl font-black mb-4">
              {(selected.name || '?').charAt(0)}
            </div>
            <h4 className="text-2xl font-bold mb-1">{selected.name}</h4>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
              {selected.role}
            </p>
            <div className="space-y-3 text-left bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Số điện thoại:</span>
                <span className="font-bold">{selected.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Điểm tích lũy:</span>
                <span className="font-bold text-emerald-400">
                  {selected.role === 'Khách hàng'
                    ? `${Number(selected.points || 0).toLocaleString('vi-VN')} pts`
                    : 'Không áp dụng'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-8 w-full py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


