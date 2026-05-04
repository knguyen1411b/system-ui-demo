import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createRoomType, deleteRoomType, getRoomTypes, updateRoomType } from '@/services/api';

const emptyForm = { name: '', capacity: 8, deposit: 100000, description: '' };

export default function QuanlyloaiphongPage() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => setRows(await getRoomTypes());
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) await updateRoomType(editingId, form);
    else await createRoomType(form);
    setEditingId(null);
    setForm(emptyForm);
    await load();
  };

  return (
    <div className="min-h-screen bg-[#0f1424] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Loại Phòng</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Thiết lập giá và thông số kỹ thuật cho phòng hát
          </p>
        </div>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <form
        onSubmit={submit}
        className="glass-card rounded-2xl p-4 grid grid-cols-1 md:grid-cols-5 gap-2"
      >
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Tên loại phòng"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          type="number"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
          placeholder="Sức chứa"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          type="number"
          value={form.deposit}
          onChange={(e) => setForm({ ...form, deposit: Number(e.target.value) })}
          placeholder="Tiền cọc"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Mô tả"
          className="bg-white/10 rounded-lg px-2 py-2 md:col-span-2"
        />
        <button className="md:col-span-2 bg-mb-purple-600 rounded-lg py-2 font-bold">
          {editingId ? 'Cập nhật' : 'Tạo loại mới'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((row) => (
          <div
            key={row.id}
            className="glass-card rounded-[2rem] overflow-hidden flex flex-col border border-white/10 hover:border-mb-purple-500/50 transition-all"
          >
            <div
              className={`flex flex-col items-center p-6 ${row.name.toLowerCase() === 'vip' ? 'bg-gradient-to-br from-yellow-400/10 to-transparent' : 'bg-gradient-to-br from-purple-400/10 to-transparent'}`}
            >
              <span
                className={`text-2xl font-extrabold uppercase mb-2 ${row.name.toLowerCase() === 'vip' ? 'text-yellow-400' : 'text-purple-400'}`}
              >
                {row.name}
              </span>
              <span className="text-lg font-bold text-white mb-1">
                Sức chứa: {row.capacity} người
              </span>
              <span
                className={`inline-block font-bold rounded-xl px-4 py-2 text-xl mb-2 ${row.name.toLowerCase() === 'vip' ? 'bg-amber-400/20 text-amber-500' : 'bg-purple-400/20 text-purple-400'}`}
              >
                Cọc: {row.deposit.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-gray-300 text-sm mb-4">{row.description}</p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => {
                    setEditingId(row.id);
                    setForm({
                      name: row.name,
                      capacity: row.capacity,
                      deposit: row.deposit,
                      description: row.description,
                    });
                  }}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase"
                >
                  Sửa
                </button>
                <button
                  onClick={async () => {
                    await deleteRoomType(row.id);
                    await load();
                  }}
                  className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-xs font-bold uppercase"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


