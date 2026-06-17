import { AlertTriangle } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, songTitle, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        
        {/* Đốm sáng đỏ cảnh báo phía sau */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="flex flex-col items-center text-center repair-modal animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          
          <h3 className="text-lg font-bold text-white tracking-wide">Xác nhận xóa bài?</h3>
          <p className="text-xs text-slate-300 mt-2 px-2 leading-relaxed">
            Bạn có chắc chắn muốn xóa bài <span className="text-rose-400 font-semibold">"{songTitle}"</span> ra khỏi hàng chờ không?
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all active:scale-[0.98]"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all active:scale-[0.98]"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}