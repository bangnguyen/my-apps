# My Apps — Scalable Family PWA Monorepo

Kho lưu trữ tập trung các ứng dụng web tĩnh (**Static Web Apps / Progressive Web Apps**) phục vụ cá nhân và gia đình, chạy mượt toàn màn hình (**Standalone Mode**) và hỗ trợ **Offline** trên **iPhone 13 Pro (iOS Safari)**, **iPad (iPadOS)** và **Android (Chrome)** thông qua **GitHub Pages**.

---

## 1. Cấu trúc thư mục mở (Multi-App Architecture)

```text
my-apps/
├── .nojekyll               # Tắt Jekyll để GitHub Pages phục vụ nguyên vẹn tài nguyên tĩnh
├── apps.json               # Registry trung tâm liệt kê các ứng dụng hiển thị trên Portal
├── index.html              # Cổng khởi chạy nhanh (App Launcher Portal)
├── manifest.json           # PWA Manifest của Portal gốc
├── sw.js                   # Service Worker độc lập của Portal (namespace cache riêng)
├── assets/                 # Giao diện, logic và bộ icon Retina của Portal
├── gym/                    # Ứng dụng #1: GYM CARDIO COACH (PWA Độc lập)
│   ├── index.html          # Giao diện Mobile-First hỗ trợ Dynamic Island / Safe Area
│   ├── manifest.json       # Manifest riêng để cài biểu tượng "Gym Coach" độc lập
│   ├── sw.js               # Service Worker lưu cache Offline toàn bộ ứng dụng Gym
│   ├── workout-plan.json   # Cấu hình JSON tách biệt (8 vòng PHA, mức tạ, số nhịp)
│   ├── styles.css          # Dark Mode tương phản cao phân tách màu theo trạng thái
│   ├── app.js              # Web Audio Woodblock Metronome + Giọng HLV vi-VN + Wake Lock
│   └── icons/              # Bộ icon SVG & PNG (180x180 iOS, 192x192, 512x512, Maskable)
└── abs-dumbbell/           # Ứng dụng #2: CORE & DUMBBELL 10KG COACH (PWA Độc lập)
    ├── index.html          # Giao diện Dark Mode tối ưu nhìn từ xa trên sàn/ghế tập
    ├── manifest.json       # Manifest riêng cài biểu tượng "Core 10kg" độc lập trên iPhone
    ├── sw.js               # Service Worker Offline riêng namespace my-apps-abs-dumbbell-v1
    ├── workout-plan.json   # Giáo án JSON 3 hoặc 5 vòng × 6 trạm (Tạ tay 10kg & Bụng)
    ├── styles.css          # Phân tách màu Đỏ cam (Tập) / Xanh lá (Nghỉ) / Xanh dương (Khởi động)
    ├── app.js              # Metronome gỗ 330–420Hz hỗ trợ nhịp 2.5s + nhắc đổi tay nhịp 8 + Wake Lock
    └── icons/              # Bộ icon SVG & PNG riêng biệt (Cyan/Emerald 10KG Hex Dumbbell)
```

### Cách thêm một ứng dụng mới trong tương lai (2 bước)
1. Tạo thư mục con mới ở gốc repo (ví dụ `./english/` hoặc `./wonder/`) với đường dẫn tài nguyên tương đối `./`.
2. Thêm thông tin ứng dụng vào mảng `"apps"` trong tệp `./apps.json` với `"status": "active"` — trang chủ Portal sẽ tự động hiển thị thẻ mở nhanh mà không cần sửa HTML.

---

## 2. Ứng dụng #1: Gym Cardio Coach (`/gym/`)

- **Giáo án PHA 40 phút (~40:29):**
  - **Khởi động (3 phút):** Xoay khớp & nâng cao đùi tại chỗ.
  - **8 Vòng tập chính (~34.5 phút):** Luân phiên 4 trạm *Đẩy ngực nằm (12 nhịp × 3s)* → *Kéo xô (12 nhịp × 3s)* → *Đá đùi trước (12 nhịp × 3s)* → *Gập bụng liên tục (15 nhịp × 2s)* theo tháp tạ Pyramid (`20 kg` → `30 kg` → đỉnh `40 kg` ở Vòng 6 → xả cơ `20 kg` ở Vòng 8).
  - **Hạ nhiệt & Giãn cơ (3 phút):** Hạ nhịp tim, hỗ trợ ngủ sâu giấc buổi tối.
- **Âm thanh & Giọng HLV thông minh:**
  - Nhịp gõ gỗ trầm ấm (**Web Audio API** `330Hz – 420Hz`) đồng bộ từng nhịp đếm trên màn hình, tự động hạ nhỏ âm lượng trong pha nghỉ 30s, kèm tiếng bíp `3 - 2 - 1` và chuông chuyển trạm.
  - Giọng đọc HLV tự động (**Web Speech API `vi-VN`**) nhắc bài tập và mức tạ cần lắp trước mỗi hiệp (tự động fallback sang Tiếng Anh hoặc chuông báo nếu máy chưa cài giọng Tiếng Việt).
- **Tùy chỉnh trực tiếp:** Chạm nút `⚙ Giáo án` để nhảy nhanh tới bất kỳ vòng nào hoặc chỉnh sửa mức tạ, số nhịp và JSON ngay trên điện thoại.

---

## 3. Cài đặt lên Màn hình chính (Add to Home Screen)

- **Trên iPhone / iPad (Safari):** Mở đường dẫn `/gym/` trên Safari → chạm nút **Chia sẻ (Share ↑)** → chọn **Thêm vào MH chính (Add to Home Screen)** → bấm **Thêm**.
- **Trên Android (Chrome):** Mở đường dẫn `/gym/` trên Chrome → chạm biểu tượng **⋮** → chọn **Cài đặt ứng dụng (Install app)**.
