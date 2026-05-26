import QR_DAT_PHONG from '@/assets/imgs/QRDatPhong.png';

export default function BookingQrModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-sm rounded-3xl p-8 border border-violet-500/30 shadow-2xl shadow-violet-500/20 flex flex-col items-center text-center space-y-6">
        
        {/* Mã đặt phòng */}
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Mã đặt phòng</p>
          <p className="text-3xl font-black text-violet-400">#{booking.id}</p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center py-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full group-hover:bg-violet-500/40 transition-all"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <img
                src={QR_DAT_PHONG}
                alt="QR Booking"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Quét để check-in
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm transition-all mt-4"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
