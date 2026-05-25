// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import TongQuan from './TongQuan';
import QuanLyTaiKhoan from './QuanLyTaiKhoan';
import QuanLyLoaiPhong from './QuanLyLoaiPhong';
import QuanLyPhong from './QuanLyPhong';
import QuanLyDichVu from './QuanLyDichVu';
import QuanLyBangGia from './QuanLyBangGia';
import Logo from '@/components/Logo';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  // 1. STATE QUẢN LÝ MỤC ĐANG CHỌN TRONG SIDEBAR
  const [currentSubTab, setCurrentSubTab] = useState('tongquan'); // mặc định là Tổng quan
  const [openSettings, setOpenSettings] = useState(false);

  const user = { name: 'Nguyễn Văn Quản Lý' };

  // Dữ liệu cấu trúc Sidebar
  const menuItems = [
    {
      id: 'tongquan',
      name: 'Thống kê tổng quan',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    {
      id: 'taikhoan',
      name: 'Quản lý tài khoản',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    },
    {
      id: 'loaiphong',
      name: 'Quản lý loại phòng',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    },
    {
      id: 'phong',
      name: 'Quản lý phòng',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      id: 'dichvu',
      name: 'Quản lý dịch vụ',
      icon: 'M12 12a5 5 0 110-10 5 5 0 010 10zm0 0v9m-5-4h10M5 18h14a2 2 0 012 2v1H3v-1a2 2 0 012-2z'
    },
    {
      id: 'banggia',
      name: 'Quản lý bảng giá',
      icon: 'M7 7h.01M6 20l6.586-6.586a2 2 0 000-2.828L7.414 5.414A2 2 0 006 4.828V7a2 2 0 01-2 2H1.828a2 2 0 00-1.414.586L6 20z M11 4h10M11 8h10M11 12h6'
    }
  ];

  // HÀM ĐIỀU HƯỚNG NỘI DUNG PHẢI ---
  const renderRightContent = () => {
    switch (currentSubTab) {
      case 'tongquan': return <TongQuan />;
      case 'taikhoan': return < QuanLyTaiKhoan />;
      case 'loaiphong': return < QuanLyLoaiPhong />;
      case 'phong': return < QuanLyPhong />;
      case 'dichvu': return < QuanLyDichVu />;
      case 'banggia': return < QuanLyBangGia />;
      default:
        return <div className="p-8 text-center text-gray-500">Tính năng <span className="text-purple-400 uppercase font-bold">{currentSubTab}</span> đang phát triển.</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a] text-white">

      {/* KHỐI SIDEBAR CỐ ĐỊNH BÊN TRÁI */}
      <aside className="w-64 glass border-r border-white/10 flex flex-col h-full">
        <div className="p-6 flex items-center gap-3">
          <Logo></Logo>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentSubTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentSubTab === item.id ? 'sidebar-item active' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              <span className="text-sm font-bold">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/10 relative">
          <div onClick={() => setOpenSettings(!openSettings)} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-sm">QL</div>
              <div>
                <p className="text-xs font-bold text-gray-200">{user.name}</p>
                <p className="text-[10px] text-gray-500 uppercase">Admin Role</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* KHỐI NỘI DUNG ĐỘNG BÊN PHẢI */}
      <main className="flex-1 overflow-y-auto bg-[#0b0f1a] flex flex-col h-full">
          {renderRightContent()}
      </main>

    </div>
  );
}