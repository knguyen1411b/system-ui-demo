import { useEffect, useState } from 'react'

export default function CurrentTimeBox() {
    // Trạng thái thời gian thực
    const [currentTime, setCurrentTime] = useState('00:00:00')
    const [currentDate, setCurrentDate] = useState('Chủ Nhật, 03/05/2026')

    // --- EFFECT: ĐỒNG HỒ THỜI GIAN THỰC ---
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const timeStr = now.toLocaleTimeString('vi-VN', { hour12: false })
            const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }
            const dateStr = now.toLocaleDateString('vi-VN', options)

            setCurrentTime(timeStr)
            setCurrentDate(dateStr)
        }

        updateTime() // Chạy ngay lập tức lần đầu
        const timerId = setInterval(updateTime, 1000)

        return () => clearInterval(timerId) // Cleanup khi unmount
    }, [])

    return (
        <div className="border-l-4 border-[#8b5cf6] pl-4 text-left sm:text-right">
            <span className="block text-xl font-bold font-mono text-orange-400 tracking-wider">{currentTime}</span>
            <span className="text-xs text-slate-400 font-medium">{currentDate}</span>
        </div>
    )
}
