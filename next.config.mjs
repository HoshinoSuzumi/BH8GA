import withNextIntl from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl()({
  // 性能优化配置
  experimental: {
    // 启用部分预渲染
    ppr: false,
    // 优化字体加载
    optimizePackageImports: ['@nextui-org/react'],
  },
  // 启用压缩
  compress: true,
  // 优化图片
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // 启用 SWC minify
  swcMinify: true,
})

export default nextConfig;
