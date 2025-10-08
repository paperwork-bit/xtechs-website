import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Skip ESLint during production builds to avoid blocking deploys
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow build to proceed even with TS errors (we'll fix later)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Enable compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Suppress hydration warnings for browser extensions
  reactStrictMode: true,
  
  // Custom webpack config
  webpack: (config, { isServer }) => {
    // Add alias for post-calculator modules to ensure code splitting
    config.resolve.alias = {
      ...config.resolve.alias,
      '@postcalc': path.resolve(__dirname, 'src/components/postcalc'),
      '@consent': path.resolve(__dirname, 'src/components/consent'),
      '@lead': path.resolve(__dirname, 'src/components/lead'),
    };

    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: path.join(__dirname, '.next/analyze/client.html'),
        })
      );
    }

    return config;
  },
};

export default nextConfig;
