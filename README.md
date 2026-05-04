# System Interface Mockups

Bộ giao diện mô phỏng hệ thống quản lý và vận hành phòng hát Music Box, xây dựng bằng HTML/CSS/JS thuần.

## Mục tiêu

- Mô phỏng đầy đủ luồng người dùng và quản trị trên giao diện web.
- Dùng cho demo nghiệp vụ, trình bày UI/UX, hoặc làm nền để tích hợp backend sau này.

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript (vanilla)
- Tailwind CSS (CDN)
- Alpine.js (CDN)
- Chart.js (cho trang dashboard)
- Font Awesome (một số trang)

## Cách chạy dự án

Vì đây là dự án tĩnh, bạn có thể chạy theo một trong hai cách:

1. Mở trực tiếp file index.html bằng trình duyệt.
2. Dùng extension Live Server trong VS Code để chạy local server.

Khuyến nghị: dùng Live Server để tránh lỗi đường dẫn tương đối khi điều hướng giữa các trang.

## Cấu trúc chính

- index.html: Trang chủ
- pages/
  - bangdieukhien.html: Dashboard quản trị
  - quanlytaikhoan.html: Quản lý tài khoản
  - quanlyphong.html: Quản lý phòng
  - quanlyloaiphong.html: Quản lý loại phòng
  - quanlydichvu.html: Quản lý dịch vụ
  - quanlybanggia.html: Quản lý bảng giá
  - thuephong.html: Thuê phòng
  - traphong.html: Trả phòng
  - dichvu.html: Dịch vụ
  - baohong.html: Báo hỏng
  - phonghientai.html: Phòng hiện tại
  - lichsu.html: Lịch sử
  - trangcanhan.html: Trang cá nhân
  - dangnhap.html: Đăng nhập
  - dangky.html: Đăng ký
  - gioithieuhethong.html: Trang giới thiệu hệ thống (link tới toàn bộ màn hình)
- assets/
  - images/: tài nguyên hình ảnh

## Điều hướng hiện tại

- Đã chuẩn hóa link Dashboard trong khu quản trị về bangdieukhien.html.
- Đã bổ sung trang giới thiệu hệ thống để truy cập nhanh tất cả màn hình.
