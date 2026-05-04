import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServiceRequests, updateServiceRequestStatus } from '@/services/api';

export default function DichvuPage() {
  const [rows, setRows] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    getServiceRequests().then((data) => {
      setRows(data);
      setStatusMap(Object.fromEntries(data.map((x) => [x.id, x.status])));
    });
  }, []);

  const grouped = useMemo(
    () =>
      rows.reduce((acc, x) => {
        acc[x.room] = acc[x.room] || [];
        acc[x.room].push(x);
        return acc;
      }, {}),
    [rows]
  );

  const onSave = async (id) => {
    const status = statusMap[id];
    await updateServiceRequestStatus(id, status);
    setRows(await getServiceRequests());
    alert('Đã cập nhật trạng thái');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Tiếp nhận dịch vụ</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <div className="space-y-5">
        {Object.entries(grouped).map(([room, list]) => (
          <div key={room} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-bold">{room}</h2>
              <span className="text-xs bg-mb-purple-600/30 border border-mb-purple-500 px-2 py-1 rounded-full">
                {list.length} yêu cầu
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-400">
                  <tr>
                    <th className="p-3 text-left">Sản phẩm</th>
                    <th className="p-3 text-left">SL</th>
                    <th className="p-3 text-left">Giờ</th>
                    <th className="p-3 text-left">Trạng thái</th>
                    <th className="p-3 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((x) => (
                    <tr key={x.id} className="border-t border-white/10">
                      <td className="p-3">
                        <b>{x.item}</b>
                        <div className="text-xs text-gray-400">{x.category}</div>
                      </td>
                      <td className="p-3">{x.qty}</td>
                      <td className="p-3">{x.requestTime}</td>
                      <td className="p-3">
                        <select
                          value={statusMap[x.id] || x.status}
                          onChange={(e) =>
                            setStatusMap((prev) => ({ ...prev, [x.id]: e.target.value }))
                          }
                          className="bg-slate-800 border border-white/20 rounded-lg px-2 py-1"
                        >
                          <option>Chờ xử lý</option>
                          <option>Đã giao</option>
                          <option>Hủy</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => onSave(x.id)}
                          className="px-3 py-1 rounded-lg bg-mb-purple-600 hover:bg-mb-purple-500 text-xs"
                        >
                          Lưu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


