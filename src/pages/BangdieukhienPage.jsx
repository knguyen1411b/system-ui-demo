import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardData } from '@/services/api';

export default function BangdieukhienPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  if (!data) return <div className="min-h-screen bg-[#0b0f1a] text-white p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-gray-400">Doanh thu hôm nay</p>
          <p className="text-2xl font-black mt-2">{data.todayRevenue}</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-gray-400">Phòng đang thuê</p>
          <p className="text-2xl font-black mt-2">
            {data.occupiedRooms}/{data.totalRooms}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <p className="text-sm text-gray-400">Cảnh báo tồn kho</p>
          <p className="text-2xl font-black mt-2">{data.lowStock.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-bold mb-3">Dịch vụ sắp hết kho</h2>
          <div className="space-y-2">
            {data.lowStock.map((x) => (
              <div key={x.id} className="flex justify-between text-sm">
                <span>{x.name}</span>
                <span className="text-rose-400">{x.remain}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-bold mb-3">Khách hàng chi tiêu nhiều</h2>
          <div className="space-y-2">
            {data.topCustomers.map((x) => (
              <div key={x.id} className="flex justify-between text-sm">
                <span>{x.name}</span>
                <span className="text-emerald-400">{x.spend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="p-4">Phòng</th>
              <th className="p-4">Loại</th>
              <th className="p-4">Ngày</th>
              <th className="p-4">Giờ vào</th>
              <th className="p-4">Thời lượng</th>
              <th className="p-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data.recentActivities.map((a) => (
              <tr key={a.id} className="border-t border-white/10">
                <td className="p-4">{a.room}</td>
                <td className="p-4">{a.type}</td>
                <td className="p-4">{a.date}</td>
                <td className="p-4">{a.start}</td>
                <td className="p-4">{a.duration}</td>
                <td className="p-4">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


