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

## 4. BỔ SUNG RULE THỰC THI (BẮT BUỘC)
*   **API Call Boundary (rất quan trọng)**:
    *   `src/app/[locale]/**/page.tsx`: chỉ route entry, chỉ import và render Page Component.
    *   `src/modules/**/pages/*Page.tsx`: chỉ render UI, không gọi API trực tiếp.
    *   `src/modules/**/hooks/use*.ts`: xử lý state/handler/router/translate, không gọi `fetch`/`axios` trực tiếp.
    *   `src/modules/**/services/*.service.ts`: nơi duy nhất của module được phép gọi API.
    *   Toàn bộ HTTP đi qua `src/shared/utils/axiosClient.ts`, không tạo axios instance mới rải rác.

*   **i18n Message Rule**:
    *   Cấm hardcode text hiển thị cho user (JSX, toast, alert, validation message).
    *   Mọi message mới phải thêm đồng thời vào `messages/vi.json` và `messages/en.json`.
    *   Dùng `useTranslations()` với key đầy đủ (ví dụ `auth.login.title`, `common.error`).
    *   Không render raw message kỹ thuật từ API; phải map qua key đa ngữ.
    *   Khi xử lý lỗi API trong FE, bắt buộc map theo `error.response.data.message` (mã `STD_*`) qua `resolveApiErrorMessage` (`src/shared/utils/resolveApiErrorMessage.ts`) và namespace `api_errors`. Cấm hardcode fallback kiểu `"Thử lại sau"` trực tiếp trong component.

*   **TypeScript Rule (khai báo interface/type đầy đủ)**:
    *   Cấm dùng `any` cho form data, request payload, response payload nếu có thể định nghĩa type.
    *   Mỗi API function trong `services` phải có kiểu dữ liệu đầu vào/đầu ra rõ ràng.
    *   Type theo module đặt trong `src/modules/<module>/types/`.
    *   Type dùng chung đặt trong `src/shared/types/`.

*   **Common đưa vào shared**:
    *   Logic/component/constants/types được dùng lại từ 2 nơi trở lên phải đưa vào `src/shared/`.
    *   Không copy-paste util hoặc validation rule ở nhiều module.

*   **Atomic Design Enforcement**:
    *   Tôn trọng phân tầng `atoms -> molecules -> organisms`.
    *   UI nghiệp vụ không đặt trong file route `page.tsx` của App Router.
    *   Icons luôn đặt tại `src/shared/components/atoms/icon` và export qua `index.ts`.

*   **BE/API First (không lạm dụng mock data)**:
    *   Trước khi làm FE có API call, phải kiểm tra BE đã có endpoint chưa (feature checklist, API contract, router/service).
    *   Nếu endpoint đã có, FE bắt buộc call API thật qua `services`, không thay bằng mock data.
    *   Nếu endpoint chưa có hoặc BE chưa sẵn sàng, phải báo user trước khi làm mock.
    *   Chỉ dùng mock data khi user đồng ý; mock phải có ghi chú tạm thời và TODO để thay bằng API thật.

*   **UI-Hook-Service Boundary (bắt buộc)**:
    *   Component trong `components/**` chỉ render UI và gọi handlers từ hook; không gọi `*.service.ts` trực tiếp.
    *   Mọi side effect (API, `window.alert`, `confirm`, state chuyển trang sau API) phải đi qua `hooks/use*.ts`.
    *   Nếu cần tái sử dụng logic lỗi API, ưu tiên helper dùng chung ở `shared/utils` thay vì lặp lại trong từng component.

## Gemini Added Memories
- Người dùng thích phong cách tương tác thân thiện, thoải mái, sử dụng ngôn ngữ gần gũi (như "b yêu") nhưng vẫn giữ được sự chuyên nghiệp và quyết liệt trong việc giải quyết các tác vụ kỹ thuật.
