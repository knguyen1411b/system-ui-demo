import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialServices = [
  { id: 1, code: 'DRK01', type: 'drink', name: 'Bia Heineken (Lon)', price: 35000, unit: 'Lon', stock: 120, img: 'https://product.hstatic.net/1000281508/product/6-lon-bia-heineken-330ml-201904241647511710_50bd7b00db4b40a9958a32df2e8cec08_master.jpg' },
  { id: 2, code: 'DRK02', type: 'drink', name: 'Bia Tiger Crystal', price: 32000, unit: 'Lon', stock: 8, img: 'https://images.unsplash.com/photo-1597290282695-edc43d0e7129?w=400' },
  { id: 3, code: 'DRK03', type: 'drink', name: 'Nước suối Aquafina', price: 15000, unit: 'Chai', stock: 200, img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
  { id: 4, code: 'DRK04', type: 'drink', name: 'Coca Cola', price: 20000, unit: 'Lon', stock: 85, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400' },
  { id: 5, code: 'FOD01', type: 'food', name: 'Trái cây dĩa (Lớn)', price: 250000, unit: 'Dĩa', stock: 15, img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400' },
  { id: 6, code: 'FOD02', type: 'food', name: 'Snack khoai tây', price: 45000, unit: 'Gói', stock: 4, img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
  { id: 7, code: 'FOD03', type: 'food', name: 'Mực nướng ngũ vị', price: 185000, unit: 'Phần', stock: 20, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
  { id: 8, code: 'FOD04', type: 'food', name: 'Cơm chiên hải sản', price: 120000, unit: 'Phần', stock: 5, img: 'https://cdn.tgdd.vn/2021/01/CookProduct/comchienhaisan-1200x676.jpg' },
  { id: 9, code: 'FOD05', type: 'food', name: 'Gà rán KFC (Phần)', price: 95000, unit: 'Phần', stock: 30, img: 'https://content.jdmagicbox.com/v2/comp/mumbai/m1/022pxx22.xx22.200829100417.u5m1/catalogue/kfc-mumbai-fast-food-1gtb5g7j7r.jpg' },
  { id: 10, code: 'DRK05', type: 'drink', name: 'Rượu vang đỏ', price: 850000, unit: 'Chai', stock: 12, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400' },
  { id: 11, code: 'FOD06', type: 'food', name: 'Đậu phộng rang muối', price: 25000, unit: 'Bịch', stock: 7, img: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_5_13_638511979750318955_lac-rang-muoi-duong-1.jpg' },
  { id: 12, code: 'DRK06', type: 'drink', name: 'Soda chanh', price: 30000, unit: 'Ly', stock: 50, img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400' },
];

const emptyForm = { code: '', type: 'drink', name: '', price: '', unit: 'Phần', stock: '', img: '' };

export default function QuanLyDichVu() {
  const [rows, setRows] = useState(initialServices);
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [stock, setStock] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

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

  const submit = (e) => {
    e.preventDefault();
    if (!form.code || !form.name) return alert('Vui lòng điền mã và tên dịch vụ!');

    if (editingId) {
      setRows(rows.map(item => item.id === editingId ? { ...form, id: editingId, price: Number(form.price), stock: Number(form.stock) } : item));
      setEditingId(null);
    } else {
      const newService = {
        ...form,
        id: Date.now(),
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        img: form.img || 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400'
      };
      setRows([...rows, newService]);
    }
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa dịch vụ này không?')) {
      setRows(rows.filter(item => item.id !== id));
    }
  };

  return (
   <div className="bg-[#0f172a] text-slate-200 p-8 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Quản Lý Dịch Vụ</h1>
          <p className="text-gray-500 mt-2 font-medium">Quản lý danh sách, giá cả và số lượng tồn kho của kho thực phẩm</p>
        </div>
      </header>

      {/* Form nghiệp vụ (Thêm / Sửa dịch vụ) */}
      <form
        onSubmit={submit}
        className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4"
      >
        {/* Mã dịch vụ */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 px-1 uppercase">Mã dịch vụ</label>
          <input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="VD: DRK01"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
          />
        </div>

        {/* Tên dịch vụ */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-bold text-gray-400 px-1 uppercase">Tên dịch vụ</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tên đồ uống hoặc thức ăn..."
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
          />
        </div>

        {/* Phân loại */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 px-1 uppercase">Phân loại</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm appearance-none"
          >
            <option value="drink" className="text-slate-900">Đồ uống</option>
            <option value="food" className="text-slate-900">Thức ăn</option>
          </select>
        </div>

        {/* Đơn giá */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 px-1 uppercase">Đơn giá (đ)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Giá bán"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
          />
        </div>

        {/* Đơn vị */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 px-1 uppercase">Đơn vị</label>
          <input
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            placeholder="Lon, Chai, Dĩa..."
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
          />
        </div>

        {/* Tồn kho */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-400 px-1 uppercase">Tồn kho</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            placeholder="Số lượng"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
          />
        </div>

        {/* KHU VỰC TẢI ẢNH LÊN (Thay thế ô URL cũ) */}
        <div className="flex flex-col gap-1 md:col-span-3 lg:col-span-5">
          <label className="text-xs font-bold text-gray-400 px-1 uppercase">Hình ảnh dịch vụ</label>
          <label className="relative flex items-center justify-between bg-white/5 border border-dashed border-white/20 hover:border-purple-500/50 rounded-xl px-4 py-2 cursor-pointer transition-all min-h-[46px] group overflow-hidden">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const localUrl = URL.createObjectURL(file);
                  setForm({ ...form, img: localUrl });
                }
              }}
            />
            <div className="flex items-center gap-3 z-10">
              <svg className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-300 group-hover:text-white truncate max-w-[200px] md:max-w-xs lg:max-w-md">
                {form.img ? "✓ Đã chọn ảnh mới" : "Nhấp để tải ảnh sản phẩm lên"}
              </span>
            </div>

            {/* Ô xem trước (Preview) ảnh nhỏ ở góc phải thanh upload */}
            {form.img && (
              <img
                src={form.img}
                alt="Preview"
                className="w-9 h-9 object-cover rounded-lg border border-white/20 shadow-md z-10"
              />
            )}
          </label>
        </div>

        {/* Nút hành động */}
        <div className="flex items-end md:col-span-1 lg:col-span-2">
          <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all text-sm h-[46px]">
            {editingId ? '⚡ Cập nhật dịch vụ' : '➕ Thêm dịch vụ'}
          </button>
        </div>
      </form>

      {/* Bộ lọc nâng cao (Filters) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc mã mặt hàng..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
        >
          <option value="all" className="text-slate-900">Tất cả phân loại</option>
          <option value="drink" className="text-slate-900">Đồ uống (Drink)</option>
          <option value="food" className="text-slate-900">Thức ăn (Food)</option>
        </select>

        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 text-white transition-all text-sm"
        >
          <option value="all" className="text-slate-900">Tất cả trạng thái kho</option>
          <option value="low" className="text-slate-900">Sắp hết hàng (Dưới 10)</option>
          <option value="instock" className="text-slate-900">Còn hàng dồi dào</option>
        </select>
      </div>

      {/* Grid danh sách các sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden flex flex-col group transition-all hover:border-purple-500/50 hover:bg-white/5"
          >
            {/* Vùng ảnh */}
            <div className="h-40 overflow-hidden relative bg-slate-800 flex items-center justify-center">
              <img
                src={s.img}
                alt={s.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400" }}
              />
              <span className={`absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider ${s.type === 'drink' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}>
                {s.type === 'drink' ? 'Nước' : 'Món'}
              </span>
            </div>

            {/* Nội dung thông tin */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <p className="text-[11px] text-purple-400 font-bold tracking-widest uppercase">{s.code}</p>
                <h3 className="font-bold text-white text-base line-clamp-2 min-h-[3rem]">{s.name}</h3>
              </div>

              <div className="space-y-2">
                <p className="text-lg font-black text-white">
                  {s.price.toLocaleString('vi-VN')}đ <span className="text-xs text-gray-400 font-normal">/ {s.unit}</span>
                </p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${s.stock < 10 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                  <p className={`text-xs font-bold ${s.stock < 10 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    Tồn: {s.stock} {s.unit} {s.stock < 10 && '(Sắp hết)'}
                  </p>
                </div>
              </div>

              {/* Nhóm nút điều khiển */}
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => {
                    setEditingId(s.id);
                    setForm({
                      code: s.code,
                      type: s.type,
                      name: s.name,
                      price: s.price.toString(),
                      unit: s.unit,
                      stock: s.stock.toString(),
                      img: s.img,
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase transition-all text-white border border-white/10 text-center"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl text-xs font-bold uppercase transition-all border border-rose-500/10 text-center"
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