import { useState } from 'react';

export default function QuanLyPhong() {
  // 1. State danh sách phòng ban đầu
  const [rooms, setRooms] = useState([
    { id: 1, code: 'P101', name: 'Phòng 101', type: 'VIP', status: 'Đang hoạt động' },
    { id: 2, code: 'P102', name: 'Phòng 102', type: 'Thường', status: 'Trống' },
    { id: 3, code: 'P201', name: 'Phòng 201', type: 'VIP', status: 'Trống' }
  ]);

  // State Tìm kiếm & Bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // State Modals (Đóng/Mở Form và Xem chi tiết)
  const [formModal, setFormModal] = useState({ open: false, mode: 'add' }); 
  const [viewModal, setViewModal] = useState({ open: false, data: null });
  const [formData, setFormData] = useState({ id: '', code: '', name: '', type: 'Thường', status: 'Trống' });

  // 2. Các hàm xử lý CRUD (State thuần)
  const handleOpenForm = (room = null) => {
    if (room) {
      setFormData({ ...room });
      setFormModal({ open: true, mode: 'edit' });
    } else {
      setFormData({ id: '', code: '', name: '', type: 'Thường', status: 'Trống' });
      setFormModal({ open: true, mode: 'add' });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa phòng này?')) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formModal.mode === 'edit') {
      setRooms(rooms.map(r => r.id === formData.id ? formData : r));
    } else {
      setRooms([...rooms, { ...formData, id: Date.now() }]);
    }
    setFormModal({ open: false, mode: 'add' });
  };

  // Logic lọc dữ liệu nhanh tại Client
  const filteredRooms = rooms.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#0f1424] text-[#e2e8f0] p-8 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Quản Lý Phòng</h1>
          <p className="text-gray-500 mt-2 font-medium">Quản lý danh sách và trạng thái các phòng</p>
        </div>
      </header>

      {/* THANH BỘ LỌC & NÚT THÊM */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <input 
            type="text" 
            placeholder="Tìm theo mã hoặc tên phòng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pl-12 outline-none focus:border-purple-500 text-sm"
          />
          <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-sm text-gray-300">
          <option value="all">Tất cả loại</option>
          <option value="VIP">Phòng VIP</option>
          <option value="Thường">Phòng Thường</option>
        </select>

        <button onClick={() => handleOpenForm()} className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/20 text-sm">
          + Thêm phòng
        </button>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-[11px] uppercase text-gray-400 tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Mã phòng</th>
              <th className="px-6 py-4">Tên phòng</th>
              <th className="px-6 py-4">Loại phòng</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {filteredRooms.map(r => (
              <tr key={r.id} className="hover:bg-white/5 transition-all">
                <td className="px-6 py-4 font-mono text-purple-400 font-bold">{r.code}</td>
                <td className="px-6 py-4 font-bold text-gray-200">{r.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase border ${r.type === 'VIP' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' : 'border-blue-500/50 text-blue-400 bg-blue-500/10'}`}>
                    {r.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${r.status === 'Đang hoạt động' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-gray-500'}`}></div>
                    <span className={`${r.status === 'Đang hoạt động' ? 'text-emerald-400' : 'text-gray-400'} font-semibold`}>{r.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => setViewModal({ open: true, data: r })} className="hover:text-purple-400 p-1 transition-colors">👁️</button>
                  <button onClick={() => handleOpenForm(r)} className="hover:text-blue-400 p-1 transition-colors">✏️</button>
                  <button onClick={() => handleDelete(r.id)} className="hover:text-rose-500 p-1 transition-colors">🗑️</button>
                </td>
              </tr>
            ))}
            {filteredRooms.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-sm">Không tìm thấy phòng phù hợp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM (THÊM / SỬA) */}
      {formModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-[#161b33] border border-white/10 p-6 rounded-3xl w-full max-w-md space-y-4">
            <h4 className="text-lg font-bold">{formModal.mode === 'edit' ? 'Cập nhật phòng' : 'Thêm phòng mới'}</h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Mã phòng</label>
                <input 
                  type="text" 
                  required
                  value={formData.code} 
                  onChange={e => setFormData({...formData, code: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-purple-500 text-sm"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Tên phòng</label>
                <input 
                  type="text" 
                  required
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-purple-500 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Loại phòng</label>
                  <select 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="Thường">Thường</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Trạng thái</label>
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-purple-500 text-sm"
                  >
                    <option value="Trống">Trống</option>
                    <option value="Đang hoạt động">Đang hoạt động</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setFormModal({ open: false, mode: 'add' })} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-all">Hủy</button>
              <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-all">Lưu</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL XEM CHI TIẾT */}
      {viewModal.open && viewModal.data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#161b33] border border-white/10 p-6 rounded-3xl w-full max-w-sm space-y-4">
            <h4 className="text-lg font-bold text-purple-400">Chi tiết: {viewModal.data.name}</h4>
            <div className="space-y-2 text-sm border-t border-white/5 pt-3">
              <p><span className="text-gray-400">Mã phòng:</span> <span className="font-mono">{viewModal.data.code}</span></p>
              <p><span className="text-gray-400">Loại:</span> {viewModal.data.type}</p>
              <p><span className="text-gray-400">Trạng thái:</span> {viewModal.data.status}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setViewModal({ open: false, data: null })} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-all">Đóng</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}