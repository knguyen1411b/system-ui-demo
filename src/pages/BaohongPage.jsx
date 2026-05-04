import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMaintenanceReports, updateMaintenanceReportStatus } from '@/services/api';

const STATUSES = ['Chờ tiếp nhận', 'Đang xử lý', 'Đã hoàn thành'];

export default function BaohongPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [draftStatus, setDraftStatus] = useState({});

  const load = async () => {
    const data = await getMaintenanceReports();
    setRows(data);
    setDraftStatus(Object.fromEntries(data.map((x) => [x.id, x.status])));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((r) => {
        const q = `${r.room} ${r.content}`.toLowerCase();
        const matchedSearch = q.includes(search.toLowerCase());
        const matchedStatus = statusFilter === 'Tất cả' || r.status === statusFilter;
        return matchedSearch && matchedStatus;
      }),
    [rows, search, statusFilter]
  );

  const onSave = async (id) => {
    await updateMaintenanceReportStatus(id, draftStatus[id]);
    await load();
  };

  return (
    <div className="min-h-screen bg-[#0f1424] text-white p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Báo hỏng thiết bị</h1>
        <Link to="/" className="px-4 py-2 rounded-xl bg-mb-purple-600 hover:bg-mb-purple-500">
          Về trang chủ
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-gray-400">Tìm:</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm số phòng hoặc nội dung..."
            className="bg-transparent w-full outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/10 rounded-xl px-3 py-2"
        >
          <option>Tất cả</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="glass-card rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="p-3 text-left">Phòng</th>
              <th className="p-3 text-left">Nội dung báo hỏng</th>
              <th className="p-3 text-left">Thời gian yêu cầu</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-white/10 align-top">
                <td className="p-3">
                  <span className="px-2 py-1 bg-mb-purple-600/30 border border-mb-purple-500 rounded-lg font-bold">
                    {r.room}
                  </span>
                </td>
                <td className="p-3 max-w-[500px]">{r.content}</td>
                <td className="p-3">
                  {new Date(r.requestTime).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  <div className="text-xs text-gray-400">
                    {new Date(r.requestTime).toLocaleDateString('vi-VN')}
                  </div>
                </td>
                <td className="p-3">
                  <select
                    value={draftStatus[r.id] || r.status}
                    onChange={(e) =>
                      setDraftStatus((prev) => ({ ...prev, [r.id]: e.target.value }))
                    }
                    className="bg-slate-900 border border-white/20 rounded-lg px-2 py-1"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => onSave(r.id)}
                    className="px-3 py-1 rounded-lg bg-mb-purple-600 hover:bg-mb-purple-500 text-xs"
                  >
                    LƯU
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


