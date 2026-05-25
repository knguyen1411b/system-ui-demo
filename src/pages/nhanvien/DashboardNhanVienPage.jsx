import { useState } from 'react';
import TraPhong from './TraPhong';
import { BellRing } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardNhanVienPage() {
  // 1. Quản lý trạng thái đóng/mở Sidebar trên Mobile Layout
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. Trạng thái đóng/mở các danh mục Accordion trong Sidebar
  const [isRoomGroupOpen, setIsRoomGroupOpen] = useState(true);
  const [isRequestGroupOpen, setIsRequestGroupOpen] = useState(false);

  // 3. State điều khiển đổi trang nội bộ
  const [currentPage, setCurrentPage] = useState('traphong');

  // Hàm render nội dung Sidebar (Tránh khai báo dạng Component lồng nhau gây re-render)
  const renderSidebarContent = () => (
    <div className="w-[260px] h-full bg-[#1e1b4b]/70 text-slate-100 border-r border-white/10 flex flex-col backdrop-blur-xl">
      {/* Thương hiệu */}
      <div className="py-8 text-xl font-extrabold text-[#8b5cf6] text-center tracking-[0.2em] border-b border-white/5">
        MUSICBOX
      </div>

      {/* Hồ sơ nhân viên (Hiệu ứng Glassmorphic) */}
      <div className="m-5 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center text-white shadow-lg shadow-[#8b5cf6]/30">
          <i className="fas fa-user-tie"></i>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide text-slate-200">Nguyễn Quốc Đạt</span>
          <span className="text-[10px] text-[#c4b5fd] font-bold uppercase tracking-wider mt-0.5">Nhân viên</span>
        </div>
      </div>

      {/* Menu các nhóm chức năng */}
      <nav className="flex-1 px-4 space-y-3 overflow-y-auto">

        {/* NHÓM CHỨC NĂNG 1: QUẢN LÝ PHÒNG */}
        <div className="space-y-1.5">
          <div
            onClick={() => setIsRoomGroupOpen(!isRoomGroupOpen)}
            className={`px-4 py-3 flex justify-between items-center rounded-xl cursor-pointer transition-all duration-200 ${isRoomGroupOpen ? 'text-white bg-white/5' : 'text-slate-400 hover:text-[#c4b5fd] hover:bg-white/5'
              }`}
          >
            <div className="flex items-center gap-3.5 text-base font-semibold tracking-wide">
              <LayoutDashboard className={`w-5 h-5 transition-colors ${isRoomGroupOpen ? 'text-[#8b5cf6]' : 'text-[#c4b5fd]'}`} />
              <span>Quản lý phòng</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isRoomGroupOpen ? 'rotate-180 text-[#8b5cf6]' : 'text-slate-400'}`} />
          </div>

          <div className={`pl-12 space-y-1 transition-all duration-300 overflow-hidden ${isRoomGroupOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <a href="#thuephong" className="block py-2.5 text-sm text-slate-400 hover:text-white transition-colors duration-150">Thuê phòng</a>
            <a href="#checkin" className="block py-2.5 text-sm text-slate-400 hover:text-white transition-colors duration-150">Check-in đặt phòng</a>
            <a
              href="#traphong"
              onClick={(e) => { e.preventDefault(); setCurrentPage('traphong'); setIsSidebarOpen(false); }}
              className={`block py-2.5 text-sm transition-all duration-150 font-bold relative before:absolute before:left-[-14px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:rounded-full ${currentPage === 'traphong'
                  ? 'text-[#8b5cf6] before:bg-[#8b5cf6]'
                  : 'text-slate-400 hover:text-white before:bg-transparent'
                }`}
            >
              Trả phòng
            </a>
          </div>
        </div>

        {/* NHÓM CHỨC NĂNG 2: TIẾP NHẬN YÊU CẦU */}
        <div className="space-y-1.5">
          <div
            onClick={() => setIsRequestGroupOpen(!isRequestGroupOpen)}
            className={`px-4 py-3 flex justify-between items-center rounded-xl cursor-pointer transition-all duration-200 ${isRequestGroupOpen ? 'text-white bg-white/5' : 'text-slate-400 hover:text-[#c4b5fd] hover:bg-white/5'
              }`}
          >
            <div className="flex items-center gap-3.5 text-base font-semibold tracking-wide">
              <BellRing className={`w-5 h-5 transition-colors ${isRequestGroupOpen ? 'text-[#8b5cf6]' : 'text-[#c4b5fd]'}`} />
              <span>Tiếp nhận yêu cầu</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isRequestGroupOpen ? 'rotate-180 text-[#8b5cf6]' : 'text-slate-400'}`} />
          </div>

          <div className={`pl-12 space-y-1 transition-all duration-300 overflow-hidden ${isRequestGroupOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
            <a href="#dichvu" className="block py-2.5 text-sm text-slate-400 hover:text-white transition-colors duration-150">Dịch vụ</a>
            <a href="#baohong" className="block py-2.5 text-sm text-slate-400 hover:text-white transition-colors duration-150">Báo hỏng</a>
          </div>
        </div>

      </nav>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#1e1b4b] text-slate-100 flex overflow-hidden antialiased font-sans relative">

      {/* Hiệu ứng hào quang phát sáng phía sau (Glow Background) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8b5cf6]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#6d28d9]/20 blur-[120px] pointer-events-none" />

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
      <aside className={`fixed inset-y-0 left-0 h-full z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {renderSidebarContent()}
      </aside>

      {/* --- PHÂN KHU RUỘT CONTENT CHÍNH --- */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px] print:pl-0">

        {/* Thanh Top Header chỉ kích hoạt trên di động */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#1e1b4b]/80 border-b border-white/10 backdrop-blur-xl sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <i className="fas fa-bars"></i>
          </button>
          <span className="text-sm font-black tracking-widest text-[#c4b5fd]">MUSICBOX CONTROL</span>
          <div className="w-8 h-8 rounded-lg bg-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-[#8b5cf6]/20">
            Đ
          </div>
        </header>

        {/* Khung chứa các trang con khi bấm điều hướng */}
        <main className="flex-1 overflow-y-auto relative z-10 print:p-0">
          {currentPage === 'traphong' ? (
            <div className="bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <TraPhong />
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 italic bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
              Tính năng đang được phát triển...
            </div>
          )}
        </main>
      </div>

    </div>
  );
}