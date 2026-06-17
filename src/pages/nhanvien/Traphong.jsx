import { useEffect, useState } from 'react'

import CurrentTimeBox from '@/components/CurrentTimeBox'

const parseTimeToDate = (timeString, referenceDate = new Date()) => {
    const [hours = 0, minutes = 0] = String(timeString || '')
        .trim()
        .split(':')
        .map(Number)
    const date = new Date(referenceDate)
    date.setHours(hours, minutes, 0, 0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
}

const normalizeSessionMinutes = (timeIn, now = new Date()) => {
    const startDate = parseTimeToDate(timeIn, now)
    const start = new Date(startDate)

    if (start > now) {
        start.setDate(start.getDate() - 1)
    }

    const diffMs = Math.max(0, now - start)
    return Math.ceil(diffMs / 1000 / 60)
}

const formatDuration = minutes => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hrs === 0) return `${mins} phút`
    if (mins === 0) return `${hrs} giờ`
    return `${hrs} giờ ${mins} phút`
}

// 1. DỮ LIỆU GỐC ĐÃ ĐƯỢC CHUẨN HÓA CẤU TRÚC DỊCH VỤ VÀ THỜI GIAN
// Đã thêm 1 phòng giả lập không có số điện thoại để kiểm thử tính năng tích điểm
const INITIAL_ROOMS = [
    {
        id: '402',
        type: 'VIP',
        customerName: 'Nguyễn Quốc Đạt',
        phone: '0905 123 456',
        timeIn: '14:00',
        ThoiGianDuKienRa: '17:30', // Loại 1: Thuê cố định giờ (Có đếm ngược)
        roomPricePerHour: 150000,
        services: [
            {
                name: 'Bia Tiger',
                qty: 6,
                price: '25.000',
                img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100'
            },
            {
                name: 'Trái cây đĩa (Lớn)',
                qty: 1,
                price: '150.000',
                img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=100'
            },
            {
                name: 'Snack Oishi',
                qty: 3,
                price: '15.000',
                img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100'
            }
        ]
    },
    {
        id: '105',
        type: 'Thường',
        customerName: 'Trần Hoàng Long',
        phone: '0935 999 888',
        timeIn: '15:15',
        ThoiGianDuKienRa: null, // Loại 2: Hát trực tiếp (Tính theo giờ thực tế)
        roomPricePerHour: 80000,
        services: [
            {
                name: 'Nước suối Aquafina',
                qty: 2,
                price: '15.000',
                img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=100'
            },
            {
                name: 'Hạt hướng dương',
                qty: 1,
                price: '15.000',
                img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=100'
            }
        ]
    },
    {
        id: '201',
        type: 'Thường',
        customerName: 'Khách vãng lai',
        phone: '',
        timeIn: '16:00',
        ThoiGianDuKienRa: null,
        roomPricePerHour: 80000,
        services: [
            {
                name: 'Coca Cola',
                qty: 4,
                price: '15.000',
                img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=100'
            }
        ]
    }
]

export default function TraPhongPage() {
    const [rooms, setRooms] = useState(INITIAL_ROOMS)
    const [searchQuery, setSearchQuery] = useState('')
    const [roomTypeFilter, setRoomTypeFilter] = useState('')

    // Quản lý các trạng thái Modals khác nhau
    const [viewingServicesRoom, setViewingServicesRoom] = useState(null)
    const [confirmingCheckoutRoom, setConfirmingCheckoutRoom] = useState(null)
    const [selectedInvoiceRoom, setSelectedInvoiceRoom] = useState(null)

    // Bộ lọc danh sách phòng
    const filteredRooms = rooms.filter(room => {
        const matchesSearch =
            room.id.includes(searchQuery) || room.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = roomTypeFilter === '' || room.type.toLowerCase() === roomTypeFilter.toLowerCase()
        return matchesSearch && matchesType
    })

    // Xử lý xác nhận thanh toán -> Chuyển sang hiển thị Hóa Đơn hoàn chỉnh
    const handleConfirmCheckout = processedRoomData => {
        setConfirmingCheckoutRoom(null)
        setSelectedInvoiceRoom(processedRoomData)
    }

    // Cập nhật thông tin SĐT khách hàng từ hóa đơn vào state tổng của phòng
    const handleUpdateRoomPhone = (roomId, newPhone) => {
        setRooms(prevRooms => prevRooms.map(r => (r.id === roomId ? { ...r, phone: newPhone } : r)))
    }

    return (
        <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
            {/* Link FontAwesome để hiển thị icon */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent uppercase">
                    Danh Sách Phòng Đang Hát
                </h1>
                <CurrentTimeBox />
            </header>

            {/* --- THANH BỘ LỌC (FILTER BAR) --- */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 backdrop-blur-md shadow-lg">
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4b5fd]">
                        <i className="fas fa-search"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm theo tên khách hoặc số phòng..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 pl-11 pr-4 py-3 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 transition"
                    />
                </div>
                <select
                    value={roomTypeFilter}
                    onChange={e => setRoomTypeFilter(e.target.value)}
                    className="bg-[#1e1b4b] border border-white/10 px-4 py-3 rounded-xl text-[#c4b5fd] text-sm outline-none cursor-pointer focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 min-w-full sm:min-w-[200px] transition"
                >
                    <option value="" className="bg-[#1e1b4b]">
                        Tất cả loại phòng
                    </option>
                    <option value="thường" className="bg-[#1e1b4b]">
                        Phòng thường
                    </option>
                    <option value="vip" className="bg-[#1e1b4b]">
                        Phòng VIP
                    </option>
                </select>
            </div>

            {/* --- LƯỚI DANH SÁCH PHÒNG --- */}
            {filteredRooms.length === 0 ? (
                <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <i className="fas fa-folder-open text-4xl text-[#c4b5fd]/40 mb-3 block"></i>
                    <p className="text-slate-400 text-sm">Không tìm thấy phòng nào phù hợp.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredRooms.map(room => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onViewServices={() => setViewingServicesRoom(room)}
                            onCheckoutClick={() => setConfirmingCheckoutRoom(room)}
                        />
                    ))}
                </div>
            )}

            {/* --- MODAL 1: XEM CHI TIẾT DỊCH VỤ --- */}
            {viewingServicesRoom && (
                <ServiceDetailsModal room={viewingServicesRoom} onClose={() => setViewingServicesRoom(null)} />
            )}

            {/* --- MODAL 2: XÁC NHẬN THANH TOÁN (TÍNH GIỜ THỰC TẾ) --- */}
            {confirmingCheckoutRoom && (
                <CheckoutConfirmModal
                    room={confirmingCheckoutRoom}
                    onClose={() => setConfirmingCheckoutRoom(null)}
                    onConfirm={handleConfirmCheckout}
                />
            )}

            {/* --- MODAL 3: XUẤT HÓA ĐƠN ĐỒNG BỘ --- */}
            {selectedInvoiceRoom && (
                <InvoiceModal
                    room={selectedInvoiceRoom}
                    onClose={() => setSelectedInvoiceRoom(null)}
                    onUpdatePhone={newPhone => handleUpdateRoomPhone(selectedInvoiceRoom.id, newPhone)}
                />
            )}
        </div>
    )
}

// ==========================================
// COMPONENT: THẺ PHÒNG ĐANG HÁT (ROOM CARD) - ĐÃ CẢI TIẾN MÀU SẮC HÀI HÒA
// ==========================================
function RoomCard({ room, onViewServices, onCheckoutClick }) {
    const [timeLeft, setTimeLeft] = useState('')

    useEffect(() => {
        if (!room.ThoiGianDuKienRa) return

        const calculateCountdown = () => {
            const now = new Date()
            const [hours, minutes] = room.ThoiGianDuKienRa.split(':').map(Number)
            const targetTime = new Date()
            targetTime.setHours(hours, minutes, 0, 0)

            const diffMs = targetTime - now

            if (diffMs <= 0) {
                setTimeLeft('Hết giờ thuê!')
                return
            }

            const diffMins = Math.floor(diffMs / 1000 / 60)
            setTimeLeft(`${diffMins} phút`)
        }

        calculateCountdown()
        const interval = setInterval(calculateCountdown, 1000)
        return () => clearInterval(interval)
    }, [room.ThoiGianDuKienRa])

    return (
        <div className="bg-[#1e293b]/40 border border-slate-700/60 hover:border-[#8b5cf6]/80 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-[#8b5cf6]/10">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <span
                        className={`px-2.5 py-1 rounded-lg font-extrabold text-xs tracking-wider ${
                            room.type === 'VIP'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        }`}
                    >
                        PHÒNG {room.id} - {room.type}
                    </span>
                    <span className="text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Đang hát
                    </span>
                </div>

                {/* Khối hiển thị Đếm ngược */}
                {room.ThoiGianDuKienRa && (
                    <div className="mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold">
                        <span>
                            <i className="fas fa-hourglass-start mr-1.5 text-amber-400"></i>Thời gian còn lại:
                        </span>
                        <span className="font-mono tracking-wide bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 font-bold">
                            {timeLeft}
                        </span>
                    </div>
                )}

                <div className="space-y-2.5 text-sm mb-4">
                    <div className="text-slate-300 flex items-center gap-2.5">
                        <i className="fas fa-user w-4 text-slate-400 text-center text-xs"></i>
                        <span className="text-slate-400">
                            Khách: <strong className="text-slate-200 font-semibold">{room.customerName}</strong>
                        </span>
                    </div>
                    <div className="text-slate-300 flex items-center gap-2.5">
                        <i className="fas fa-phone w-4 text-slate-400 text-center text-xs"></i>
                        <span className="text-slate-400">
                            SĐT:{' '}
                            <strong className="text-slate-200 font-semibold">
                                {room.phone || <span className="text-amber-500/80 italic font-normal">Trống</span>}
                            </strong>
                        </span>
                    </div>
                    <div className="text-slate-300 flex items-center gap-2.5">
                        <i className="fas fa-clock w-4 text-slate-400 text-center text-xs"></i>
                        <span className="text-slate-400">
                            Giờ vào: <strong className="text-emerald-400 font-semibold">{room.timeIn}</strong>
                        </span>
                    </div>
                    <div className="text-slate-300 flex items-center gap-2.5">
                        <i className="fas fa-sign-out-alt w-4 text-slate-400 text-center text-xs"></i>
                        <span className="text-slate-400">
                            Giờ ra dự kiến:{' '}
                            <strong className="text-slate-300 font-semibold">
                                {room.ThoiGianDuKienRa || 'Hát tự do'}
                            </strong>
                        </span>
                    </div>
                </div>

                {/* Khối xem dịch vụ nhanh thu gọn */}
                <div className="bg-slate-800/40 border border-slate-700/40 p-3 rounded-xl mb-4 flex justify-between items-center">
                    <div className="truncate pr-2">
                        <span className="text-xs text-slate-400 block font-semibold mb-0.5">Dịch vụ sử dụng:</span>
                        <span className="text-xs text-slate-300 truncate block">
                            {room.services.map(s => `${s.name} (x${s.qty})`).join(', ')}
                        </span>
                    </div>
                    <button
                        onClick={onViewServices}
                        className="text-xs font-bold text-[#c4b5fd] hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10 shrink-0 transition"
                    >
                        Chi tiết
                    </button>
                </div>
            </div>

            <button
                onClick={onCheckoutClick}
                className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-[#8b5cf6]/10 group-hover:shadow-[#8b5cf6]/20"
            >
                <i className="fas fa-file-invoice-dollar"></i> THANH TOÁN NGAY
            </button>
        </div>
    )
}

// ==========================================
// COMPONENT: MODAL XEM CHI TIẾT DỊCH VỤ
// ==========================================
function ServiceDetailsModal({ room, onClose }) {
    const totalServiceCost = room.services.reduce(
        (acc, curr) => acc + parseFloat(curr.price.replace(/\./g, '')) * curr.qty,
        0
    )

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex justify-center items-center p-4">
            <div className="bg-[#1e1b4b] border border-white/10 text-white w-full max-w-[500px] p-6 rounded-2xl shadow-2xl transition-all">
                <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-[#c4b5fd]">
                        <i className="fas fa-wine-glass-alt"></i> Chi tiết dịch vụ - Phòng {room.id}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">
                        &times;
                    </button>
                </div>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {room.services.map((service, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5"
                        >
                            <img
                                src={service.img}
                                alt={service.name}
                                className="w-12 h-12 rounded-lg object-cover bg-slate-800"
                            />
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-white">{service.name}</h4>
                                <div className="text-xs text-slate-400 mt-0.5">
                                    Đơn giá: <span className="text-slate-300">{service.price}đ</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-[#c4b5fd] font-bold">SL: x{service.qty}</div>
                                <div className="text-sm font-bold text-white mt-0.5">
                                    {(parseFloat(service.price.replace(/\./g, '')) * service.qty).toLocaleString(
                                        'vi-VN'
                                    )}
                                    đ
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                    <div>
                        <span className="text-xs text-slate-400 block">Tổng tiền dịch vụ:</span>
                        <span className="text-lg font-black text-orange-400">
                            {totalServiceCost.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// COMPONENT: MODAL XÁC NHẬN THANH TOÁN (CHỐT GIỜ)
// ==========================================
function CheckoutConfirmModal({ room, onClose, onConfirm }) {
    const [currentTimeStr, setCurrentTimeStr] = useState('')
    const [durationText, setDurationText] = useState('')
    const [calculatedData, setCalculatedData] = useState(null)

    useEffect(() => {
        const now = new Date()
        const currentHourStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })
        setCurrentTimeStr(currentHourStr)

        const totalMinutes = normalizeSessionMinutes(room.timeIn, now)
        const durationStr = formatDuration(totalMinutes)
        setDurationText(durationStr)

        const useHoursDecimal = Math.max(0, totalMinutes / 60)
        const roomCost = Math.round(useHoursDecimal * room.roomPricePerHour)

        const serviceCost = room.services.reduce((acc, curr) => {
            return acc + parseFloat(curr.price.replace(/\./g, '')) * curr.qty
        }, 0)

        const subtotal = roomCost + serviceCost

        const billItems = [
            {
                name: `Giờ hát (Phòng ${room.type})`,
                quantity: parseFloat(useHoursDecimal.toFixed(2)),
                price: room.roomPricePerHour,
                total: roomCost
            },
            ...room.services.map(s => ({
                name: s.name,
                quantity: s.qty,
                price: parseFloat(s.price.replace(/\./g, '')),
                total: parseFloat(s.price.replace(/\./g, '')) * s.qty
            }))
        ]

        setCalculatedData({
            ...room,
            timeOut: currentHourStr,
            duration: durationStr,
            subtotal,
            items: billItems
        })
    }, [room])

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex justify-center items-center p-4">
            <div className="bg-[#1e1b4b] border border-violet-500/30 text-white w-full max-w-[450px] p-6 rounded-2xl shadow-2xl text-center">
                <div className="w-16 h-16 bg-violet-500/10 text-violet-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-violet-500/20 animate-pulse">
                    <i className="fas fa-file-invoice-dollar"></i>
                </div>

                <h3 className="text-xl font-black tracking-wide uppercase mb-2">Xác Nhận Trả Phòng?</h3>
                <p className="text-slate-300 text-sm mb-4">
                    Hệ thống sẽ thực hiện chốt giờ dùng và tính tiền hóa đơn ngay lập tức cho{' '}
                    <span className="text-[#c4b5fd] font-bold">Phòng {room.id}</span>.
                </p>

                <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-left space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-400">Giờ khách vào:</span>
                        <b className="text-white">{room.timeIn}</b>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Giờ ra hiện tại (chốt):</span>
                        <b className="text-emerald-400 font-black">{currentTimeStr}</b>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Tổng thời gian sử dụng:</span>
                        <b className="text-[#c4b5fd] font-bold">{durationText}</b>
                    </div>
                </div>

                {/* KHỐI SELECT CHỌN LOẠI NGÀY MỚI THÊM VÀO */}
                <div className="text-left mb-6">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Áp dụng giá cho ngày:
                    </label>
                    <select className="w-full bg-black/40 border border-violet-500/20 rounded-xl px-4 py-3 text-sm text-slate-200 font-medium focus:outline-none focus:border-violet-500 transition cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a78bfa%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_16px_center] bg-no-repeat pr-10">
                        <option value="NGAY_THUONG" className="bg-[#1e1b4b] text-white">
                            Ngày thường
                        </option>
                        <option value="CUOI_TUAN" className="bg-[#1e1b4b] text-white">
                            Cuối tuần
                        </option>
                        <option value="NGAY_LE" className="bg-[#1e1b4b] text-white">
                            Ngày lễ
                        </option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => calculatedData && onConfirm({ ...calculatedData })}
                        className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-3 rounded-xl text-sm transition"
                    >
                        ĐỒNG Ý CHỐT GIỜ
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-3 rounded-xl font-bold text-sm border border-white/10 transition"
                    >
                        HỦY LẠI KHÁCH
                    </button>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// COMPONENT: MODAL HÓA ĐƠN (BỔ SUNG MÃ HÓA ĐƠN & ĐIỂM 1:1)
// ==========================================
function InvoiceModal({ room, onClose, onUpdatePhone }) {
    const [phoneNumber] = useState(room.phone || '')
    const [qrUrl, setQrUrl] = useState('')

    // THÊM RIÊNG: Khởi tạo mã hóa đơn ngẫu nhiên khi mở modal (hoặc lấy từ room.invoiceId nếu có)
    const [invoiceId] = useState(
        () => room.invoiceId || `HD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    )

    // Giả lập điểm sẵn có của khách (Tỷ lệ 1:1 -> 50.000đ)
    const [availablePoints] = useState(50000)
    const [isUsingPoints, setIsUsingPoints] = useState(false)
    const [pointsUsed, setPointsUsed] = useState(0)

    const maxPointsNeeded = room.subtotal
    const calculatedPointsToUse = Math.min(availablePoints, maxPointsNeeded)
    const discountAmount = pointsUsed
    const finalPayAmount = Math.max(0, room.subtotal - discountAmount)

    useEffect(() => {
        if (isUsingPoints) {
            setPointsUsed(calculatedPointsToUse)
        } else {
            setPointsUsed(0)
        }
    }, [isUsingPoints, calculatedPointsToUse])

    // Nhúng cả invoiceId vào QR Code để đối soát hệ thống thuận tiện hơn
    useEffect(() => {
        const rawPayload = `https://musicbox.com/pay?invoice=${invoiceId}&amount=${finalPayAmount}&room=${room.id}`
        setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(rawPayload)}`)
    }, [finalPayAmount, room.id, invoiceId])

    const handleFinalizeInvoice = () => {
        if (!room.phone && phoneNumber.trim() !== '') {
            onUpdatePhone(phoneNumber.trim())
        }
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex justify-center items-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-[#1e1b4b]/90 border border-white/10 text-white w-full max-w-[550px] p-5 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-h-[92vh] overflow-y-auto transform transition-all print:absolute print:inset-0 print:bg-white print:text-black print:p-0 print:max-h-none">
                {/* Header Bill */}
                <div className="text-center mb-5 border-b-2 border-white/20 pb-4 print:border-slate-800">
                    <h2 className="text-xl font-black text-white tracking-wider print:text-black">
                        HÓA ĐƠN THANH TOÁN
                    </h2>
                    {/* HIỂN THỊ MÃ HÓA ĐƠN */}
                    <p className="text-xs font-bold text-amber-400 mt-1 tracking-widest print:text-slate-800">
                        MÃ HĐ: {invoiceId}
                    </p>
                    <p className="text-xs text-[#c4b5fd] font-semibold uppercase mt-1 print:text-slate-600">
                        MusicBox Karaoke - Chất Lượng Đỉnh Cao
                    </p>
                    <p className="text-[11px] text-slate-400 print:text-slate-500">Đ/C: Quận Liên Chiểu, TP. Đà Nẵng</p>
                </div>

                {/* Khách hàng Info */}
                <div className="mb-5 text-sm space-y-2 border-b border-dashed border-white/10 pb-4 print:border-slate-300 print:text-black">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <p>
                            <span className="text-slate-400 print:text-slate-500">Khách hàng:</span>{' '}
                            <b className="text-white print:text-black">{room.customerName}</b>
                        </p>
                        <p>
                            <span className="text-slate-400 print:text-slate-500">Số điện thoại:</span>{' '}
                            <b className="text-white print:text-black">
                                {phoneNumber || (
                                    <span className="text-amber-400 italic font-normal">(Chưa thiết lập)</span>
                                )}
                            </b>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-white/5 print:border-slate-100">
                        <p>
                            <span className="text-slate-400 print:text-slate-500">Phòng:</span>{' '}
                            <b className="text-[#c4b5fd] print:text-black">
                                {room.id} ({room.type})
                            </b>
                        </p>
                        <p>
                            <span className="text-slate-400 print:text-slate-500">Ngày thanh toán:</span>{' '}
                            <b className="text-white print:text-black">{new Date().toLocaleDateString('vi-VN')}</b>
                        </p>
                    </div>

                    {/* Khối hiển thị thời gian */}
                    <div className="grid grid-cols-3 gap-2 pt-2 mt-1 text-xs bg-black/20 p-2.5 rounded-xl border border-white/5 print:bg-slate-50 print:border-slate-200 print:text-black">
                        <div className="text-center border-r border-white/10 print:border-slate-200">
                            <span className="text-slate-400 block mb-0.5 print:text-slate-500">Giờ vào</span>
                            <b className="text-emerald-400 font-bold text-sm print:text-black">{room.timeIn}</b>
                        </div>
                        <div className="text-center border-r border-white/10 print:border-slate-200">
                            <span className="text-slate-400 block mb-0.5 print:text-slate-500">Giờ ra</span>
                            <b className="text-rose-400 font-bold text-sm print:text-black">
                                {room.timeOut ||
                                    new Date().toLocaleTimeString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                            </b>
                        </div>
                        <div className="text-center">
                            <span className="text-slate-400 block mb-0.5 print:text-slate-500">Tổng thời gian</span>
                            <b className="text-[#c4b5fd] font-bold text-sm print:text-black">{room.duration}</b>
                        </div>
                    </div>
                </div>

                {/* Bảng kê chi tiết tổng hợp phòng và dịch vụ */}
                <div className="w-full overflow-x-auto mb-5">
                    <table className="w-full text-left border-collapse text-sm min-w-[420px]">
                        <thead>
                            <tr className="border-b border-white/20 print:border-slate-300">
                                <th className="py-2.5 text-xs font-bold text-[#c4b5fd] uppercase print:text-slate-500">
                                    Nội dung
                                </th>
                                <th className="py-2.5 text-center text-xs font-bold text-[#c4b5fd] uppercase w-12 print:text-slate-500">
                                    SL
                                </th>
                                <th className="py-2.5 text-right text-xs font-bold text-[#c4b5fd] uppercase w-24 print:text-slate-500">
                                    Đơn giá
                                </th>
                                <th className="py-2.5 text-right text-xs font-bold text-[#c4b5fd] uppercase w-24 print:text-slate-500">
                                    T.Tiền
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 print:divide-slate-100">
                            {room.items &&
                                room.items.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-white/5 transition-colors print:hover:bg-transparent"
                                    >
                                        <td className="py-3 text-slate-200 font-medium print:text-slate-800">
                                            {item.name}
                                        </td>
                                        <td className="py-3 text-center font-semibold text-white print:text-black">
                                            {item.quantity}
                                        </td>
                                        <td className="py-3 text-right text-slate-300 print:text-slate-600">
                                            {item.price.toLocaleString('vi-VN')}
                                        </td>
                                        <td className="py-3 text-right font-bold text-[#c4b5fd] print:text-slate-900">
                                            {item.total.toLocaleString('vi-VN')}đ
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Khối tính tiền - Tích điểm & Nhập SĐT */}
                {room.phone && (
                    <div className="border-t border-white/20 pt-4 space-y-3 print:border-slate-800">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 print:text-slate-600">Tạm tính (Phòng + DV):</span>
                            <b className="text-white font-bold print:text-black">
                                {room.subtotal.toLocaleString('vi-VN')}đ
                            </b>
                        </div>

                        {/* ACTIVE TOGGLE BAR SỬ DỤNG ĐIỂM (1:1) */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex flex-col gap-2 print:hidden">
                            <div className="flex justify-between items-center">
                                <div className="text-sm">
                                    <span className="text-slate-300 block font-semibold">Sử dụng điểm tích lũy</span>
                                    <span className="text-xs text-slate-400">
                                        Khả dụng:{' '}
                                        <strong className="text-amber-400">
                                            {availablePoints.toLocaleString('vi-VN')}đ
                                        </strong>
                                    </span>
                                </div>

                                {/* Nút Gạt */}
                                <button
                                    type="button"
                                    onClick={() => setIsUsingPoints(!isUsingPoints)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${
                                        isUsingPoints ? 'bg-emerald-500' : 'bg-slate-600'
                                    }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                                            isUsingPoints ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Chi tiết khấu trừ hiển thị khi bật */}
                            {isUsingPoints && (
                                <div className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1.5 rounded-lg flex justify-between">
                                    <span>
                                        <i className="fas fa-check-circle mr-1"></i> Khấu trừ:{' '}
                                        <b>{pointsUsed.toLocaleString('vi-VN')}đ</b>
                                    </span>
                                    <span>
                                        Còn lại: <b>{(availablePoints - pointsUsed).toLocaleString('vi-VN')}đ</b>
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-dashed border-white/10 text-base font-black text-rose-400 print:border-slate-300 print:text-red-600">
                            <span>TỔNG THANH TOÁN:</span>
                            <span className="tracking-tight text-xl text-rose-400 print:text-red-600">
                                {finalPayAmount.toLocaleString('vi-VN')}đ
                            </span>
                        </div>
                    </div>
                )}

                {/* QR Code động */}
                <div className="mt-6 p-4 bg-black/20 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 print:border-none print:bg-white print:mt-4">
                    <span className="text-xs font-bold text-[#c4b5fd] uppercase tracking-wide print:text-slate-500">
                        Quét mã để thanh toán
                    </span>
                    {qrUrl ? (
                        <img
                            src={qrUrl}
                            alt="QR Code"
                            className="w-32 h-32 border-4 border-white/10 bg-white p-1 shadow-md rounded-lg print:border-slate-200"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-white/5 animate-pulse rounded-lg"></div>
                    )}
                </div>

                {/* Nút thao tác cuối */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
                    <button
                        onClick={() => {
                            if (!room.phone && phoneNumber.trim() !== '') onUpdatePhone(phoneNumber.trim())
                            window.print()
                        }}
                        className="w-full sm:flex-[2] bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-[#8b5cf6]/10"
                    >
                        <i className="fas fa-print"></i> IN HÓA ĐƠN
                    </button>
                    <button
                        onClick={handleFinalizeInvoice}
                        className="w-full sm:flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold py-3.5 rounded-xl text-sm transition"
                    >
                        ĐÓNG
                    </button>
                </div>
            </div>
        </div>
    )
}
