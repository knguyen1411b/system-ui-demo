import { Link } from 'react-router-dom';

const links = [
  ['Trang chủ', '/'],
  ['Bảng điều khiển', '/pages/bangdieukhien'],
  ['Báo hỏng', '/pages/baohong'],
  ['Đăng ký', '/pages/dangky'],
  ['Đăng nhập', '/pages/dangnhap'],
  ['Dịch vụ', '/pages/dichvu'],
  ['Lịch sử', '/pages/lichsu'],
  ['Phòng hiện tại', '/pages/phonghientai'],
  ['Quản lý bảng giá', '/pages/quanlybanggia'],
  ['Quản lý dịch vụ', '/pages/quanlydichvu'],
  ['Quản lý loại phòng', '/pages/quanlyloaiphong'],
  ['Quản lý phòng', '/pages/quanlyphong'],
  ['Quản lý tài khoản', '/pages/quanlytaikhoan'],
  ['Thuê phòng', '/pages/thuephong'],
  ['Trang cá nhân', '/pages/trangcanhan'],
  ['Trả phòng', '/pages/traphong'],
];

export default function GioiThieuHeThongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-purple-300 font-bold">
              Music Box
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
              Giới thiệu hệ thống
            </h1>
            <p className="text-gray-300 mt-2">
              Trang tổng hợp liên kết đến toàn bộ màn hình hiện có trong dự án.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all font-semibold"
          >
            Về trang chủ
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all"
            >
              <p className="font-bold">{label}</p>
              <p className="text-sm text-gray-300">{to}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


