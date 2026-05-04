import { Link } from 'react-router-dom';

export default function Header({ openMenu, setOpenMenu }) {
  return (
    <>
      {openMenu && (
        <div className="fixed inset-0 z-[999]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenMenu(false)}
          />
          <nav className="absolute right-0 top-0 h-full w-64 bg-[#18123a] shadow-2xl flex flex-col p-6 gap-4 animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-extrabold tracking-tighter">
                MUSIC<span className="text-mb-purple-400">BOX</span>
              </span>
              <button
                onClick={() => setOpenMenu(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Link
              to="/pages/gioithieuhethong"
              className="block bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg text-base font-bold transition-all"
            >
              Giới thiệu hệ thống
            </Link>
            <Link
              to="/pages/dangnhap"
              className="block bg-mb-purple-600 hover:bg-mb-purple-500 px-4 py-3 rounded-lg text-base font-bold transition-all"
            >
              Đăng nhập
            </Link>
          </nav>
        </div>
      )}
      <header className="bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-[100] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-mb-purple-600 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tighter">
              MUSIC<span className="text-mb-purple-400">BOX</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/pages/gioithieuhethong"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-all"
            >
              Giới thiệu hệ thống
            </Link>
            <Link
              to="/pages/dangnhap"
              className="bg-mb-purple-600 hover:bg-mb-purple-500 px-6 py-2 rounded-lg text-sm font-bold transition-all"
            >
              Đăng nhập
            </Link>
          </div>
          <button
            className="md:hidden flex items-center p-2 rounded-lg hover:bg-white/10 transition-all"
            onClick={() => setOpenMenu(true)}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}

