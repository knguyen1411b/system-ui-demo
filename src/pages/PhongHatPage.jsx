import { useState } from 'react'

import { Check, ListMusic, Play, Plus, Search, Trash2, Tv } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import { ArrowDown } from 'lucide-react'
import { ArrowUp } from 'lucide-react'
import { Share2 } from 'lucide-react'
import { CopyCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import JoinPartyModal from '@/components/JoinPartyModal'

export default function PhongHatPage() {
    // 1. Thêm State này vào ngay đầu hàm PhongHatPage()
    const [userName, setUserName] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(!userName) // Mở modal luôn nếu chưa có tên
    const [deletingSong, setDeletingSong] = useState(null) // Lưu thông tin bài hát đang chọn xóa
    const [copied, setCopied] = useState(false)

    const handleShareLink = () => {
        // Sao chép link hiện tại vào clipboard (chạy được trên cả PC và Mobile)
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)

        // Sau 2 giây tự trả về trạng thái icon share ban đầu
        setTimeout(() => setCopied(false), 2000)
    }

    // 2. Hàm xử lý khi người dùng nhập tên xong
    const handleSaveName = name => {
        setUserName(name)
        setIsModalOpen(false)
    }

    // Hàm đổi vị trí bài hát lên hoặc xuống
    const moveSong = (index, direction) => {
        const newPlaylist = [...playlist]
        const nextIndex = direction === 'up' ? index - 1 : index + 1

        // Kiểm tra giới hạn mảng
        if (nextIndex < 0 || nextIndex >= newPlaylist.length) return

        // Hoán đổi 2 phần tử
        const temp = newPlaylist[index]
        newPlaylist[index] = newPlaylist[nextIndex]
        newPlaylist[nextIndex] = temp

        setPlaylist(newPlaylist)
    }

    // Hàm kích hoạt khi ấn nút thùng rác (Chỉ mở modal và lưu thông tin bài hát)
    const handleRequestRemove = song => {
        setDeletingSong(song)
    }

    // Hàm thực hiện xóa thật sự khi nhấn "Xác nhận xóa" trên Modal
    const handleConfirmDelete = () => {
        if (deletingSong) {
            setPlaylist(playlist.filter(song => song.id !== deletingSong.id))
            setDeletingSong(null) // Đóng modal
        }
    }

    // Giả lập danh sách tìm kiếm
    const mockSearchResults = [
        { id: 1, title: 'Mưa Trên Biển Vắng (Tone Nữ) - Ngọc Lan', duration: '4:35', author: 'Lâm Organ' },
        { id: 2, title: 'Mưa Trên Biển Vắng (Tone Nam) - Nam Trân', duration: '4:20', author: 'Nam Trân Ent' },
        { id: 3, title: 'Mưa Trên Biển Vắng - LALA TRẦN Cover', duration: '5:02', author: 'Nhật Ngân' }
    ]

    // Giả lập hàng chờ (Playlist)
    const [playlist, setPlaylist] = useState([
        { id: 101, title: 'Mưa Trên Biển Vắng (Tone Nữ) - Ngọc Lan', singer: 'Hoàng' },
        { id: 102, title: 'Thành Phố Buồn (Tone Nam)', singer: 'Tuấn' },
        { id: 103, title: 'Duyên Phận (Tone Nữ)', singer: 'Nguyên' }
    ])

    const videoPlaceholder =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZtaITp1VBmbIWnrkRpTHCNuvuENfHefiDw&s'

    return (
        <div
            className="min-h-screen text-slate-100 p-4 md:p-6 font-sans selection:bg-[#8b5cf6]"
            style={{ backgroundColor: '#1e1b4b' }}
        >
            {/* BACKGROUND DECORATION (Tạo hiệu ứng phát sáng phía sau lớp kính) */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#8b5cf6] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6d28d9] rounded-full blur-[150px] opacity-15 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto pb-2 flex items-center justify-between gap-4">
                {/* NÚT TRỞ VỀ PHÒNG HIỆN TẠI */}
                <Link to="/pages/phonghientai">
                    <button className="flex items-center gap-2 py-2 px-1 text-sm font-medium text-[#c4b5fd] hover:text-white transition-all duration-200 group">
                        <ArrowLeft className="w-4 h-4 text-[#8b5cf6] group-hover:-translate-x-1 transition-transform duration-200" />
                        <span>Trở về phòng hiện tại</span>
                    </button>
                </Link>

                {/* HIỂN THỊ TÊN NGƯỜI DÙNG KHI ĐÃ ĐĂNG NHẬP/NHẬP TÊN */}
                {userName && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <span className="text-xs font-medium text-[#c4b5fd]">
                            Thành viên: <span className="text-white font-bold">{userName}</span>
                        </span>
                    </div>
                )}
            </div>

            {/* GỌI MODAL XUỐNG DƯỚI CÙNG CỦA COMPONENT */}
            <JoinPartyModal isOpen={isModalOpen} onSubmit={handleSaveName} />

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* ================= LEFT COLUMN: SEARCH & RESULTS (4 COLS) ================= */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* Logo & Search Box */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
                        {/* Phần Header Logo + Nút Share */}
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-[#c4b5fd] to-[#8b5cf6] bg-clip-text text-transparent flex items-center gap-2">
                                OyAnGhFn
                                <span className="text-xs font-normal text-[#c4b5fd] border border-[#8b5cf6]/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                    PRO
                                </span>
                            </h1>

                            {/* NÚT CHIA SẺ LIÊN KẾT PHÒNG HÁT */}
                            <button
                                onClick={handleShareLink}
                                className={`p-2 rounded-xl border transition-all duration-300 relative group active:scale-95 flex items-center gap-1.5 text-xs font-medium ${
                                    copied
                                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                        : 'bg-white/5 border-white/10 text-[#c4b5fd] hover:text-white hover:border-[#8b5cf6]/50'
                                }`}
                                title={copied ? 'Đã sao chép liên kết!' : 'Chia sẻ phòng hát'}
                            >
                                {copied ? (
                                    <>
                                        <CopyCheck className="w-4 h-4" />
                                        <span className="animate-fade-in">Đã sao chép!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-out whitespace-nowrap">
                                            Chia sẻ
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Ô Tìm Kiếm Bài Hát Giữ Nguyên */}
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                defaultValue="Mưa trên biển"
                                placeholder="Tìm bài hát..."
                                className="w-full bg-black/20 border border-white/10 focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] rounded-xl pl-4 pr-10 py-3 text-sm outline-none transition-all placeholder:text-slate-400"
                            />
                            <Search className="absolute right-3 w-5 h-5 text-[#c4b5fd]" />
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl flex-1 max-h-[500px] lg:max-h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#c4b5fd]">
                            <ListMusic className="w-4 h-4" />
                            <span>Kết quả tìm kiếm</span>
                        </div>

                        <div className="space-y-3">
                            {mockSearchResults.map(song => (
                                <div
                                    key={song.id}
                                    className="group relative flex gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300"
                                >
                                    <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                                        <img
                                            src={videoPlaceholder}
                                            alt="thumbnail"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <span className="absolute bottom-1 right-1 text-[10px] bg-black/60 px-1 rounded text-slate-300">
                                            {song.duration}
                                        </span>
                                    </div>

                                    <div className="flex flex-col justify-between flex-1 min-w-0">
                                        <h4 className="text-sm font-medium line-clamp-2 leading-snug group-hover:text-white transition-colors">
                                            {song.title}
                                        </h4>
                                        <p className="text-xs text-[#c4b5fd]/70 truncate">{song.author}</p>
                                    </div>

                                    <button
                                        className="self-center p-2 rounded-lg bg-[#8b5cf6] hover:bg-[#6d28d9] active:scale-95 text-white shadow-lg shadow-[#8b5cf6]/20 transition-all"
                                        title="Thêm vào hàng chờ"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: PLAYER & PLAYLIST (8 COLS) ================= */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Main Video Player */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden group">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5 shadow-inner">
                            <img
                                src={videoPlaceholder}
                                alt="Main Video Player"
                                className="w-full h-full object-cover opacity-80 filter brightness-90"
                            />

                            {/* Overlay Giao diện Karaoke giống TV */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 p-4 md:p-6 flex flex-col justify-between">
                                {/* Tên bài hát đang phát */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-[10px] md:text-xs bg-[#8b5cf6] text-white px-2 py-0.5 rounded-md font-semibold tracking-wide uppercase shadow-md shadow-[#8b5cf6]/30">
                                            Đang phát
                                        </span>
                                        <h2 className="text-lg md:text-2xl font-bold mt-2 text-white drop-shadow-md">
                                            MƯA TRÊN BIỂN VẮNG{' '}
                                            <span className="text-[#c4b5fd] text-sm md:text-lg font-medium">
                                                *karaoke *tone nữ *ngọc lan
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all">
                                            <Tv className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Giả lập nút Play ở giữa */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <button className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-[#8b5cf6]/90 hover:bg-[#8b5cf6] text-white flex items-center justify-center shadow-xl shadow-[#8b5cf6]/40 border border-white/20 hover:scale-105 active:scale-95 transition-all">
                                        <Play className="w-6 h-6 md:w-8 md:h-8 fill-white translate-x-0.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Playlist / Queue Manager */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                <h3 className="font-bold text-base md:text-lg tracking-wide text-white">
                                    Hàng Chờ Bài Hát ({playlist.length})
                                </h3>
                            </div>
                            <span className="text-xs text-[#c4b5fd] bg-[#6d28d9]/30 border border-[#8b5cf6]/30 px-2 py-1 rounded-lg">
                                Mã phòng: P01
                            </span>
                        </div>

                        {playlist.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 text-sm border border-dashed border-white/10 rounded-xl">
                                Hàng chờ trống. Hãy thêm bài hát từ danh sách bên trái!
                            </div>
                        ) : (
                            <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                                {playlist.map((song, index) => (
                                    <div
                                        key={song.id}
                                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                            index === 0
                                                ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]/40 shadow-inner'
                                                : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/5'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span
                                                className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold ${
                                                    index === 0
                                                        ? 'bg-[#8b5cf6] text-white'
                                                        : 'bg-white/10 text-[#c4b5fd]'
                                                }`}
                                            >
                                                {index === 0 ? <Check className="w-3.5 h-3.5" /> : index + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <p
                                                    className={`text-sm font-medium truncate ${index === 0 ? 'text-white' : 'text-slate-200'}`}
                                                >
                                                    {song.title}
                                                </p>
                                                <p className="text-[11px] text-[#c4b5fd]/80 mt-0.5">
                                                    Yêu cầu bởi:{' '}
                                                    <span className="font-medium text-white/90">{song.singer}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                            {index === 0 && (
                                                <span className="text-[10px] bg-[#6d28d9] border border-[#8b5cf6] text-white px-2 py-1 rounded-md font-medium">
                                                    Tiếp theo
                                                </span>
                                            )}

                                            {/* CỤM NÚT HOÁN ĐỔI VỊ TRÍ (MỚI THÊM) */}
                                            <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
                                                <button
                                                    onClick={() => moveSong(index, 'up')}
                                                    disabled={index === 0}
                                                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all"
                                                    title="Đẩy lên"
                                                >
                                                    <ArrowUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => moveSong(index, 'down')}
                                                    disabled={index === playlist.length - 1}
                                                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all"
                                                    title="Hạ xuống"
                                                >
                                                    <ArrowDown className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            {/* NÚT XÓA BÀI HÁT (CẬP NHẬT LẠI TRONG VÒNG LẶP MAP) */}
                                            <button
                                                onClick={() => handleRequestRemove(song)} // Thay đổi ở đây, truyền cả object 'song' thay vì chỉ truyền id
                                                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-transparent hover:border-rose-500/30 active:scale-95 transition-all"
                                                title="Xóa khỏi hàng chờ"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Đặt ở cuối file trước khi đóng thẻ div ngoài cùng của PhongHatPage */}
            <ConfirmDeleteModal
                isOpen={Boolean(deletingSong)}
                songTitle={deletingSong?.title || ''}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeletingSong(null)}
            />

            {/* CSS Nhúng tạm để làm mượt thanh cuộn (Tùy chọn) */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 9999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(139, 92, 246, 0.4);
                }
            `}</style>
        </div>
    )
}
