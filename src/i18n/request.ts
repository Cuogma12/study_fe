import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // LOG FOR DEBUGGING - Check your terminal!
  console.log('>>> i18n/request.ts locale:', locale);

  const baseLocale = locale || 'vi';

  return {
    locale: baseLocale,
    messages: (await import(`../../messages/${baseLocale}.json`)).default,
  };
});
