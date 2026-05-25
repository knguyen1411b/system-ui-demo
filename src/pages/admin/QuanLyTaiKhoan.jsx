import { useState } from 'react';

export default function QuanLyTaiKhoan() {
  // 1. Khởi tạo State danh sách tài khoản
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Hoàng Tony', phone: '0901234567', role: 'Quản lý', points: 0 },
    { id: 2, name: 'Bảo Trân', phone: '0988666777', role: 'Khách hàng', points: 2500 },
    { id: 3, name: 'Minh Tuấn', phone: '0933111222', role: 'Nhân viên', points: 0 }
  ]);

  // 2. Bộ lọc & Tìm kiếm State
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // 3. Form Modal State (Thêm / Sửa)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', phone: 'Quản lý', role: 'Quản lý', points: 0 });

  // 4. View Detail Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // --- LOGIC XỬ LÝ SỰ KIỆN ---

  // Đóng mở badge style dựa trên vai trò
  const getBadgeStyle = (role) => {
    if (role === 'Quản lý') return 'border-purple-500/50 text-purple-400 bg-purple-500/10';
    if (role === 'Nhân viên') return 'border-blue-500/50 text-blue-400 bg-blue-500/10';
    return 'border-amber-500/50 text-amber-400 bg-amber-500/10';
  };

  // Mở modal thêm mới hoặc cập nhật
  const handleOpenFormModal = (account = null) => {
    if (account) {
      setFormData({ ...account });
    } else {
      setFormData({ id: null, name: '', phone: '', role: 'Quản lý', points: 0 });
    }
    setIsFormModalOpen(true);
  };

  // Xử lý submit Form (Thêm hoặc Sửa)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedPoints = formData.role === 'Khách hàng' ? parseInt(formData.points || 0, 10) : 0;

    if (formData.id) {
      // Logic Cập nhật
      setAccounts(accounts.map(acc => acc.id === formData.id ? { ...formData, points: updatedPoints } : acc));
    } else {
      // Logic Thêm mới
      const newAccount = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        points: updatedPoints
      };
      setAccounts([...accounts, newAccount]);
    }
    setIsFormModalOpen(false);
  };

  // Xóa tài khoản
  const handleDeleteAccount = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  // Xem chi tiết tài khoản
  const handleViewDetail = (account) => {
    setSelectedAccount(account);
    setIsViewModalOpen(true);
  };

  // Lọc dữ liệu tài khoản hiển thị trên Table
  const filteredAccounts = accounts.filter(acc => {
    const matchSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || acc.phone.includes(searchQuery);
    const matchRole = roleFilter === 'all' || acc.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="bg-[#0f172a] text-slate-200 p-8 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Quản Lý Bảng Giá</h1>
          <p className="text-gray-500 mt-2 font-medium">* Lưu ý: Giờ quy đổi sang thập phân (17h30 = 17.5)</p>
        </div>
        <button
          onClick={() => handleOpenFormModal()}
          className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/20 text-sm"
        >
          + Thêm mới
        </button>
      </header>

      {/* Bộ lọc Tìm kiếm & Vai trò */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Tìm theo tên, sđt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 outline-none focus:border-purple-500 text-gray-200"
          />
          <svg class="w-5 h-5 absolute left-4 top-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          class="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-purple-500 text-gray-300 cursor-pointer"
        >
          <option value="all">Tất cả vai trò</option>
          <option value="Quản lý">Quản lý</option>
          <option value="Nhân viên">Nhân viên</option>
          <option value="Khách hàng">Khách hàng</option>
        </select>
      </div>

      {/* Bảng dữ liệu chính */}
      <div class="glass rounded-3xl overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-white/5 text-[10px] uppercase text-gray-400 tracking-widest font-bold">
            <tr>
              <th class="px-6 py-4">Thành viên</th>
              <th class="px-6 py-4">Số điện thoại</th>
              <th class="px-6 py-4">Vai trò</th>
              <th class="px-6 py-4">Điểm</th>
              <th class="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map(a => (
                <tr key={a.id} class="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td class="px-6 py-4 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs border border-white/20 italic text-purple-400">
                      {a.name.charAt(0).toUpperCase()}
                    </div>
                    <span class="font-bold text-gray-200">{a.name}</span>
                  </td>
                  <td class="px-6 py-4 text-gray-400 font-mono">{a.phone}</td>
                  <td class="px-6 py-4">
                    <span class={`px-2 py-1 rounded-md text-[9px] font-black uppercase border ${getBadgeStyle(a.role)}`}>
                      {a.role}
                    </span>
                  </td>
                  <td class="px-6 py-4 font-bold text-emerald-400">
                    {a.role === 'Khách hàng' ? a.points.toLocaleString() : '-'}
                  </td>
                  <td class="px-6 py-4 text-right space-x-1">
                    <button onClick={() => handleViewDetail(a)} class="p-2 hover:text-purple-400 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" /></svg>
                    </button>
                    <button onClick={() => handleOpenFormModal(a)} class="p-2 hover:text-blue-400 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" /></svg>
                    </button>
                    <button onClick={() => handleDeleteAccount(a.id)} class="p-2 hover:text-rose-500 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" /></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">Không tìm thấy thành viên nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: THÊM MỚI / CẬP NHẬT THÀNH VIÊN */}
      {isFormModalOpen && (
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsFormModalOpen(false)}></div>
          <form onSubmit={handleFormSubmit} class="glass w-full max-w-md rounded-[2.5rem] p-8 relative z-10 bg-[#161b33]">
            <h4 class="text-xl font-bold mb-6">{formData.id ? 'Cập nhật thành viên' : 'Thêm thành viên'}</h4>

            <div class="space-y-4">
              <div>
                <label class="text-[10px] text-gray-400 font-bold uppercase">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-1 outline-none focus:border-purple-500 text-white"
                />
              </div>
              <div>
                <label class="text-[10px] text-gray-400 font-bold uppercase">Số điện thoại</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-1 outline-none focus:border-purple-500 text-white"
                />
              </div>
              <div>
                <label class="text-[10px] text-gray-400 font-bold uppercase">Vai trò</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-1 outline-none focus:border-purple-500 text-white cursor-pointer"
                >
                  <option value="Quản lý">Quản lý</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Khách hàng">Khách hàng</option>
                </select>
              </div>

              {/* Chỉ hiển thị ô nhập điểm nếu là Khách hàng */}
              {formData.role === 'Khách hàng' && (
                <div className="animate-[fadeIn_0.2s_ease-out]">
                  <label class="text-[10px] text-gray-400 font-bold uppercase">Điểm tích lũy</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-1 outline-none focus:border-purple-500 text-white"
                  />
                </div>
              )}
            </div>

            <div class="flex gap-3 mt-8">
              <button type="button" onClick={() => setIsFormModalOpen(false)} class="flex-1 py-3 text-sm font-bold opacity-50 hover:opacity-100 text-white">Hủy</button>
              <button type="submit" class="flex-1 py-3 bg-purple-600 rounded-xl text-sm font-bold hover:bg-purple-500 shadow-lg shadow-purple-600/20 text-white">Xác nhận</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: XEM CHI TIẾT THÀNH VIÊN */}
      {isViewModalOpen && selectedAccount && (
        <div class="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsViewModalOpen(false)}></div>
          <div class="glass w-full max-w-sm rounded-[2.5rem] p-8 relative z-10 bg-[#161b33] text-center">
            <div class="w-20 h-20 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-3xl font-black mb-4 shadow-2xl text-white">
              {selectedAccount.name.charAt(0).toUpperCase()}
            </div>
            <h4 class="text-2xl font-bold mb-1 text-white">{selectedAccount.name}</h4>
            <p class="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">{selectedAccount.role}</p>

            <div class="space-y-3 text-left bg-white/5 p-4 rounded-2xl border border-white/10">
              <div class="flex justify-between">
                <span class="text-gray-400 text-xs">Số điện thoại:</span>
                <span class="font-bold text-white">{selectedAccount.phone}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-xs">Điểm tích lũy:</span>
                <span class="font-bold text-emerald-400">
                  {selectedAccount.role === 'Khách hàng' ? `${selectedAccount.points.toLocaleString()} pts` : 'Không áp dụng'}
                </span>
              </div>
            </div>
            <button onClick={() => setIsViewModalOpen(false)} class="mt-8 w-full py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 text-white">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}