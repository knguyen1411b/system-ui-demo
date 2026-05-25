import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  BangdieukhienPage,
  DangkyPage,
  DangNhapPage,
  DatPhongPage,
  GioiThieuHeThongPage,
  HomePage,
  LichsuPage,
  PhongHatPage,
  PhonghientaiPage,
  QuanlybanggiaPage,
  QuanlydichvuPage,
  QuanlyloaiphongPage,
  QuanlyphongPage,
  QuanlytaikhoanPage,
  TrangcanhanPage,
} from '@/pages';
import DashboardNhanVienPage from '@/pages/nhanvien/DashboardNhanVienPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pages/gioithieuhethong" element={<GioiThieuHeThongPage />} />
        <Route path="/pages/dangnhap" element={<DangNhapPage />} />
        <Route path="/pages/bangdieukhien" element={<BangdieukhienPage />} />
        <Route path="/pages/dangky" element={<DangkyPage />} />
        <Route path="/pages/lichsu" element={<LichsuPage />} />
        <Route path="/pages/phonghientai" element={<PhonghientaiPage />} />
        <Route path="/pages/quanlybanggia" element={<QuanlybanggiaPage />} />
        <Route path="/pages/quanlydichvu" element={<QuanlydichvuPage />} />
        <Route path="/pages/quanlyloaiphong" element={<QuanlyloaiphongPage />} />
        <Route path="/pages/quanlyphong" element={<QuanlyphongPage />} />
        <Route path="/pages/quanlytaikhoan" element={<QuanlytaikhoanPage />} />
        <Route path="/pages/DatPhong" element={<DatPhongPage />} />
        <Route path="/pages/trangcanhan" element={<TrangcanhanPage />} />
        <Route path="/pages/dashboard-nhan-vien" element={<DashboardNhanVienPage />} />
        <Route path="/pages/phonghat" element={<PhongHatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

