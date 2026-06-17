import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import {
    DangNhapPage,
    DangkyPage,
    DatPhongPage,
    GioiThieuHeThongPage,
    HomePage,
    PhongHatPage,
    PhonghientaiPage,
    TrangcanhanPage,
    Traphong
} from '@/pages'
import DashboardAdminPage from '@/pages/admin/DashboardAdminPage'
import QuanLyBangGia from '@/pages/admin/QuanLyBangGia'
import QuanLyDichVu from '@/pages/admin/QuanLyDichVu'
import QuanLyLoaiPhong from '@/pages/admin/QuanLyLoaiPhong'
import QuanLyPhong from '@/pages/admin/QuanLyPhong'
import QuanLyTaiKhoan from '@/pages/admin/QuanLyTaiKhoan'
import TongQuan from '@/pages/admin/TongQuan'
import LichSuDatPhong from '@/pages/khachhang/LichSuDatPhong'
import LichSuThuePhong from '@/pages/khachhang/LichSuThuePhong'
import ThongTinCaNhan from '@/pages/khachhang/ThongTinCaNhan'
import TrangCaNhanPage from '@/pages/khachhang/TrangcanhanPage'
import BaoHong from '@/pages/nhanvien/Baohong'
import Checkin from '@/pages/nhanvien/Checkin'
import DashboardNhanVienPage from '@/pages/nhanvien/DashboardNhanVienPage'
import DichVu from '@/pages/nhanvien/Dichvu'
import ThuePhong from '@/pages/nhanvien/Thuephong'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pages/gioithieuhethong" element={<GioiThieuHeThongPage />} />
                <Route path="/pages/dangnhap" element={<DangNhapPage />} />
                <Route path="/pages/dangky" element={<DangkyPage />} />
                <Route path="/pages/phonghientai" element={<PhonghientaiPage />} />
                <Route path="/pages/DatPhong" element={<DatPhongPage />} />
                <Route path="/pages/trangcanhan" element={<TrangcanhanPage />} />

                <Route path="/pages/phonghat" element={<PhongHatPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />

                {/* ================= ĐỊNH TUYẾN LỒNG NHAU CHO Nhân viên ================= */}
                <Route path="/pages/dashboard-nhan-vien" element={<DashboardNhanVienPage />}>
                    <Route index element={<ThuePhong />} />
                    <Route path="checkin" element={<Checkin />} />
                    <Route path="traphong" element={<Traphong />} />
                    <Route path="dichvu" element={<DichVu />} />
                    <Route path="baohong" element={<BaoHong />} />
                </Route>

                {/* ================= ĐỊNH TUYẾN LỒNG NHAU CHO ADMIN ================= */}
                <Route path="/pages/dashboard-admin" element={<DashboardAdminPage />}>
                    <Route index element={<TongQuan />} />

                    {/* Các trang chức năng con */}
                    <Route path="taikhoan" element={<QuanLyTaiKhoan />} />
                    <Route path="loaiphong" element={<QuanLyLoaiPhong />} />
                    <Route path="phong" element={<QuanLyPhong />} />
                    <Route path="dichvu" element={<QuanLyDichVu />} />
                    <Route path="banggia" element={<QuanLyBangGia />} />
                </Route>

                {/* ================= ĐỊNH TUYẾN LỒNG NHAU CHO TRANG CÁ NHÂN ================= */}
                <Route path="/pages/trangcanhan" element={<TrangCaNhanPage />}>
                    <Route index element={<LichSuThuePhong />} />

                    {/* Các trang chức năng con */}
                    <Route path="info" element={<ThongTinCaNhan />} />
                    <Route path="booking-history" element={<LichSuDatPhong />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
