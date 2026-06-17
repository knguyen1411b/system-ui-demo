import { useState } from 'react'

import { Chart as ChartJS, registerables } from 'chart.js'
import {
    CategoryScale,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    // <-- Thằng này chính là thủ phạm gây ra lỗi "linear" is not a registered scale
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import {
    ChevronDown,
    ConciergeBell,
    Layers,
    LayoutDashboard,
    LogOut,
    Settings,
    Sliders,
    Tags,
    Users
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import Logo from '@/components/Logo'

ChartJS.register(...registerables)

// Đăng ký BẮT BUỘC ngay tại file dùng biểu đồ
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function Dashboard() {
    const [openSettings, setOpenSettings] = useState(false)
    const user = { name: 'Nguyễn Văn Quản Lý' }

    // Khấu hình Menu Items đồng bộ với Lucide-react components
    const menuItems = [
        {
            id: 'tongquan',
            name: 'Thống kê tổng quan',
            path: '/pages/dashboard-admin',
            end: true,
            icon: LayoutDashboard
        },
        {
            id: 'taikhoan',
            name: 'Quản lý tài khoản',
            path: '/pages/dashboard-admin/taikhoan',
            icon: Users
        },
        {
            id: 'loaiphong',
            name: 'Quản lý loại phòng',
            path: '/pages/dashboard-admin/loaiphong',
            icon: Sliders
        },
        {
            id: 'phong',
            name: 'Quản lý phòng',
            path: '/pages/dashboard-admin/phong',
            icon: Layers
        },
        {
            id: 'dichvu',
            name: 'Quản lý dịch vụ',
            path: '/pages/dashboard-admin/dichvu',
            icon: ConciergeBell
        },
        {
            id: 'banggia',
            name: 'Quản lý bảng giá',
            path: '/pages/dashboard-admin/banggia',
            icon: Tags
        }
    ]

    return (
        <div className="flex h-screen overflow-hidden bg-[#0a0f1d] text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative">
            {/* Background Glow trang trí cho góc Sidebar */}
            <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[40%] rounded-full bg-[#7c3aed]/5 blur-[120px] pointer-events-none" />

            {/* KHỐI SIDEBAR CỐ ĐỊNH BÊN TRÁI */}
            <aside className="w-72 bg-white/[0.02] backdrop-blur-xl border-r border-white/5 flex flex-col h-full relative z-10">
                {/* LOGO AREA */}
                <div className="p-8 flex items-center gap-3 border-b border-white/5">
                    <Logo />
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="flex-1 mt-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {menuItems.map(item => {
                        const IconComponent = item.icon
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `group w-full flex items-center justify-between px-5 py-3.5 rounded-[1.25rem] transition-all duration-300 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-[#7c3aed]/20 to-indigo-600/5 border border-[#7c3aed]/30 text-white shadow-lg shadow-purple-900/10'
                                            : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/[0.03]'
                                    }`
                                }
                            >
                                <div className="flex items-center gap-4">
                                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-[.sidebar-item.active]:text-[#a78bfa]" />
                                    <span className="text-sm font-bold tracking-wide">{item.name}</span>
                                </div>

                                {/* Đốm sáng nhỏ báo hiệu đang Active */}
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] opacity-0 transition-opacity duration-300 group-[.active]:opacity-100" />
                            </NavLink>
                        )
                    })}
                </nav>

                {/* USER PROFILE FOOTER */}
                <div className="p-4 border-t border-white/5 relative">
                    {/* Dropdown Menu Settings */}
                    {openSettings && (
                        <div className="absolute bottom-24 left-4 right-4 bg-[#131a30] border border-white/10 p-2 rounded-2xl shadow-2xl animate-slideUp space-y-1">
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 transition-all">
                                <Settings className="w-4 h-4 text-slate-400" /> Cấu hình hệ thống
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all">
                                <LogOut className="w-4 h-4 text-red-400" /> Đăng xuất
                            </button>
                        </div>
                    )}

                    {/* Profile Card Trigger */}
                    <div
                        onClick={() => setOpenSettings(!openSettings)}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                            openSettings
                                ? 'bg-white/5 border-white/10'
                                : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                        }`}
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-indigo-500 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-purple-500/20">
                                QL
                            </div>
                            <div>
                                <p className="text-xs font-black text-white tracking-wide">{user.name}</p>
                                <p className="text-[9px] text-[#a78bfa] font-black uppercase tracking-widest mt-0.5">
                                    Admin Role
                                </p>
                            </div>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openSettings ? 'rotate-180' : ''}`}
                        />
                    </div>
                </div>
            </aside>

            {/* KHỐI NỘI DUNG ĐỘNG BÊN PHẢI */}
            <main className="flex-1 overflow-y-auto bg-[#070b16] flex flex-col h-full relative z-10">
                <Outlet />
            </main>

            {/* THÊM CSS HOẠT HỌA CHO DROPDOWN */}
            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideUp { animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
        </div>
    )
}
