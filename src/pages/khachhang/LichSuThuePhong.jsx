import { useState } from "react";

export default function LichSuThuePhong() {
    const [visibleItems, setVisibleItems] = useState(3);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    const [history, setHistory] = useState([
        {
            id: 'BK-77', room: '208', type: 'Thường',
            date: '08/04/2026', in: '18:00', out: '20:00', duration: 2,
            roomPrice: '250.000', serviceTotal: '100.000', total: '350.000',
            roomImg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
            services: [
                { name: 'Nước ngọt Pepsi', qty: 2, price: '20.000', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100' }
            ]
        },
        {
            id: 'BK-66', room: '305', type: 'VIP',
            date: '05/04/2026', in: '21:00', out: '23:00', duration: 2,
            roomPrice: '900.000', serviceTotal: '300.000', total: '1.200.000',
            roomImg: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
            services: [
                { name: 'Bia Tiger', qty: 6, price: '30.000', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100' }
            ]
        },
        {
            id: 'BK-55', room: '405', type: 'VIP',
            date: '01/04/2026', in: '19:30', out: '22:00', duration: 2.5,
            roomPrice: '1.000.000', serviceTotal: '500.000', total: '1.500.000',
            roomImg: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
            services: [
                { name: 'Trái cây dĩa (Nhỏ)', qty: 1, price: '120.000', img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=100' }
            ]
        },
        {
            id: 'BK-44', room: '101', type: 'Thường',
            date: '28/03/2026', in: '17:00', out: '19:00', duration: 2,
            roomPrice: '200.000', serviceTotal: '80.000', total: '280.000',
            roomImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
            services: [
                { name: 'Nước suối Aquafina', qty: 2, price: '15.000', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=100' }
            ]
        }
    ]);

    const handleViewMore = () => {
        setVisibleItems(prev => prev + 3);
    };
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6 px-1">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Giao dịch gần đây</h3>
                <span className="text-[10px] bg-white/5 px-3 py-1.5 rounded-full text-gray-400 font-bold uppercase tracking-widest">
                    {history.length} PHÒNG ĐÃ thuê
                </span>
            </div>

            {/* LIST BOOKING HISTORY */}
            <div className="space-y-2">
                {history.slice(0, visibleItems).map((item) => (
                    <div key={item.id} className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden hover:border-[#a78bfa] transition-all group flex items-center gap-3 p-3">
                        <img src={item.roomImg} className="w-16 h-16 rounded-lg object-cover border border-white/10" alt="Room" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-bold text-white text-base truncate">Phòng {item.room}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-purple-500/10 text-purple-500">
                                    {item.type}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-400">
                                <span>{item.date}</span>
                                <span>|</span>
                                <span>{item.in} - {item.out}</span>
                                <span>|</span>
                                <span>{item.duration.toFixed(1)} Giờ</span>
                            </div>
                        </div>
                        <div className="text-right min-w-[90px]">
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Tổng</p>
                            <p className="text-base font-black text-emerald-400 mb-1">{item.total}đ</p>
                            <button
                                onClick={() => { setSelectedBooking(item); setShowDetail(true); }}
                                className="text-[10px] font-bold text-[#8b5cf6] bg-white/5 hover:bg-[#8b5cf6]/10 px-3 py-1 rounded transition-all uppercase"
                            >
                                Chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* VIEW MORE BUTTON */}
            {visibleItems < history.length && (
                <div className="mt-16 flex justify-center">
                    <button onClick={handleViewMore} className="group flex flex-col items-center gap-2 text-[#a78bfa] hover:text-white transition-all">
                        <span className="font-bold tracking-widest uppercase text-xs">Xem thêm giao dịch</span>
                        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* --- MODAL: CHI TIẾT HÓA ĐƠN --- */}
            {showDetail && selectedBooking && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-2">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDetail(false)}></div>
                    <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative z-10">

                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-950/30">
                            <div>
                                <h4 className="font-bold text-white text-lg">Hóa đơn điện tử</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                    MÃ: {selectedBooking.id} | NGÀY: {selectedBooking.date}
                                </p>
                            </div>
                            <button onClick={() => setShowDetail(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors">✕</button>
                        </div>

                        <div className="p-4 overflow-y-auto [scrollbar-width:none] [-webkit-scrollbar:none] max-h-[60vh]">
                            {/* Chi phí phòng */}
                            <div className="mb-6">
                                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Chi phí thuê phòng</h5>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 group">
                                    <img src={selectedBooking.roomImg} className="w-12 h-12 rounded-lg object-cover border border-white/10" alt="Room Detail" />
                                    <div className="flex-grow min-w-0">
                                        <p className="font-bold text-white text-sm truncate">
                                            Phòng {selectedBooking.room} ({selectedBooking.type})
                                        </p>
                                        <p className="text-xs text-gray-400 font-semibold">
                                            {selectedBooking.in} - {selectedBooking.out} | {selectedBooking.duration.toFixed(1)} Giờ
                                        </p>
                                    </div>
                                    <p className="font-extrabold text-white text-base">{selectedBooking.roomPrice}đ</p>
                                </div>
                            </div>

                            {/* Dịch vụ ăn uống */}
                            <div>
                                <div className="flex justify-between items-center mt-3 mb-3 px-1">
                                    <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dịch vụ ăn uống</h5>
                                    <p className="text-xs font-bold text-gray-300">{selectedBooking.serviceTotal}đ</p>
                                </div>

                                <div className="space-y-1.5">
                                    {selectedBooking.services.map((s, index) => {
                                        const cleanPrice = parseInt(s.price.replace(/\./g, '')) || 0;
                                        const itemTotal = s.qty * cleanPrice;
                                        return (
                                            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors">
                                                <img src={s.img} className="w-8 h-8 rounded object-cover bg-slate-800 border border-white/10" alt={s.name} />
                                                <div className="flex-grow min-w-0">
                                                    <p className="font-bold text-xs text-white truncate mb-0.5">{s.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-bold">{s.qty} x {s.price}đ</p>
                                                </div>
                                                <p className="font-bold text-xs text-purple-400">
                                                    {itemTotal.toLocaleString('vi-VN')}đ
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Tổng cộng & Footer Modal */}
                        <div className="p-4 bg-slate-800/50 border-t border-white/5">
                            <div className="flex justify-between items-center mb-4 border border-emerald-500/20 bg-emerald-500/5 p-3 rounded-xl">
                                <div className="text-left">
                                    <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mb-1">Tổng cộng</p>
                                    <p className="text-xl font-black text-emerald-500">{selectedBooking.total}đ</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1.5">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Trạng thái</p>
                                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                                        Đã hoàn tất
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setShowDetail(false)} className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow">
                                Đóng hóa đơn
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}