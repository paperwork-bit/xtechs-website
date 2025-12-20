# Deploy Chatbot to Cloudflare

This guide will help you deploy the chatbot with R2 storage to Cloudflare Pages.

## Prerequisites

1. **Cloudflare Account**: Logged in with Pages and R2 access
2. **Wrangler CLI**: Installed and authenticated
3. **R2 Bucket**: Created in Cloudflare dashboard

## Step 1: Create R2 Bucket (if not exists)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** → **Create bucket**
3. Name: `xtechs-chatbot-kb`
4. Location: Choose closest to your users (e.g., Australia)
5. Click **Create bucket**

## Step 2: Authenticate Wrangler

```bash
wrangler login
```

This will open a browser to authenticate with Cloudflare.

## Step 3: Build and Deploy

```bash
cd xtechs-website
npm run deploy:cloudflare
```

Or use the shorter command:
```bash
npm run cf:deploy
```

This will:
1. Build the Next.js app for Cloudflare
2. Clean source maps
3. Deploy to Cloudflare Pages

## Step 4: Configure R2 Binding in Cloudflare Pages

After deployment:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **xtechs-website**
3. Go to **Settings** → **Functions**
4. Under **R2 Bucket Bindings**, click **Add binding**
5. Configure:
   - **Variable name**: `CHATBOT_KB`
   - **R2 bucket**: `xtechs-chatbot-kb`
6. Click **Save**

## Step 5: Set Environment Variables

1. In Cloudflare Pages → **Settings** → **Environment variables**
2. Add:
   - **Variable**: `ADMIN_API_TOKEN`
   - **Value**: Generate a secure token (e.g., `openssl rand -hex 32`)
3. Click **Save**

## Step 6: Upload Knowledge Base to R2

After deployment and R2 binding is configured:

### Option A: Using the Upload Script (Recommended)

1. Set the admin token:
   ```bash
   export ADMIN_API_TOKEN=your-token-here
   ```

2. Update the script to use your production URL:
   ```typescript
   const API_URL = 'https://your-domain.com';
   ```

3. Run the upload script:
   ```bash
   npx tsx scripts/upload-kb-to-r2.ts
   ```

### Option B: Using Wrangler CLI

1. Export knowledge base to JSON:
   ```bash
   node -e "const kb = require('./src/lib/chatbot/knowledge-base.ts'); console.log(JSON.stringify(kb.knowledgeBase, null, 2))" > kb.json
   ```

2. Upload to R2:
   ```bash
   wrangler r2 object put xtechs-chatbot-kb/chatbot-knowledge-base.json --file=kb.json
   ```

### Option C: Using Cloudflare Dashboard

1. Go to R2 → `xtechs-chatbot-kb` bucket
2. Click **Upload**
3. Upload the knowledge base JSON file as `chatbot-knowledge-base.json`

## Step 7: Verify Deployment

1. **Check Pages Deployment**:
   - Visit your website URL
   - Click the chat button
   - Verify customer form appears

2. **Test R2 Integration**:
   ```bash
   curl https://your-domain.com/api/chatbot/kb
   ```
   Should return `"source": "r2"` if working correctly

3. **Test Chatbot**:
   - Fill in customer form
   - Ask a question
   - Verify personalized responses

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`

### R2 Not Found
- Verify bucket name matches in `wrangler.toml`
- Check R2 binding is configured in Pages settings
- Ensure bucket exists in Cloudflare dashboard

### Knowledge Base Not Loading
- Check R2 bucket has the file
- Verify file name is exactly `chatbot-knowledge-base.json`
- Check browser console for errors
- System will fallback to local KB automatically

### Authentication Errors
- Verify `ADMIN_API_TOKEN` is set in environment variables
- Check token is correct when uploading KB

## Quick Deploy Command

```bash
# Full deployment process
cd xtechs-website
npm run deploy:cloudflare
```

Then configure R2 binding and upload KB as described above.

