/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.shahramabdoli.ir',
        port: '',
        pathname: '/static_media/media/pic/**',
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: [ 'antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-tree', "rc-table", 'rc-notification', 'rc-tooltip' ]
};

export default nextConfig;