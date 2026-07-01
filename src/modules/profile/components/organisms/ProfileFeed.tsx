'use client';
import React from 'react';
import { Text, Button, MaterialIcon } from '@/shared/components/atoms';

export const ProfileFeed = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-primary/5 bg-white shadow-sm dark:bg-slate-900">
        <div className="flex border-b border-slate-100 dark:border-slate-800">
          <Text
            as="button"
            variant="body2"
            weight="bold"
            className="flex-1 border-b-2 border-primary py-4 !text-primary"
          >
            Hoạt động
          </Text>
          <Text
            as="button"
            variant="body2"
            weight="medium"
            className="flex-1 py-4 !text-slate-500 transition-colors hover:!text-primary"
          >
            Bộ sưu tập
          </Text>
          <Text
            as="button"
            variant="body2"
            weight="medium"
            className="flex-1 py-4 !text-slate-500 transition-colors hover:!text-primary"
          >
            Câu hỏi đã lưu
          </Text>
        </div>

        <div className="p-4">
          <div className="mb-6 rounded-xl border border-primary/5 bg-slate-50 p-4 dark:bg-slate-800/50">
            <div className="flex gap-3">
              <img alt="User" className="h-10 w-10 rounded-full object-cover" src={avatarUrl} />
              <Text
                as="button"
                variant="body2"
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-left !text-slate-400 dark:border-slate-700 dark:bg-slate-900"
              >
                Chia sẻ kiến thức của bạn...
              </Text>
            </div>
          </div>

          <div className="space-y-6 rounded-xl p-2 outline outline-dashed outline-2 outline-red-500/80">
            <article className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MaterialIcon icon="description" type="filled" />
                  </div>
                  <div>
                    <Text variant="body2" weight="semibold">
                      Bạn đã hoàn thành bài kiểm tra{' '}
                      <Text as="span" variant="body2" weight="semibold" className="!text-primary">
                        Toán cao cấp
                      </Text>
                    </Text>
                    <Text variant="caption" className="!text-slate-500">
                      2 giờ trước • Công khai
                    </Text>
                  </div>
                </div>
                <Button variant="ghost" className="!p-1 !text-slate-400">
                  <MaterialIcon icon="more_horiz" type="filled" size="text-lg" />
                </Button>
              </div>
              <div className="rounded-xl border border-primary/5 bg-slate-50 p-4 dark:bg-slate-800/50">
                <div className="mb-2 flex items-center justify-between">
                  <Text variant="caption" weight="bold" className="!text-slate-500">
                    KẾT QUẢ
                  </Text>
                  <Text variant="body2" weight="bold" className="!text-green-500">
                    9.5/10
                  </Text>
                </div>
                <Text variant="body2" className="line-clamp-2 !text-slate-600 dark:!text-slate-400">
                  Nội dung: Ma trận, Hệ phương trình tuyến tính và Không gian vector...
                </Text>
              </div>
              <div className="flex items-center gap-6 border-t border-slate-100 pt-2 dark:border-slate-800">
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 !px-0 !text-slate-500 transition-colors hover:!text-primary"
                >
                  <MaterialIcon icon="thumb_up" size="text-lg" /> 24
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 !px-0 !text-slate-500 transition-colors hover:!text-primary"
                >
                  <MaterialIcon icon="chat_bubble" size="text-lg" /> 8
                </Button>
                <Button
                  variant="ghost"
                  className="ml-auto flex items-center gap-1.5 !px-0 !text-slate-500 transition-colors hover:!text-primary"
                >
                  <MaterialIcon icon="share" size="text-lg" />
                </Button>
              </div>
            </article>

            <article className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                    <MaterialIcon icon="question_answer" type="filled" />
                  </div>
                  <div>
                    <Text variant="body2" weight="semibold">
                      Đã trả lời một câu hỏi về{' '}
                      <Text as="span" variant="body2" weight="semibold" className="!text-primary">
                        Lập trình Python
                      </Text>
                    </Text>
                    <Text variant="caption" className="!text-slate-500">
                      Hôm qua • Đã được chấp nhận
                    </Text>
                  </div>
                </div>
                <Button variant="ghost" className="!p-1 !text-slate-400">
                  <MaterialIcon icon="more_horiz" type="filled" size="text-lg" />
                </Button>
              </div>
              <div className="space-y-2">
                <Text variant="body1" weight="bold" className="!text-slate-900 dark:!text-white">
                  Làm thế nào để tối ưu hóa Decorator trong Python cho AI models?
                </Text>
                <Text
                  variant="body2"
                  className="line-clamp-3 border-l-2 border-primary/20 pl-4 italic !text-slate-600 dark:!text-slate-400"
                >
                  "Để tối ưu, bạn nên sử dụng functools.wraps để bảo toàn metadata của function
                  gốc..."
                </Text>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 !px-0 font-semibold !text-primary"
                >
                  <MaterialIcon icon="thumb_up" type="filled" size="text-lg" /> 156
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 !px-0 !text-slate-500 transition-colors hover:!text-primary"
                >
                  <MaterialIcon icon="chat_bubble" size="text-lg" /> 12
                </Button>
                <Button
                  variant="ghost"
                  className="ml-auto flex items-center gap-1.5 !px-0 !text-slate-500 transition-colors hover:!text-primary"
                >
                  <MaterialIcon icon="bookmark" size="text-lg" />
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
