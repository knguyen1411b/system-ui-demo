# MusicBox System UI (React + Vite)

Giao diện hệ thống quản lý phòng hát MusicBox, đã chuyển từ HTML/CSS/JS thuần sang React + Vite, dùng mock API để dễ thay bằng backend thật.

## 1. Công nghệ

- React 18
- Vite 5
- React Router
- Tailwind CSS
- ESLint + Prettier
- pnpm

## 2. Yêu cầu môi trường

- Node.js 18+ (khuyến nghị Node.js 20 LTS)
- pnpm 10+

Kiểm tra nhanh:

```bash
node -v
pnpm -v
```

## 3. Cài đặt và chạy dự án

```bash
pnpm install
pnpm dev
```

Mặc định app chạy tại `http://localhost:5173`.

## 4. Scripts chính

```bash
pnpm dev           # chạy local
pnpm build         # build production
pnpm preview       # chạy bản build
pnpm lint          # kiểm tra eslint
pnpm lint:fix      # tự fix eslint
pnpm format        # format toàn bộ code
pnpm format:check  # kiểm tra format
pnpm smoke         # build + smoke test 1 số route chính
```

## 5. Cấu trúc thư mục

```txt
src/
  app/
    App.jsx
    router.jsx
    styles/
      index.css
  pages/
    index.js
    HomePage.jsx
    DangNhapPage.jsx
    ...
  components/
    Header.jsx
    RoomCard.jsx
    BookingModal.jsx
  services/
    api.js
    api/
      core.js
      auth.js
      accounts.js
      rooms.js
      operations.js
      catalog.js
scripts/
  smoke-routes.mjs
```

## 6. Alias import

Dự án đã cấu hình alias `@` trỏ tới `src`:

- `vite.config.js`
- `jsconfig.json`

Ví dụ:

```js
import { HomePage } from '@/pages';
import { login } from '@/services/api';
import Header from '@/components/Header';
```

## 7. Router

Router được tách riêng tại `src/app/router.jsx`.

- `App.jsx` chỉ render router.
- Pages export tập trung qua `src/pages/index.js`.

Các route chính:

- `/`
- `/pages/dangnhap`
- `/pages/dangky`
- `/pages/bangdieukhien`
- `/pages/quanlytaikhoan`
- ... (các trang còn lại trong router)

## 8. Mock API

UI không hardcode data trực tiếp trong page, mà gọi qua service:

- Entry point: `src/services/api.js`
- Logic data/mock: `src/services/api/core.js`
- Tách module theo domain: `auth`, `accounts`, `rooms`, `operations`, `catalog`

Mock API đã dùng `async/await` + delay giả lập network để dev gần thực tế hơn.

### Tài khoản test nhanh

- `admin` / `123456`
- `tuan` / `123456`
- `baotran` / `123456`

## 9. Cách thay mock API bằng backend thật

1. Giữ nguyên các hàm public đang dùng ở UI trong `src/services/api.js`.
2. Thay phần xử lý trong từng module `src/services/api/*.js` từ mock sang `fetch` hoặc `axios`.
3. Chuẩn hóa response mapping để UI không phải sửa nhiều.
4. Xóa dần data mock trong `core.js` khi endpoint thật đã sẵn sàng.

Mục tiêu là: page/component không cần biết data đến từ mock hay backend thật.

## 10. Chất lượng code và CI

- CI workflow: `.github/workflows/ci.yml`
- Luồng cơ bản: cài dependencies -> lint -> build -> smoke test

Trước khi push, nên chạy:

```bash
pnpm lint
pnpm build
pnpm smoke
```

## 11. Ghi chú

- `dist/` là thư mục build output, không chỉnh tay.
- Nếu đổi route mới, nhớ cập nhật thêm smoke test trong `scripts/smoke-routes.mjs`.
