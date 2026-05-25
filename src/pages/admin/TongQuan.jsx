import { Line } from "react-chartjs-2";

export default function TongQuan() {
    const chartData = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
        datasets: [{
            label: 'Doanh thu',
            data: [12, 19, 15, 25, 22, 30, 28],
            borderColor: '#8b5cf6',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(139, 92, 246, 0.1)'
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { display: false }, x: { grid: { display: false }, ticks: { color: '#94a3b8' } } }
    };

    const roomActivities = [
        { id: 101, roomCode: 'P402', roomName: 'Phòng 402', type: 'VIP', date: '14/04/2026', checkIn: '14:30', duration: '02:45:00', status: 'Đang hoạt động' },
        { id: 102, roomCode: 'P205', roomName: 'Phòng 205', type: 'Thường', date: '14/04/2026', checkIn: '16:15', duration: '01:00:22', status: 'Đang hoạt động' },
        { id: 103, roomCode: 'P301', roomName: 'Phòng 301', type: 'VIP', date: '14/04/2026', checkIn: '12:00', duration: '05:20:10', status: 'Sắp hết giờ' }
    ];
    const lowStockItems = [
        { id: 1, code: 'DRK01', type: 'drink', name: 'Bia Heineken (Lon)', price: 35000, unit: 'Lon', stock: 12, img: 'https://product.hstatic.net/1000281508/product/6-lon-bia-heineken-330ml-201904241647511710_50bd7b00db4b40a9958a32df2e8cec08_master.jpg' },
        { id: 2, code: 'DRK02', type: 'drink', name: 'Bia Tiger Crystal', price: 32000, unit: 'Lon', stock: 8, img: 'https://images.unsplash.com/photo-1597290282695-edc43d0e7129?w=400' },
        { id: 3, code: 'DRK03', type: 'drink', name: 'Nước suối Aquafina', price: 15000, unit: 'Chai', stock: 5, img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
        { id: 4, code: 'DRK04', type: 'drink', name: 'Coca Cola', price: 20000, unit: 'Lon', stock: 5, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400' },
        { id: 5, code: 'FOD01', type: 'food', name: 'Trái cây dĩa (Lớn)', price: 250000, unit: 'Dĩa', stock: 5, img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400' },
        { id: 6, code: 'FOD02', type: 'food', name: 'Snack khoai tây', price: 45000, unit: 'Gói', stock: 4, img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
    ];

    let topCustomers = [
        { id: 1, name: 'Hoàng Tony', phone: '0901234567', role: 'Quản lý', points: 0, spent: 0 },
        { id: 2, name: 'Bảo Trân', phone: '0988666777', role: 'Khách hàng', points: 2500, spent: 15200000 },
        { id: 3, name: 'Minh Tuấn', phone: '0933111222', role: 'Nhân viên', points: 0, spent: 0 },
        { id: 4, name: 'Thanh Thảo', phone: '0911222333', role: 'Khách hàng', points: 4800, spent: 22500000 },
        { id: 5, name: 'Anh Đức', phone: '0944555666', role: 'Khách hàng', points: 1200, spent: 8700000 }
    ];

    return (
        <div className="bg-[#0f172a] text-slate-200 p-8 space-y-8">
            {/* Header */}
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">Thống kê Tổng quan</h1>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass rounded-3xl p-6">
                    <h3 className="font-bold text-lg mb-6">Doanh thu tổng quát</h3>
                    <div className="h-[300px] w-full"><Line data={chartData} options={chartOptions} /></div>
                </div>
                <div className="space-y-6">
                    <div className="glass rounded-3xl p-6 bg-gradient-to-br from-purple-600/20 to-transparent border-purple-500/20">
                        <p className="text-gray-400 text-sm">Doanh thu hôm nay</p>
                        <h4 className="text-3xl font-black mt-2">12.550.000đ</h4>
                    </div>
                    <div className="glass rounded-3xl p-6">
                        <p className="text-gray-400 text-sm">Số phòng đang thuê</p>
                        <h4 className="text-3xl font-black mt-2">18 / 25</h4>
                        <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
                            <div className="bg-purple-500 h-full w-[72%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hoạt động phòng */}
            <div className="glass rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Hoạt động phòng gần đây</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase text-gray-400 font-bold">
                        <tr>
                            <th className="px-6 py-4">Phòng</th>
                            <th className="px-6 py-4">Loại</th>
                            <th className="px-6 py-4">Giờ vào</th>
                            <th className="px-6 py-4">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {roomActivities.map(act => (
                            <tr key={act.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="px-6 py-4 font-bold">{act.roomCode}</td>
                                <td className="px-6 py-4">{act.type}</td>
                                <td className="px-6 py-4 font-mono text-purple-300">{act.checkIn}</td>
                                <td className="px-6 py-4 text-emerald-400">{act.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Cột trái: Dịch vụ sắp hết kho */}
                <div className="glass rounded-3xl overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Dịch vụ sắp hết kho
                        </h3>
                        <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold uppercase">Cảnh báo</span>
                    </div>
                    <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[350px]">
                        {lowStockItems.length > 0 ? lowStockItems.sort((a, b) => a.stock - b.stock).map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <img src={item.img} className="w-10 h-10 rounded-lg object-cover border border-white/10" alt="" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-200">{item.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase">{item.code} • {item.unit}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-red-400">{item.stock}</p>
                                    <p className="text-[9px] text-gray-500 uppercase font-bold">Tồn kho</p>
                                </div>
                            </div>
                        )) : <p className="text-center text-gray-500 text-sm py-4">Tất cả đủ hàng</p>}
                    </div>
                </div>

                {/* Cột phải: Khách hàng chi tiêu nhiều */}
                <div className="glass rounded-3xl overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Khách hàng chi tiêu nhiều</h3>
                        <span className="text-[10px] text-gray-500 font-mono uppercase">Tháng 04/2026</span>
                    </div>
                    <div className="p-4 space-y-3">
                        {topCustomers.sort((a, b) => b.spent - a.spent).map(acc => {
                            const nameParts = acc.name.split(' ');
                            const initial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
                            return (
                                <div key={acc.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center font-bold text-purple-400">
                                            {initial}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{acc.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-amber-500/80 font-medium">{acc.points.toLocaleString()} điểm</span>
                                                <span className="w-1 h-1 rounded-full bg-white/10"></span>
                                                <span className="text-[10px] text-gray-500">{acc.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-emerald-400">{acc.spent.toLocaleString()}đ</p>
                                        <p className="text-[9px] text-gray-500 uppercase font-bold mt-0.5">Tổng chi tiêu</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};