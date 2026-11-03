import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Competition photography will be served from the federation's own CDN.
    // Add that host here when it exists, e.g. { protocol: 'https', hostname: 'media.azdsf.az' }.
    remotePatterns: []
  }
};

export default withNextIntl(nextConfig);
