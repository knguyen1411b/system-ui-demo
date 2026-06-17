import { useState } from 'react'

import CurrentTimeBox from '@/components/CurrentTimeBox'

// Giả định giờ đóng cửa của quán là 24.0 (12h đêm)
const GIO_DONG_CUA = 24.0

// DỮ LIỆU MẪU CÁC PHÒNG VỚI LỊCH ĐẶT TRƯỚC (Schedules)
const INITIAL_ROOMS_DATA = [
    {
        id: '402',
        type: 'VIP',
        capacityText: '5 người',
        capacity: '5',
        img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
        schedules: [
            { batDau: 17.0, ketThuc: 19.0 },
            { batDau: 19.0, ketThuc: 20.0 }
        ]
    },
    {
        id: '305',
        type: 'VIP',
        capacityText: '8 người',
        capacity: '8',
        img: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=500',
        schedules: [{ batDau: 16.0, ketThuc: 18.0 }]
    },
    {
        id: '101',
        type: 'Thường',
        capacityText: '3 người',
        capacity: '5',
        img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
        schedules: [{ batDau: 21.0, ketThuc: 23.0 }]
    }
]

// Dữ liệu giả định khách hàng để demo tìm kiếm SĐT nhanh
const MOCK_CUSTOMERS = [
    { name: 'Nguyễn Văn A', phone: '0905123456', points: 120 },
    { name: 'Trần Thị B', phone: '0914987654', points: 45 },
    { name: 'Lê Hoàng C', phone: '0935111222', points: 350 }
]

export default function ThuePhong() {
    const [appliedTime, setAppliedTime] = useState(new Date().getHours() + new Date().getMinutes() / 60)
    const [rooms] = useState(INITIAL_ROOMS_DATA)
    const [typeFilter, setTypeFilter] = useState('all')
    const [capacityFilter, setCapacityFilter] = useState('all')

    // Quản lý trạng thái chi tiết của từng phòng
    const [roomStates, setRoomStates] = useState({})

    const handleRefreshAvailableRooms = () => {
        const now = new Date()
        now.setHours(15, 0, 0, 0)
        const floatTime = now.getHours() + now.getMinutes() / 60
        setAppliedTime(floatTime)
        setRoomStates({})
        alert('Đã cập nhật danh sách phòng trống theo giờ hiện tại!')
    }

    // Kịch bản Bấm "THUÊ PHÒNG NGAY": Hiện Form chọn Khách hàng & Hình thức hát
    const handleOpenRentForm = (roomId, maxOutTime) => {
        const currentHour = new Date().getHours()
        const defaultOutHour = Math.min(currentHour + 1, Math.floor(maxOutTime))

        setRoomStates(prev => ({
            ...prev,
            [roomId]: {
                ...prev[roomId],
                showForm: true,
                isRented: false,
                // Logic chọn khách hàng
                searchPhone: '',
                selectedCustomer: null,
                // Logic chọn hình thức hát
                rentType: 'tu_do', // Mặc định là Tự do, option còn lại là 'co_dinh'
                outHour: defaultOutHour,
                outMinute: 0
            }
        }))
    }

    // Logic tìm kiếm SĐT nhanh phục vụ Demo khi gõ
    const handlePhoneSearch = (roomId, text) => {
        const found = MOCK_CUSTOMERS.find(c => c.phone.includes(text)) || null
        setRoomStates(prev => ({
            ...prev,
            [roomId]: {
                ...prev[roomId],
                searchPhone: text,
                selectedCustomer: text.length >= 4 ? found : null // Gõ từ 4 số bắt đầu gợi ý luôn khách hàng
            }
        }))
    }

    // Thay đổi Option Giờ hát (Tự do / Cố định)
    const handleRentTypeChange = (roomId, type) => {
        setRoomStates(prev => ({
            ...prev,
            [roomId]: {
                ...prev[roomId],
                rentType: type
            }
        }))
    }

    const handleOutTimeChange = (roomId, field, value) => {
        setRoomStates(prev => ({
            ...prev,
            [roomId]: {
                ...prev[roomId],
                [field]: parseInt(value)
            }
        }))
    }

    // Kịch bản Bấm OK (XÁC NHẬN VÀO PHÒNG): Đóng form và render thẳng ra QR Vé vào phòng
    const handleConfirmRent = (roomId, maxOutTime) => {
        const state = roomStates[roomId]
        let chosenOutTime = GIO_DONG_CUA // Nếu tự do thì lấy mặc định mốc chặn hoặc giờ đóng cửa

        if (state?.rentType === 'co_dinh') {
            chosenOutTime = parseInt(state?.outHour || 0) + parseInt(state?.outMinute || 0) / 60

            if (chosenOutTime <= appliedTime) {
                alert('Thời gian ra dự kiến phải lớn hơn thời gian hiện tại!')
                return
            }
            if (chosenOutTime > maxOutTime) {
                alert(`Thời gian ra vượt quá khung giờ trống cho phép! Vui lòng chọn trước ${formatHour(maxOutTime)}.`)
                return
            }
        }

        const customerName = state?.selectedCustomer ? state.selectedCustomer.name : 'Khách vãng lai'
        const rentTypeText =
            state?.rentType === 'co_dinh'
                ? `Cố định (đến ${state.outHour}:${state.outMinute.toString().padStart(2, '0')})`
                : 'Giờ hát tự do'

        alert(`Đã tiếp nhận phòng ${roomId} thành công!\n- Khách hàng: ${customerName}\n- Hình thức: ${rentTypeText}`)

        setRoomStates(prev => ({
            ...prev,
            [roomId]: {
                ...prev[roomId],
                showForm: false,
                isRented: true,
                expectedCheckout: chosenOutTime,
                qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://musicbox.com/room/${roomId}`
            }
        }))
    }

    const handleCopyLink = textValue => {
        navigator.clipboard.writeText(textValue).then(() => {
            alert('Đã sao chép link phòng!')
        })
    }

    const handleTriggerPrint = roomId => {
        const element = document.getElementById(`room-card-${roomId}`)
        if (element) {
            element.classList.add('printing-target')
            window.print()
            element.classList.remove('printing-target')
        }
    }

    const formatHour = num => {
        const hours = Math.floor(num)
        const minutes = Math.round((num - hours) * 60)
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    return (
        <div className="min-h-screen bg-[#0f172a] p-4 sm:p-8 lg:p-10 text-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
            {/* HEADER */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white to-[#c4b5fd] bg-clip-text text-transparent uppercase">
                    Thuê phòng
                </h1>
                <CurrentTimeBox />
            </header>

            {/* BỘ LỌC */}
            <div className="flex flex-col gap-4 mb-10 print:hidden">
                <div className="flex flex-wrap gap-5 w-full bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg items-end">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
                        <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loại phòng:</label>
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                            <select
                                value={typeFilter}
                                onChange={e => setTypeFilter(e.target.value)}
                                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer w-full"
                            >
                                <option value="all" className="bg-[#1e1b4b]">
                                    Tất cả loại
                                </option>
                                <option value="VIP" className="bg-[#1e1b4b]">
                                    VIP
                                </option>
                                <option value="Thường" className="bg-[#1e1b4b]">
                                    Thường
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
                        <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sức chứa:</label>
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                            <select
                                value={capacityFilter}
                                onChange={e => setCapacityFilter(e.target.value)}
                                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer w-full"
                            >
                                <option value="all" className="bg-[#1e1b4b]">
                                    Tất cả sức chứa
                                </option>
                                <option value="5" className="bg-[#1e1b4b]">
                                    Phòng nhỏ (1-5 người)
                                </option>
                                <option value="8" className="bg-[#1e1b4b]">
                                    Phòng vừa (5-8 người)
                                </option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleRefreshAvailableRooms}
                        className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs px-5 h-[42px] rounded-xl transition-all uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/20"
                    >
                        Tìm phòng trống
                    </button>
                </div>

                <div className="text-xs text-slate-400 pl-1">
                    📊 Đang tính toán dữ liệu phòng trống từ mốc:{' '}
                    <span className="text-purple-400 font-bold font-mono text-sm">{formatHour(appliedTime)}</span>
                </div>
            </div>

            {/* GRID CONTAINER */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] print:block">
                {rooms
                    .filter(
                        room =>
                            (typeFilter === 'all' || room.type === typeFilter) &&
                            (capacityFilter === 'all' || room.capacity === capacityFilter)
                    )
                    .map(room => {
                        const state = roomStates[room.id] || {
                            showForm: false,
                            isRented: false,
                            searchPhone: '',
                            selectedCustomer: null,
                            rentType: 'tu_do',
                            outHour: 0,
                            outMinute: 0,
                            expectedCheckout: 0
                        }

                        const validSchedules = room.schedules.filter(sch => sch.ketThuc > appliedTime)
                        const sortedSchedules = [...validSchedules].sort((a, b) => a.batDau - b.batDau)
                        const nextSchedule = sortedSchedules.find(sch => sch.batDau > appliedTime)
                        const tChan = nextSchedule ? nextSchedule.batDau : GIO_DONG_CUA
                        const hasOngoingSchedule = sortedSchedules.some(
                            sch => sch.batDau <= appliedTime && sch.ketThuc > appliedTime
                        )
                        const soGioTrong = hasOngoingSchedule ? 0 : tChan - appliedTime

                        if (soGioTrong <= 0 && !state.isRented) return null

                        return (
                            <div
                                key={room.id}
                                id={`room-card-${room.id}`}
                                className={`bg-white/5 border border-white/10 rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#8b5cf6] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] print:border-none print:bg-white print:text-black print:shadow-none ${state.isRented ? 'print-target-active' : ''}`}
                            >
                                {/* Cover Image */}
                                <div className="h-[140px] relative bg-[#222] print:hidden">
                                    <img
                                        src={room.img}
                                        alt={`Room ${room.id}`}
                                        className="w-full h-full object-cover opacity-75"
                                    />
                                    <span
                                        className={`absolute top-[15px] right-[15px] p-[6px_12px] rounded-lg text-[11px] font-black tracking-wider ${state.isRented ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'}`}
                                    >
                                        {state.isRented ? 'ĐANG BẬN' : `TRỐNG TIẾP ${soGioTrong.toFixed(1)}H`}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-2 print:block">
                                        <h3 className="text-lg font-bold text-white print:text-black print:text-2xl">
                                            Phòng {room.id}
                                        </h3>
                                        <span className="text-[#fb923c] text-xs font-black uppercase tracking-wide print:text-sm">
                                            {room.type}
                                        </span>
                                    </div>

                                    <div className="text-xs text-[#94a3b8] mb-4 print:text-black">
                                        Sức chứa: {room.capacityText}
                                    </div>

                                    {/* KHUNG GIỜ KHÁCH ĐẶT */}
                                    <div className="mb-4 bg-white/5 p-3 rounded-xl border border-white/5 print:hidden">
                                        <span className="text-[11px] text-purple-400 block font-bold uppercase mb-1.5 tracking-wider">
                                            Khung giờ khách đặt sau đó:
                                        </span>
                                        {sortedSchedules.length > 0 ? (
                                            <div className="space-y-1">
                                                {sortedSchedules.map((sch, idx) => (
                                                    <div key={idx} className="text-xs text-slate-300">
                                                        ⏱{' '}
                                                        <b>
                                                            {formatHour(sch.batDau)} - {formatHour(sch.ketThuc)}
                                                        </b>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-xs text-slate-500 italic">
                                                Không có lịch đặt sau đó
                                            </div>
                                        )}
                                    </div>

                                    {/* ĐIỀU KHIỂN & SỬA ĐỔI THEO KỊCH BẢN DEMO */}
                                    <div className="space-y-3">
                                        {/* 1. NÚT THUÊ PHÒNG BAN ĐẦU */}
                                        {!state.showForm && !state.isRented && (
                                            <button
                                                onClick={() => handleOpenRentForm(room.id, tChan)}
                                                className="w-full p-3 bg-transparent border border-[#8b5cf6] text-[#c4b5fd] rounded-xl text-xs font-bold tracking-wider uppercase transition-all hover:bg-[#8b5cf6] hover:text-white active:scale-95"
                                            >
                                                THUÊ PHÒNG NGAY
                                            </button>
                                        )}

                                        {/* 2. FORM LUỒNG CHỌN TIẾP THEO (MODAL TRONG CARD) */}
                                        {state.showForm && (
                                            <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl flex flex-col gap-3.5 animate-slideDown print:hidden">
                                                {/* --- KHỐI CHỌN KHÁCH HÀNG THUÊ --- */}
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[11px] text-purple-400 font-bold uppercase tracking-wider">
                                                        1. Khách hàng (Tích điểm):
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập SĐT (Ví dụ: 0905...)"
                                                        value={state.searchPhone}
                                                        onChange={e => handlePhoneSearch(room.id, e.target.value)}
                                                        className="w-full bg-slate-900 border border-white/10 p-2 rounded-lg text-white text-xs outline-none focus:border-purple-500 placeholder:text-slate-600"
                                                    />
                                                    {/* Kết quả tìm kiếm nhanh dựa trên kịch bản gõ */}
                                                    {state.selectedCustomer ? (
                                                        <div className="mt-1 p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                                                            ✅ Tìm thấy: <b>{state.selectedCustomer.name}</b> (+
                                                            {state.selectedCustomer.points} điểm)
                                                        </div>
                                                    ) : state.searchPhone.length >= 4 ? (
                                                        <div className="mt-1 text-[11px] text-amber-400/80 italic">
                                                            Khách hàng mới (Tự động tạo tài khoản vãng lai)
                                                        </div>
                                                    ) : null}
                                                </div>

                                                {/* --- KHỐI CHỌN HÌNH THỨC GIỜ HÁT --- */}
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[11px] text-purple-400 font-bold uppercase tracking-wider">
                                                        2. Tùy chọn hình thức hát:
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRentTypeChange(room.id, 'tu_do')}
                                                            className={`p-2 rounded-lg text-xs font-medium transition-all ${state.rentType === 'tu_do' ? 'bg-purple-600 text-white border border-transparent' : 'bg-slate-900 text-slate-400 border border-white/5'}`}
                                                        >
                                                            Giờ hát tự do
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRentTypeChange(room.id, 'co_dinh')}
                                                            className={`p-2 rounded-lg text-xs font-medium transition-all ${state.rentType === 'co_dinh' ? 'bg-purple-600 text-white border border-transparent' : 'bg-slate-900 text-slate-400 border border-white/5'}`}
                                                        >
                                                            Giờ hát cố định
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* --- KHỐI CHỌN THỜI GIAN NẾU CHỌN GIỜ CỐ ĐỊNH --- */}
                                                {state.rentType === 'co_dinh' && (
                                                    <div className="bg-slate-900/50 p-2.5 rounded-lg border border-white/5 space-y-2 animate-slideDown">
                                                        <div className="flex justify-between items-center text-[11px]">
                                                            <span className="text-[#94a3b8]">Chọn giờ kết thúc:</span>
                                                            <span className="text-amber-400 font-mono">
                                                                Chặn tối đa: {formatHour(tChan)}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="flex-1 flex flex-col gap-0.5">
                                                                <select
                                                                    value={state.outHour}
                                                                    onChange={e =>
                                                                        handleOutTimeChange(
                                                                            room.id,
                                                                            'outHour',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full bg-slate-900 border border-white/10 p-1.5 rounded text-white font-mono text-xs outline-none focus:border-purple-500"
                                                                >
                                                                    {Array.from({ length: 24 }, (_, i) => i).map(h => (
                                                                        <option key={h} value={h}>
                                                                            {h.toString().padStart(2, '0')} giờ
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="flex-1 flex flex-col gap-0.5">
                                                                <select
                                                                    value={state.outMinute}
                                                                    onChange={e =>
                                                                        handleOutTimeChange(
                                                                            room.id,
                                                                            'outMinute',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full bg-slate-900 border border-white/10 p-1.5 rounded text-white font-mono text-xs outline-none focus:border-purple-500"
                                                                >
                                                                    {Array.from({ length: 60 }, (_, i) => i).map(m => (
                                                                        <option key={m} value={m}>
                                                                            {m.toString().padStart(2, '0')} phút
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* NÚT SUBMIT ĐỂ TRIGGER HIỆN QR VÉ */}
                                                <button
                                                    onClick={() => handleConfirmRent(room.id, tChan)}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider mt-1"
                                                >
                                                    XÁC NHẬN VÀO PHÒNG
                                                </button>
                                            </div>
                                        )}

                                        {/* 3. VÉ VÀO PHÒNG KHI BẤM OK THÀNH CÔNG */}
                                        {state.isRented && (
                                            <div className="bg-[#8b5cf6]/5 border border-[#8b5cf6]/25 p-4 rounded-2xl flex flex-col items-center gap-3 animate-slideDown print:flex print:bg-white print:text-black print:border-none print:p-2">
                                                <div className="w-full text-center border-b border-white/10 pb-2 print:border-black">
                                                    <div className="text-xs font-mono font-bold text-slate-300 print:text-black print:text-md">
                                                        VÉ VÀO PHÒNG MUSICBOX
                                                    </div>
                                                    <div className="text-[11px] text-amber-400 mt-0.5 font-bold print:text-black">
                                                        Giờ trả phòng dự kiến: {formatHour(state.expectedCheckout)}
                                                    </div>
                                                </div>

                                                <div className="bg-white p-2 rounded-xl shadow-lg flex items-center justify-center print:shadow-none print:p-0">
                                                    <img
                                                        src={state.qrUrl}
                                                        alt="QR Vé Phòng"
                                                        className="w-[120px] h-[120px] block print:w-[200px] print:h-[200px]"
                                                    />
                                                </div>

                                                <div className="w-full text-left print:hidden">
                                                    <div className="flex w-full bg-[#0f172a] border border-white/10 rounded-lg overflow-hidden mt-1">
                                                        <span className="flex-1 p-2 text-[11px] text-[#c4b5fd] whitespace-nowrap overflow-hidden text-ellipsis">
                                                            {`https://musicbox.com/room/${room.id}`}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleCopyLink(`https://musicbox.com/room/${room.id}`)
                                                            }
                                                            className="bg-white/5 border-l border-white/10 text-[#94a3b8] px-2.5 hover:text-white hover:bg-[#8b5cf6]/20 transition-all"
                                                        >
                                                            <i className="fas fa-copy text-xs"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleTriggerPrint(room.id)}
                                                    className="w-full p-2.5 bg-[#fb923c] text-[#0f172a] rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all uppercase print:hidden"
                                                >
                                                    <i className="fas fa-print"></i> IN MÃ QR VÉ
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>

            {/* STYLES ĐỒNG BỘ */}
            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }

        @media print {
          body, div:not(.print-target-active), h1, header, select, label, button, span:not(.print-target-active span), input {
            display: none !important;
          }
          .print-target-active {
            display: block !important;
            width: 100% !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 20px !important;
            border: none !important;
          }
        }
      `}</style>
        </div>
    )
}
