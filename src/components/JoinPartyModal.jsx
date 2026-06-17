import { User, Sparkles } from 'lucide-react';

export default function JoinPartyModal({ isOpen, onSubmit }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.username.value.trim();
    if (name) onSubmit(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl shadow-black/40 relative overflow-hidden">
        
        {/* Đốm sáng trang trí phía sau modal */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8b5cf6] rounded-full blur-3xl opacity-40 pointer-events-none"></div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white tracking-wide">Tham Gia Phòng Hát</h3>
          <p className="text-xs text-[#c4b5fd] mt-1">Vui lòng nhập tên của bạn để đặt bài hát vào hàng chờ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#c4b5fd] uppercase tracking-wider mb-2">Tên của bạn</label>
            <div className="relative flex items-center">
              <input 
                type="text" 
                name="username"
                required
                placeholder="Nhập biệt danh của bạn..." 
                className="w-full bg-black/30 border border-white/10 focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-400"
              />
              <User className="absolute left-3.5 w-4 h-4 text-[#c4b5fd]" />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#6d28d9] text-white text-sm font-bold shadow-lg shadow-[#8b5cf6]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Vào Phòng Ngay</span>
            <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          </button>
        </form>
      </div>
    </div>
  );
}