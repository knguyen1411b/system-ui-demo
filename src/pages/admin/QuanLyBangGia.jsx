import { useState } from 'react';

// Mock data convert từ bảng của bạn để code sạch và dễ quản lý
const initialPriceData = [
  { id: 'BG001', name: 'Giờ thường', from: 8.0, to: 17.0, dayType: 'NGÀY THƯỜNG', roomType: 'VIP', price: '200.000đ' },
  { id: 'BG002', name: 'Giờ thường', from: 8.0, to: 17.0, dayType: 'NGÀY THƯỜNG', roomType: 'Thường', price: '120.000đ' },
  { id: 'BG003', name: 'Giờ cao điểm', from: 17.0, to: 23.0, dayType: 'NGÀY THƯỜNG', roomType: 'VIP', price: '250.000đ' },
  { id: 'BG004', name: 'Giờ cao điểm', from: 17.0, to: 23.0, dayType: 'NGÀY THƯỜNG', roomType: 'Thường', price: '180.000đ' },
  { id: 'BG005', name: 'Giờ thường', from: 8.0, to: 17.0, dayType: 'CUỐI TUẦN', roomType: 'VIP', price: '300.000đ' },
  { id: 'BG006', name: 'Giờ thường', from: 8.0, to: 17.0, dayType: 'CUỐI TUẦN', roomType: 'Thường', price: '220.000đ' },
  { id: 'BG007', name: 'Giờ cao điểm', from: 17.0, to: 23.0, dayType: 'CUỐI TUẦN', roomType: 'VIP', price: '350.000đ' },
  { id: 'BG008', name: 'Giờ cao điểm', from: 17.0, to: 23.0, dayType: 'CUỐI TUẦN', roomType: 'Thường', price: '280.000đ' },
  { id: 'BG009', name: 'Giờ thường', from: 8.0, to: 17.0, dayType: 'NGÀY LỄ', roomType: 'VIP', price: '400.000đ' },
  { id: 'BG010', name: 'Giờ thường', from: 8.0, to: 17.0, dayType: 'NGÀY LỄ', roomType: 'Thường', price: '320.000đ' },
  { id: 'BG011', name: 'Giờ cao điểm', from: 17.0, to: 23.0, dayType: 'NGÀY LỄ', roomType: 'VIP', price: '500.000đ' },
  { id: 'BG012', name: 'Giờ cao điểm', from: 17.0, to: 23.0, dayType: 'NGÀY LỄ', roomType: 'Thường', price: '420.000đ' },
];

export default function QuanLyBangGia() {
  const [prices, setPrices] = useState(initialPriceData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Hàm mở modal và bind dữ liệu của dòng được chọn
  const handleEditClick = (priceItem) => {
    setSelectedPrice({ ...priceItem });
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrice(null);
  };

  // Hàm xử lý khi bấm Lưu thay đổi (Tùy biến logic update state hoặc gọi API tại đây)
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setPrices(prev => prev.map(item => item.id === selectedPrice.id ? selectedPrice : item));
    handleCloseModal();
  };

  // Hàm render class dynamic cho từng loại ngày
  const getDayTypeClass = (type) => {
    switch (type) {
      case 'NGÀY THƯỜNG':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'CUỐI TUẦN':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'NGÀY LỄ':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1424] text-[#e2e8f0] p-8 space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Quản Lý Bảng Giá</h1>
          <p className="text-gray-500 mt-2 font-medium">* Lưu ý: Giờ quy đổi sang thập phân (17h30 = 17.5)</p>
        </div>
      </header>


      {/* Main Content Area */}
      <div className="flex-1 px-8 pb-8 overflow-y-auto">
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-[12px] rounded-[2rem] overflow-hidden text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 uppercase tracking-widest text-gray-400 font-bold">
                <th className="px-4 py-4">Mã giá</th>
                <th className="px-4 py-4">Tên khung giờ</th>
                <th className="px-4 py-4 text-center">Từ giờ</th>
                <th className="px-4 py-4 text-center">Đến giờ</th>
                <th className="px-4 py-4">Loại ngày</th>
                <th className="px-4 py-4">Loại phòng</th>
                <th className="px-4 py-4 text-right">Giá/Giờ</th>
                <th className="px-4 py-4 text-center">Sửa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {prices.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 font-mono text-purple-400 font-bold">{item.id}</td>
                  <td className="px-4 py-4 font-semibold text-white">{item.name}</td>
                  <td className="px-4 py-4 text-center">{item.from.toFixed(1)}</td>
                  <td className="px-4 py-4 text-center">{item.to.toFixed(1)}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getDayTypeClass(item.dayType)}`}>
                      {item.dayType}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded font-bold text-xs ${item.roomType === 'VIP' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-purple-400/10 text-purple-400'}`}>
                      {item.roomType}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-black text-white">{item.price}</td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="text-purple-400 hover:scale-110 transition-transform"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* React Modal (Render có điều kiện thay vì ẩn bằng CSS) */}
      {isModalOpen && selectedPrice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1f35] w-full max-w-lg rounded-[2.5rem] border border-white/10 shadow-2xl p-10 relative">
            <h2 className="text-3xl font-extrabold text-white mb-6">Sửa bảng giá - {selectedPrice.id}</h2>

            <form onSubmit={handleSaveChanges} className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tên khung giờ</label>
                <input 
                  type="text" 
                  value={selectedPrice.name}
                  onChange={(e) => setSelectedPrice({ ...selectedPrice, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mt-1 outline-none focus:border-purple-500 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Từ giờ</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={selectedPrice.from}
                    onChange={(e) => setSelectedPrice({ ...selectedPrice, from: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mt-1 outline-none focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Đến giờ</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={selectedPrice.to}
                    onChange={(e) => setSelectedPrice({ ...selectedPrice, to: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mt-1 outline-none focus:border-purple-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Giá/Giờ</label>
                <input 
                  type="text" 
                  value={selectedPrice.price}
                  onChange={(e) => setSelectedPrice({ ...selectedPrice, price: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mt-1 outline-none focus:border-purple-500 text-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 transition-all"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}