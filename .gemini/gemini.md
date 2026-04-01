# [CONTEXT] - DỰ ÁN STUDY_FE (NEXT.JS APP ROUTER)

Tôi đang phát triển một dự án tên là `study_fe` bằng **Next.js 14 (App Router)** kết hợp với **TailwindCSS**. Hãy ghi nhớ toàn bộ kiến trúc, thư viện và quy tắc dưới đây trước khi thực hiện bất kỳ yêu cầu nào.

## 1. KIẾN TRÚC & THƯ MỤC (ATOMIC DESIGN)
Toàn bộ UI/Component phải được chia theo chuẩn Atomic Design nghiêm ngặt, không được đặt chung chung.
*   `src/shared/components/atoms`: Các thành phần nhỏ nhất (Text, Button, Input, Checkbox, Select, Form, TextLink).
*   `src/shared/components/atoms/icon`: Nơi chứa toàn bộ SVG Icons. **Tuyệt đối không hardcode thẻ `<svg>` trực tiếp trong các component khác**. Phải tạo file riêng (VD: `LogoIcon.tsx`, `ExpandMoreIcon.tsx`) trong thư mục này và export ra file `index.ts`.
*   `src/shared/components/molecules`: Kết hợp nhiều atom (VD: `FormField`, `PasswordInput`).
*   `src/shared/components/organisms`: Component phức tạp hoặc layout dùng chung (nằm trong `shared` hoặc trong từng module).
*   `src/modules/[tên_module]/`: Chứa các tính năng theo nghiệp vụ (VD: `auth`). Trong mỗi module sẽ chia ra: `components`, `hooks`, `pages`, `services`.
*   `src/app/[locale]/`: Cấu trúc thư mục của Next.js App Router. **Tuyệt đối không viết giao diện (UI) trực tiếp trong file `page.tsx` ở đây**. Các file `page.tsx` này chỉ dùng để định tuyến và import các Page Component từ thư mục `modules` (VD: `import { LoginPage } from '@/modules/auth/pages/LoginPage';`).

## 2. QUY TẮC CODE VÀ GIAO DIỆN (UI/UX)
*   **Design System / Tailwind**: Đã cấu hình sẵn trong `tailwind.config.js` (`primary: '#4848e5'`, phông chữ `Inter`, background sáng/tối).
*   **Component Text**: **Tuyệt đối không dùng các thẻ HTML nguyên thủy như `<h1>, <h2>, <p>, <span>` để hiển thị chữ**. Phải sử dụng component `<Text variant="..." className="...">` từ `atoms/Text.tsx`.
*   **Links**: **Tuyệt đối không dùng thẻ `<a>`**. Phải dùng `<TextLink onClick={...}>` (Atom đã tích hợp sẵn). Logic chuyển trang sử dụng `const router = useRouter()` của Next.js bên trong các custom hooks.
*   **Forms**: **Tuyệt đối không dùng thẻ `<form>` thuần**. Phải dùng component `<Form>` từ `atoms/Form.tsx`.
*   **Logic (Custom Hooks)**: Giao diện (JSX) phải sạch sẽ. Mọi logic gọi API, xử lý state (`useState`), xử lý redirect (`useRouter()`), xử lý dịch thuật (`useTranslations()`) đều phải được ném vào **Custom Hooks** (VD: `useLogin.ts`, `useRegister.ts`). Component chỉ nhận dữ liệu từ Hook để render.
*   **Ngôn ngữ Comment**: **Tuyệt đối không viết comment hoặc technical notes bằng Tiếng Việt**. 100% comment trong code phải bằng Tiếng Anh.

## 3. CẤU HÌNH HỆ THỐNG
*   **Đa ngôn ngữ (i18n)**: Đang sử dụng thư viện `next-intl`.
    *   File cấu hình `request.ts` nằm ở `src/i18n/request.ts` (có cơ chế fallback về `vi` nếu `locale` bị lỗi/undefined để chống crash 404/500).
    *   File dịch thuật nằm ở `messages/en.json` và `messages/vi.json`.
    *   Sử dụng `const t = useTranslations();` (Global) trong Hooks/Components và gọi theo đường dẫn tuyệt đối (VD: `t('auth.login.title')`).
    *   Middleware tự động redirect và thêm locale prefix (VD: gõ `/login` tự động sang `/vi/login`).
*   **Deployment**: Đang sử dụng **PM2** để chạy dự án thay vì Docker (cổng 3001).
*   **Formatting**: Đã cấu hình `.prettierrc` (single quote, tab 2) và plugin sắp xếp TailwindCSS.

## Gemini Added Memories
- Người dùng thích phong cách tương tác thân thiện, thoải mái, sử dụng ngôn ngữ gần gũi (như "b yêu") nhưng vẫn giữ được sự chuyên nghiệp và quyết liệt trong việc giải quyết các tác vụ kỹ thuật.
