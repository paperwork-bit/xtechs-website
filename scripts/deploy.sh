#!/bin/bash

# Deployment script for xTechs Website to Cloudflare Pages
# This script builds and deploys the chatbot to Cloudflare

set -e  # Exit on error

echo "🚀 Starting deployment to Cloudflare Pages..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the xtechs-website directory."
    exit 1
fi

# Check if wrangler is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is not installed. Please install Node.js and npm."
    exit 1
fi

echo "📦 Step 1: Building for Cloudflare..."
npm run build:cloudflare

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "📤 Step 2: Deploying to Cloudflare Pages..."
echo ""

# Deploy using wrangler
./node_modules/.bin/wrangler pages deploy .vercel/output/static \
    --project-name=xtechs-website \
    --commit-dirty=true

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to Cloudflare Dashboard → Pages → xtechs-website"
echo "   2. Settings → Functions → Add R2 Bucket Binding:"
echo "      - Variable name: CHATBOT_KB"
echo "      - R2 bucket: xtechs-chatbot-kb"
echo "   3. Settings → Environment variables → Add ADMIN_API_TOKEN"
echo "   4. Create R2 bucket 'xtechs-chatbot-kb' if it doesn't exist"
echo "   5. Upload knowledge base using: npx tsx scripts/upload-kb-to-r2.ts"
echo ""
echo "📖 See DEPLOY_CHATBOT.md for detailed instructions"

