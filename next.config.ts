import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Force Next.js to trace from this project root (fixes multi-lockfile monorepo inference)
  outputFileTracingRoot: path.resolve(__dirname),
  // Skip ESLint during production builds to avoid blocking deploys
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow build to proceed even with TS errors (we'll fix later)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable source maps for production to reduce build size (required for Cloudflare Pages 25MB limit)
  productionBrowserSourceMaps: false,
  
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

  // Serve company logo at /favicon.ico so Google and browsers get the correct icon
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/xlogo.png?v=2' }];
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Suppress hydration warnings for browser extensions
  reactStrictMode: true,
  
  // Custom webpack config
  webpack: (config, { isServer, dev }) => {
    // Add alias for post-calculator modules to ensure code splitting
    config.resolve.alias = {
      ...config.resolve.alias,
      '@postcalc': path.resolve(__dirname, 'src/components/postcalc'),
      '@consent': path.resolve(__dirname, 'src/components/consent'),
      '@lead': path.resolve(__dirname, 'src/components/lead'),
    };

    // PERMANENT FIX: Use webpack plugin to fix sourceMapFilename AFTER all config merges
    // This runs after Next.js and all plugins have modified the config
    if (!dev) {
      // Create a plugin that validates and fixes sourceMapFilename
      const FixSourceMapFilenamePlugin = class {
        apply(compiler: any) {
          compiler.hooks.afterEnvironment.tap('FixSourceMapFilenamePlugin', () => {
            const output = compiler.options.output;
            if (output && output.sourceMapFilename !== undefined) {
              if (typeof output.sourceMapFilename !== 'string') {
                // Delete invalid value - webpack will use safe default
                delete output.sourceMapFilename;
              }
            }
          });
        }
      };
      
      // Add the plugin to fix sourceMapFilename
      if (!config.plugins) {
        config.plugins = [];
      }
      config.plugins.push(new FixSourceMapFilenamePlugin());
      
      // Also fix it immediately in case the plugin doesn't run
      if (config.output) {
        if (config.output.sourceMapFilename !== undefined && typeof config.output.sourceMapFilename !== 'string') {
          delete config.output.sourceMapFilename;
        }
      }
    }

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
