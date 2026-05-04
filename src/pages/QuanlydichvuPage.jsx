import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createService, deleteService, getServiceCatalog, updateService } from '@/services/api';

const emptyForm = { code: '', type: 'drink', name: '', price: 0, unit: 'Phần', stock: 0, img: '' };

export default function QuanlydichvuPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [stock, setStock] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => setRows(await getServiceCatalog());
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((s) => {
        const ms =
          s.name.toLowerCase().includes(q.toLowerCase()) ||
          s.code.toLowerCase().includes(q.toLowerCase());
        const mt = type === 'all' || s.type === type;
        const mk = stock === 'all' || (stock === 'low' ? s.stock < 10 : s.stock >= 10);
        return ms && mt && mk;
      }),
    [rows, q, type, stock]
  );

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) await updateService(editingId, form);
    else await createService(form);
    setEditingId(null);
    setForm(emptyForm);
    await load();
  };

  return (
    <div className="min-h-screen bg-[#0f1424] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Quản lý dịch vụ</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <form
        onSubmit={submit}
        className="glass-card rounded-2xl p-4 grid grid-cols-1 md:grid-cols-7 gap-2"
      >
        <input
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          placeholder="Mã"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Tên dịch vụ"
          className="bg-white/10 rounded-lg px-2 py-2 md:col-span-2"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="bg-white/10 rounded-lg px-2 py-2"
        >
          <option value="drink">Đồ uống</option>
          <option value="food">Thức ăn</option>
        </select>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          placeholder="Giá"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          placeholder="Đơn vị"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          placeholder="Tồn"
          className="bg-white/10 rounded-lg px-2 py-2"
        />
        <input
          value={form.img}
          onChange={(e) => setForm({ ...form, img: e.target.value })}
          placeholder="URL ảnh"
          className="bg-white/10 rounded-lg px-2 py-2 md:col-span-3"
        />
        <button className="bg-mb-purple-600 rounded-lg py-2 font-bold md:col-span-2">
          {editingId ? 'Cập nhật' : 'Thêm dịch vụ'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm kiếm"
          className="bg-white/10 rounded-xl px-3 py-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white/10 rounded-xl px-3 py-2"
        >
          <option value="all">Tất cả loại</option>
          <option value="drink">Đồ uống</option>
          <option value="food">Thức ăn</option>
        </select>
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="bg-white/10 rounded-xl px-3 py-2"
        >
          <option value="all">Tất cả tồn kho</option>
          <option value="low">Sắp hết</option>
          <option value="instock">Còn hàng</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="glass-card rounded-2xl overflow-hidden">
            <img src={s.img} className="w-full h-28 object-cover" />
            <div className="p-3 space-y-1">
              <p className="text-[10px] text-gray-400 font-bold">{s.code}</p>
              <p className="font-bold text-sm line-clamp-2">{s.name}</p>
              <p className="text-xs text-purple-300">
                {s.price.toLocaleString('vi-VN')}đ / {s.unit}
              </p>
              <p
                className={`text-xs font-bold ${s.stock < 10 ? 'text-rose-400' : 'text-emerald-400'}`}
              >
                Tồn: {s.stock}
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    setEditingId(s.id);
                    setForm({
                      code: s.code,
                      type: s.type,
                      name: s.name,
                      price: s.price,
                      unit: s.unit,
                      stock: s.stock,
                      img: s.img,
                    });
                  }}
                  className="flex-1 text-xs py-1 rounded bg-blue-600"
                >
                  Sửa
                </button>
                <button
                  onClick={async () => {
                    await deleteService(s.id);
                    await load();
                  }}
                  className="flex-1 text-xs py-1 rounded bg-rose-600"
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


