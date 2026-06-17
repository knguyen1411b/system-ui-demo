import { useState } from "react";

export default function ThongTinCaNhan() {
    const [user, setUser] = useState({
        name: 'Nguyễn Văn A',
        phone: '0901 234 567',
        points: 1250,
        avatar: 'https://lh3.googleusercontent.com/-o5CbReVbK0o/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclyO2oG33QIPjqJimd3Rvd145GAMA/c/photo.jpg?height=180&width=180'
      });
    return (
        <div>
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                <h3 className="text-base font-bold uppercase tracking-wider text-gray-400 mb-4">Thông tin cá nhân chi tiết</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Họ và tên</p>
                        <p className="text-lg font-medium text-white">{user.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Số điện thoại</p>
                        <p className="text-lg font-medium text-white">{user.phone}</p>
                    </div>
                </div>
            </div>

            
        </div>
    )

}