import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import RoomCard from '@/components/RoomCard';
import BookingModal from '@/components/BookingModal';
import { getRooms } from '@/services/api';

export default function HomePage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [keyword, setKeyword] = useState('');
  const [roomType, setRoomType] = useState('Tất cả loại phòng');
  const [status, setStatus] = useState('Tất cả trạng thái');
  const [sortBy, setSortBy] = useState('Sắp xếp theo giá');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getRooms();
      setRooms(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredRooms = useMemo(() => {
    let next = [...rooms];
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      next = next.filter((r) => r.id.toLowerCase().includes(q));
    }
    if (roomType !== 'Tất cả loại phòng') next = next.filter((r) => r.loai === roomType);
    if (status !== 'Tất cả trạng thái') next = next.filter((r) => r.trangThai === status);
    if (sortBy === 'Giá thấp đến cao') next.sort((a, b) => Number(a.gia.n) - Number(b.gia.n));
    if (sortBy === 'Giá cao đến thấp') next.sort((a, b) => Number(b.gia.n) - Number(a.gia.n));
    return next;
  }, [rooms, keyword, roomType, status, sortBy]);

  return (
    <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] min-h-screen text-white flex flex-col">
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <main className="max-w-[1440px] mx-auto px-6 py-10 w-full flex-grow">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-mb-purple-500 pl-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
              Danh sách <span className="text-mb-purple-400">Phòng Hát</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 p-4 glass-card rounded-2xl relative z-40">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="Tìm tên phòng..."
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm focus:border-mb-purple-500 outline-none text-white transition-all"
          />
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full bg-[#1e1b4b] border border-white/10 px-4 py-3 rounded-xl text-sm text-white"
          >
            <option>Tất cả loại phòng</option>
            <option>VIP</option>
            <option>Thường</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#1e1b4b] border border-white/10 px-4 py-3 rounded-xl text-sm text-white"
          >
            <option>Tất cả trạng thái</option>
            <option>Trống</option>
            <option>Đang bận</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-[#1e1b4b] border border-white/10 px-4 py-3 rounded-xl text-sm text-white"
          >
            <option>Sắp xếp theo giá</option>
            <option>Giá thấp đến cao</option>
            <option>Giá cao đến thấp</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onBook={() => setStep(1)} />
            ))
          )}
        </div>
      </main>

      <BookingModal
        step={step}
        setStep={setStep}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
      />

      <footer className="border-t border-white/5 bg-[#0f172a] py-8 text-center text-gray-500 text-sm">
        <p>© 2026 MusicBox Inc. Team AnD2</p>
      </footer>
    </div>
  );
}


