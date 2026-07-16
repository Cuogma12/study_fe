const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      { source: '/courses', destination: '/', permanent: false },
      { source: '/:locale/courses', destination: '/:locale', permanent: false },
      { source: '/discussion', destination: '/', permanent: false },
      { source: '/:locale/discussion', destination: '/:locale', permanent: false },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
