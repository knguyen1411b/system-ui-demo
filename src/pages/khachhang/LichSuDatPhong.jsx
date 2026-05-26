import { useEffect, useMemo, useState } from 'react';
import {  getBookingHistory } from '@/services/api';

export default function LichSuDatPhong() {
    const [rows, setRows] = useState([]);
    const [tab, setTab] = useState('all');

    // Bản đồ chuyển đổi trạng thái sang Tiếng Việt & Màu sắc
    const statusConfig = {
        all: { label: 'Tất cả', class: '' },
        pending: { label: 'Đang chờ', class: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
        completed: { label: 'Đã hoàn tất', class: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
        cancelled: { label: 'Đã hủy', class: 'bg-rose-500/10 text-rose-500 border-rose-500/20' }
    };

    useEffect(() => {
        getBookingHistory().then(setRows);
    }, []);

    const filtered = useMemo(
        () => rows.filter((r) => (tab === 'all' ? true : r.status === tab)),
        [rows, tab]
    );

    return (
        <div className="min-h-screen">

            {/* Hiệu ứng hào quang phát sáng phía sau */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8b5cf6]/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/15 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto space-y-8">

                {/* HEADER SECTION */}
                <div className="flex justify-between items-center mb-6 px-1">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Giao dịch gần đây</h3>
                    <span className="text-[10px] bg-white/5 px-3 py-1.5 rounded-full text-gray-400 font-bold uppercase tracking-widest">
                        {rows.length} PHÒNG ĐÃ Đặt
                    </span>
                </div>

                {/* TABS FILTER */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-900/40 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-xl w-fit mb-6">
                    {Object.keys(statusConfig).map((key) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${tab === key
                                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20 font-bold'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            {statusConfig[key].label}
                        </button>
                    ))}
                </div>

                {/* LIST BOOKINGS */}
                <div className="space-y-3">
                    {filtered.length > 0 ? (
                        filtered.map((b) => (
                            <div
                                key={b.id}
                                className="bg-white/[0.01] backdrop-blur-md border border-slate-800/60 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:bg-slate-900/40 transition-all duration-300 group flex items-center gap-4 p-4 text-left shadow-sm"
                            >
                                {/* Room Image - Bo góc mềm mại hơn, đồng bộ với tổng thể */}
                                <div className="relative shrink-0 overflow-hidden rounded-xl border border-slate-700/30 w-16 h-16">
                                    <img
                                        src={b.image}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        alt="Room"
                                    />
                                </div>

                                {/* Info - Căn chỉnh khoảng cách chữ thông thoáng, tinh tế */}
                                <div className="flex-1 min-w-0 space-y-1.5">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <span className="font-semibold text-slate-100 text-base tracking-tight truncate">
                                            {b.roomName}
                                        </span>

                                        {/* Badge Trạng thái Đặt phòng - Bo góc mượt, text dễ nhìn hơn */}
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide border backdrop-blur-sm ${statusConfig[b.status]?.class || ''}`}>
                                            {statusConfig[b.status]?.label || b.status}
                                        </span>
                                    </div>

                                    {/* Metadata hàng ngang ngăn cách bằng dấu chấm tròn tinh tế */}
                                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400">
                                        <span className="truncate max-w-[130px] font-medium text-slate-300">{b.customerName}</span>
                                        <span className="text-slate-700/60 text-[10px]">•</span>
                                        <span className="font-light">{b.date}</span>
                                        <span className="text-slate-700/60 text-[10px]">•</span>
                                        <span className="font-light text-slate-400/90">{b.time} <span className="text-slate-500 text-[11px]">({b.duration})</span></span>
                                    </div>
                                </div>

                                {/* Tiền cọc & Nút hành động bên phải */}
                                <div className="text-right min-w-[120px] shrink-0 flex flex-col items-end justify-center pl-2 border-l border-slate-800/40">
                                    <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mb-0.5">Tiền Cọc</p>
                                    <p className="text-base font-bold text-emerald-400 tracking-tight mb-1.5">
                                        {b.deposit}
                                    </p>

                                    {/* Nút thanh toán chuẩn UI bo mềm */}
                                    {b.status === 'pending' && (
                                        <button
                                            onClick={() => alert(`Tiến hành thanh toán cho đơn đặt phòng: ${b.id}`)}
                                            className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 px-3.5 py-1 rounded-lg transition-all duration-200 active:scale-95"
                                        >
                                            Thanh toán
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State - Đồng bộ giao diện tối giản */
                        <div className="py-20 text-center bg-slate-900/10 border border-dashed border-slate-800/80 rounded-2xl backdrop-blur-sm">
                            <p className="text-slate-500 text-sm font-light">Không tìm thấy dữ liệu đặt phòng nào...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}