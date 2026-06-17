import { useState } from 'react'

import { BellRing, ChevronDown, LayoutDashboard } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import Logo from '@/components/Logo'

export default function DashboardNhanVienPage() {
    // 1. Quản lý trạng thái đóng/mở Sidebar trên Mobile Layout
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // 2. Trạng thái đóng/mở các danh mục Accordion trong Sidebar
    const [isRoomGroupOpen, setIsRoomGroupOpen] = useState(true)
    const [isRequestGroupOpen, setIsRequestGroupOpen] = useState(false)

    // Hàm render nội dung Sidebar
    const renderSidebarContent = () => (
        <div className="w-[260px] h-full bg-[#0f172a]/60 text-slate-200 border-r border-white/5 flex flex-col backdrop-blur-xl">
            {/* Thương hiệu */}
            <div className="p-5 flex items-center border-b border-white/5">
                <Logo />
            </div>

            {/* Hồ sơ nhân viên (Hiệu ứng Glassmorphic đồng bộ) */}
            <div className="m-5 p-4 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center gap-3 backdrop-blur-[5px]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                    <b className="font-['Plus_Jakarta_Sans']">Đ</b>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold tracking-wide text-white">Nguyễn Quốc Đạt</span>
                    <span className="text-[10px] text-[#a78bfa] font-black uppercase tracking-widest mt-0.5">
                        Nhân viên
                    </span>
                </div>
            </div>

            {/* Menu các nhóm chức năng */}
            <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
                {/* NHÓM CHỨC NĂNG 1: QUẢN LÝ PHÒNG */}
                <div className="space-y-1.5">
                    <div
                        onClick={() => setIsRoomGroupOpen(!isRoomGroupOpen)}
                        className={`px-4 py-3 flex justify-between items-center rounded-xl cursor-pointer transition-all duration-300 ${
                            isRoomGroupOpen
                                ? 'text-white bg-white/5'
                                : 'text-gray-400 hover:text-[#a78bfa] hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-3.5 text-sm font-bold tracking-wide uppercase">
                            <LayoutDashboard
                                className={`w-4 h-4 transition-colors ${isRoomGroupOpen ? 'text-[#8b5cf6]' : 'text-gray-400'}`}
                            />
                            <span>Quản lý phòng</span>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${isRoomGroupOpen ? 'rotate-180 text-[#8b5cf6]' : 'text-gray-500'}`}
                        />
                    </div>

                    <div
                        className={`pl-12 space-y-1 transition-all duration-300 overflow-hidden ${isRoomGroupOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <NavLink
                            end
                            to="/pages/dashboard-nhan-vien"
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `block py-2.5 text-sm transition-all duration-150 font-bold relative before:absolute before:left-[-14px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:rounded-full ${
                                    isActive
                                        ? 'text-[#a78bfa] before:bg-[#8b5cf6]'
                                        : 'text-gray-400 hover:text-white before:bg-transparent'
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { textShadow: '0 0 10px rgba(167, 139, 250, 0.4)' } : {}
                            }
                        >
                            Thuê phòng
                        </NavLink>

                        <NavLink
                            to="/pages/dashboard-nhan-vien/checkin"
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `block py-2.5 text-sm transition-all duration-150 font-bold relative before:absolute before:left-[-14px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:rounded-full ${
                                    isActive
                                        ? 'text-[#a78bfa] before:bg-[#8b5cf6]'
                                        : 'text-gray-400 hover:text-white before:bg-transparent'
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { textShadow: '0 0 10px rgba(167, 139, 250, 0.4)' } : {}
                            }
                        >
                            Check-in đặt phòng
                        </NavLink>

                        <NavLink
                            to="/pages/dashboard-nhan-vien/traphong"
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `block py-2.5 text-sm transition-all duration-150 font-bold relative before:absolute before:left-[-14px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:rounded-full ${
                                    isActive
                                        ? 'text-[#a78bfa] before:bg-[#8b5cf6]'
                                        : 'text-gray-400 hover:text-white before:bg-transparent'
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { textShadow: '0 0 10px rgba(167, 139, 250, 0.4)' } : {}
                            }
                        >
                            Trả phòng
                        </NavLink>
                    </div>
                </div>

                {/* NHÓM CHỨC NĂNG 2: TIẾP NHẬN YÊU CẦU */}
                <div className="space-y-1.5">
                    <div
                        onClick={() => setIsRequestGroupOpen(!isRequestGroupOpen)}
                        className={`px-4 py-3 flex justify-between items-center rounded-xl cursor-pointer transition-all duration-300 ${
                            isRequestGroupOpen
                                ? 'text-white bg-white/5'
                                : 'text-gray-400 hover:text-[#a78bfa] hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-3.5 text-sm font-bold tracking-wide uppercase">
                            <BellRing
                                className={`w-4 h-4 transition-colors ${isRequestGroupOpen ? 'text-[#8b5cf6]' : 'text-gray-400'}`}
                            />
                            <span>Tiếp nhận yêu cầu</span>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${isRequestGroupOpen ? 'rotate-180 text-[#8b5cf6]' : 'text-gray-500'}`}
                        />
                    </div>

                    <div
                        className={`pl-12 space-y-1 transition-all duration-300 overflow-hidden ${isRequestGroupOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <NavLink
                            to="/pages/dashboard-nhan-vien/dichvu"
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `block py-2.5 text-sm transition-all duration-150 font-bold relative before:absolute before:left-[-14px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:rounded-full ${
                                    isActive
                                        ? 'text-[#a78bfa] before:bg-[#8b5cf6]'
                                        : 'text-gray-400 hover:text-white before:bg-transparent'
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { textShadow: '0 0 10px rgba(167, 139, 250, 0.4)' } : {}
                            }
                        >
                            Dịch vụ
                        </NavLink>

                        <NavLink
                            to="/pages/dashboard-nhan-vien/baohong"
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `block py-2.5 text-sm transition-all duration-150 font-bold relative before:absolute before:left-[-14px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:rounded-full ${
                                    isActive
                                        ? 'text-[#a78bfa] before:bg-[#8b5cf6]'
                                        : 'text-gray-400 hover:text-white before:bg-transparent'
                                }`
                            }
                            style={({ isActive }) =>
                                isActive ? { textShadow: '0 0 10px rgba(167, 139, 250, 0.4)' } : {}
                            }
                        >
                            Báo hỏng
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )

    return (
        <div className="min-h-screen w-full bg-[#0f172a] bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] text-slate-200 flex overflow-hidden antialiased font-['Plus_Jakarta_Sans',sans-serif] relative">
            {/* Hiệu ứng hào quang phát sáng phía sau (Glow Background) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8b5cf6]/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7c3aed]/15 blur-[120px] pointer-events-none" />

            {/* --- SIDEBAR TRÊN PC --- */}
            <aside className="hidden lg:block w-[260px] h-screen flex-shrink-0 fixed inset-y-0 left-0 z-40">
                {renderSidebarContent()}
            </aside>

            {/* --- SIDEBAR TRÊN ĐIỆN THOẠI (DRAWER CHẠY TRƯỢT) --- */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                />
            )}
            <aside
                className={`fixed inset-y-0 left-0 h-full z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {renderSidebarContent()}
            </aside>

            {/* --- PHÂN KHU RUỘT CONTENT CHÍNH --- */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px] print:pl-0">
                {/* Thanh Top Header di động */}
                <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#0f172a]/80 border-b border-white/5 backdrop-blur-xl sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition"
                        aria-label="Open Menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <span
                        className="text-sm font-black tracking-widest text-[#a78bfa]"
                        style={{ textShadow: '0 0 10px rgba(167, 139, 250, 0.4)' }}
                    >
                        MUSICBOX CONTROL
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#7c3aed] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-purple-600/20">
                        Đ
                    </div>
                </header>

                {/* Khung chứa các trang con khi bấm điều hướng */}
                <main className="flex-1 overflow-y-auto relative z-10 print:p-0 print:overflow-visible">
                    <div className="animate-fadeIn">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
