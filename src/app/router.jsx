import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  BangdieukhienPage,
  BaohongPage,
  DangkyPage,
  DangNhapPage,
  DichvuPage,
  GioiThieuHeThongPage,
  HomePage,
  LichsuPage,
  PhonghientaiPage,
  QuanlybanggiaPage,
  QuanlydichvuPage,
  QuanlyloaiphongPage,
  QuanlyphongPage,
  QuanlytaikhoanPage,
  ThuephongPage,
  TrangcanhanPage,
  TraphongPage,
} from '@/pages';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pages/gioithieuhethong" element={<GioiThieuHeThongPage />} />
        <Route path="/pages/dangnhap" element={<DangNhapPage />} />
        <Route path="/pages/bangdieukhien" element={<BangdieukhienPage />} />
        <Route path="/pages/baohong" element={<BaohongPage />} />
        <Route path="/pages/dangky" element={<DangkyPage />} />
        <Route path="/pages/dichvu" element={<DichvuPage />} />
        <Route path="/pages/lichsu" element={<LichsuPage />} />
        <Route path="/pages/phonghientai" element={<PhonghientaiPage />} />
        <Route path="/pages/quanlybanggia" element={<QuanlybanggiaPage />} />
        <Route path="/pages/quanlydichvu" element={<QuanlydichvuPage />} />
        <Route path="/pages/quanlyloaiphong" element={<QuanlyloaiphongPage />} />
        <Route path="/pages/quanlyphong" element={<QuanlyphongPage />} />
        <Route path="/pages/quanlytaikhoan" element={<QuanlytaikhoanPage />} />
        <Route path="/pages/thuephong" element={<ThuephongPage />} />
        <Route path="/pages/trangcanhan" element={<TrangcanhanPage />} />
        <Route path="/pages/traphong" element={<TraphongPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

