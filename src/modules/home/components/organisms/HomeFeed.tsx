'use client';

import React from 'react';
import { MaterialIcon, Text, Button } from '@/shared/components/atoms';
import { useTranslations } from 'next-intl';

export const HomeFeed = () => {
  const t = useTranslations('home.feed');

  return (
    <section className="min-w-0 flex-1">
      {/* Filters/Tabs */}
      <div className="mb-6 flex items-center justify-between">
        <Text variant="h3">{t('latest_questions')}</Text>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 !border-slate-200 !bg-white px-3 py-1.5 !text-slate-900 dark:!border-slate-700 dark:!bg-slate-800 dark:!text-slate-100"
          >
            <MaterialIcon icon="filter_list" size="text-lg" />
            {t('filter')}
          </Button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {/* Question Card 1 */}
        <div className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold uppercase text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                Toán học
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Khó
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Lớp 12
              </span>
            </div>
            <span className="flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold uppercase text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <MaterialIcon icon="auto_awesome" size="text-sm" />
              {t('ai_suggestion')}
            </span>
          </div>
          <Text variant="h5" className="mb-2 transition-colors group-hover:text-primary">
            Tính tích phân hàm ẩn của hàm f(x) liên tục trên đoạn [0, 1]?
          </Text>
          <Text variant="body2" className="mb-4 line-clamp-2 !text-slate-600 dark:!text-slate-400">
            Cho hàm số f(x) có đạo hàm liên tục trên [0, 1] thỏa mãn f(1)=0 và tích phân từ 0 đến 1
            của bình phương đạo hàm...
          </Text>
          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  className="object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWTkZRLrj8fHbYKD8kijJ_De_qrl7of7OTYXBRZBcJkqmi2bPf3Sp8KL84HIkY8wiDxIKeFqLTeckQhz6Wn6kbuoR4WL4Ko0Gh3MvohsvIktz6aOAl0qXrcVCRdmY9rKMhrNIiigdOkZjtMMsNHLI1X7LvmV6HT1S05I4XsNH9KhLpqIsBnlyzXQDwzQqYiRoe7ucMGrBAvWqMCEIwQ9pioE1RTMUzDg9wZBCr9gfxUrI1OZqRCR2usqlrN6iGQdLTVedw3BIivik"
                  alt="avatar"
                />
              </div>
              <div>
                <p className="text-xs font-bold">Nguyễn Văn An</p>
                <p className="text-[10px] text-slate-500">10 phút trước</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1 text-xs">
                <MaterialIcon icon="visibility" size="text-sm" /> 124
              </span>
              <span className="flex items-center gap-1 text-xs">
                <MaterialIcon icon="chat_bubble" size="text-sm" /> 12
              </span>
              <Button size="sm">{t('solve')}</Button>
            </div>
          </div>
        </div>

        {/* Question Card 2 */}
        <div className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold uppercase text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                Vật lý
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Trung bình
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Lớp 11
              </span>
            </div>
          </div>
          <Text variant="h5" className="mb-2 transition-colors group-hover:text-primary">
            Tại sao khi cho dòng điện xoay chiều qua cuộn dây lại có hiện tượng cảm ứng?
          </Text>
          <Text variant="body2" className="mb-4 line-clamp-2 !text-slate-600 dark:!text-slate-400">
            Mình đang tìm hiểu về định luật Faraday và Lenz nhưng vẫn chưa rõ cơ chế tại sao từ
            trường biến thiên lại sinh ra dòng điện cảm ứng...
          </Text>
          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  className="object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUph-hwjK-9BBDBHsYdmOLK4130WMJoAXXRuX3-Me3DXpEZK_Oy2n44AfU9YeLM-TCE6nlLmn3Y-3ax-XNrxL6NaXa7eWswl_Yn3pJaK75_lXkxdt_DRWZHnA3myfIwKnoWHwj3oK-EzAIEUQBzCe8MoPKkk62-E7POrjndHuao5qEZLg6nuZa3LjWZ5FjIM1tqswIXjFzVwtRDsUg3U34VXivXiIZXufoUIBejlC_6ji4cMrstEYTctygmj5Ks97sRmm1PD2k7Y8"
                  alt="avatar"
                />
              </div>
              <div>
                <p className="text-xs font-bold">Trần Thị Bích</p>
                <p className="text-[10px] text-slate-500">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1 text-xs">
                <MaterialIcon icon="visibility" size="text-sm" /> 85
              </span>
              <span className="flex items-center gap-1 text-xs">
                <MaterialIcon icon="chat_bubble" size="text-sm" /> 5
              </span>
              <Button size="sm">{t('solve')}</Button>
            </div>
          </div>
        </div>

        {/* Question Card 3 */}
        <div className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold uppercase text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                Hóa học
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Dễ
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                Lớp 10
              </span>
            </div>
          </div>
          <Text variant="h5" className="mb-2 transition-colors group-hover:text-primary">
            Cách phân biệt các ion trong dung dịch bằng thuốc thử đặc trưng?
          </Text>
          <Text variant="body2" className="mb-4 line-clamp-2 !text-slate-600 dark:!text-slate-400">
            Các bạn có bảng tổng hợp về màu sắc kết tủa của các ion phổ biến như Ba2+, Cl-, SO4 2-
            không cho mình xin với ạ...
          </Text>
          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  className="object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUlUeOfvWihnCyCWhOOOeZvGM0gHYKuwZEQY_aKOR2zorkYMcrT21FeMbJ9t8Q5vP4lKmal7RGX_ZCXN-HNpf5QQTJ7iFYEAc965hrHqt_NDi6S_f2t9NRr8-nBikr9bda93ZCrmhfxAnEJXRvk8IctgMhUJgmIrFsZNljnT2fKAfkBdGS0ypXleme7BU_hLHEsZWqK_MpXvJf2BARgaKPAnOpnQOxACt_ptLKrMy3iBqe9OQCf2g978mOBAO4F0PefF7DM-2DL0k"
                  alt="avatar"
                />
              </div>
              <div>
                <p className="text-xs font-bold">Lê Minh Tâm</p>
                <p className="text-[10px] text-slate-500">5 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1 text-xs">
                <MaterialIcon icon="visibility" size="text-sm" /> 210
              </span>
              <span className="flex items-center gap-1 text-xs">
                <MaterialIcon icon="chat_bubble" size="text-sm" /> 18
              </span>
              <button className="rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-white hover:bg-primary/90">
                Giải đáp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
