import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  DangkyPage,
  DangNhapPage,
  DatPhongPage,
  DichvuPage,
  GioiThieuHeThongPage,
  HomePage,
  LichsuPage,
  PhongHatPage,
  PhonghientaiPage,
  TrangcanhanPage,
  Traphong,
} from '@/pages';
import DashboardNhanVienPage from '@/pages/nhanvien/DashboardNhanVienPage';
import DashboardAdminPage from '@/pages/admin/DashboardAdminPage';
import ThuePhong from '@/pages/nhanvien/Thuephong';
import Checkin from '@/pages/nhanvien/Checkin';
import DichVu from '@/pages/nhanvien/Dichvu';
import BaoHong from '@/pages/nhanvien/Baohong';
import TongQuan from '@/pages/admin/TongQuan';
import QuanLyTaiKhoan from '@/pages/admin/QuanLyTaiKhoan';
import QuanLyPhong from '@/pages/admin/QuanLyPhong';
import QuanLyLoaiPhong from '@/pages/admin/QuanLyLoaiPhong';
import QuanLyDichVu from '@/pages/admin/QuanLyDichVu';
import QuanLyBangGia from '@/pages/admin/QuanLyBangGia';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pages/gioithieuhethong" element={<GioiThieuHeThongPage />} />
        <Route path="/pages/dangnhap" element={<DangNhapPage />} />
        <Route path="/pages/dangky" element={<DangkyPage />} />
        <Route path="/pages/lichsu" element={<LichsuPage />} />
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
      </Routes>
    </BrowserRouter>
  );
}

