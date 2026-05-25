import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  DangkyPage,
  DangNhapPage,
  DatPhongPage,
  GioiThieuHeThongPage,
  HomePage,
  LichsuPage,
  PhongHatPage,
  PhonghientaiPage,
  TrangcanhanPage,
} from '@/pages';
import DashboardNhanVienPage from '@/pages/nhanvien/DashboardNhanVienPage';
import DashboardAdminPage from '@/pages/admin/DashboardAdminPage';

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
        <Route path="/pages/dashboard-nhan-vien" element={<DashboardNhanVienPage />} />
        <Route path="/pages/dashboard-admin" element={<DashboardAdminPage/>} />
        <Route path="/pages/phonghat" element={<PhongHatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

