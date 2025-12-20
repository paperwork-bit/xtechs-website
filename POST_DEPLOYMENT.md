# Post-Deployment Setup

Your chatbot has been deployed to Cloudflare Pages! 🎉

**Deployment URL**: https://0825b447.xtechs-website.pages.dev

## ✅ Completed Steps

1. ✅ R2 bucket created: `xtechs-chatbot-kb`
2. ✅ Application deployed to Cloudflare Pages
3. ✅ All API routes deployed (including `/api/chat` and `/api/chatbot/kb`)

## 🔧 Required Configuration

### Step 1: Configure R2 Binding in Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **xtechs-website**
3. Click on **Settings** → **Functions**
4. Scroll to **R2 Bucket Bindings**
5. Click **Add binding**
6. Configure:
   - **Variable name**: `CHATBOT_KB`
   - **R2 bucket**: `xtechs-chatbot-kb`
7. Click **Save**

**Important**: After adding the binding, you may need to trigger a new deployment for it to take effect.

### Step 2: Set Environment Variables

1. In Cloudflare Pages → **Settings** → **Environment variables**
2. Add the following variable:
   - **Variable name**: `ADMIN_API_TOKEN`
   - **Value**: Generate a secure token:
     ```bash
     openssl rand -hex 32
     ```
   - **Environment**: Production (and Preview if needed)
3. Click **Save**

### Step 3: Upload Knowledge Base to R2

After the R2 binding is configured, upload the knowledge base:

#### Option A: Using Wrangler CLI (Recommended)

```bash
cd xtechs-website

# First, export the knowledge base to JSON
node -e "
const fs = require('fs');
const path = require('path');
// Note: This requires the TypeScript file to be compiled or use ts-node
// For now, we'll create it manually or use the API
"

# Or use the upload script (after setting ADMIN_API_TOKEN)
export ADMIN_API_TOKEN=your-token-here
# Update scripts/upload-kb-to-r2.ts to use your production URL
npx tsx scripts/upload-kb-to-r2.ts
```

#### Option B: Using Wrangler R2 Direct Upload

1. Create a JSON file from the knowledge base
2. Upload it:
   ```bash
   npx wrangler r2 object put xtechs-chatbot-kb/chatbot-knowledge-base.json \
     --file=knowledge-base.json
   ```

#### Option C: Using Cloudflare Dashboard

1. Go to **R2** → **xtechs-chatbot-kb** bucket
2. Click **Upload**
3. Upload the knowledge base JSON file
4. Name it exactly: `chatbot-knowledge-base.json`

### Step 4: Verify Deployment

1. **Test the chatbot**:
   - Visit your website
   - Click the chat button (bottom right)
   - Verify the customer form appears

2. **Test R2 integration**:
   ```bash
   curl https://your-domain.com/api/chatbot/kb
   ```
   Should return `"source": "r2"` if working correctly

3. **Test with customer info**:
   - Fill in the customer form
   - Ask a question like "Tell me about solar panels"
   - Verify personalized responses

## 🔄 Trigger New Deployment (if needed)

If you need to trigger a new deployment after configuring R2 binding:

```bash
cd xtechs-website
npm run deploy:cloudflare
```

Or use the deployment script:
```bash
npm run deploy
```

## 📝 Quick Reference

### Deployment Commands

```bash
# Build and deploy
npm run deploy:cloudflare

# Or use the script
npm run deploy

# Just build
npm run build:cloudflare
```

### R2 Operations

```bash
# List R2 buckets
npx wrangler r2 bucket list

# List objects in bucket
npx wrangler r2 object list xtechs-chatbot-kb

# Upload knowledge base
npx wrangler r2 object put xtechs-chatbot-kb/chatbot-knowledge-base.json --file=kb.json

# Download knowledge base
npx wrangler r2 object get xtechs-chatbot-kb/chatbot-knowledge-base.json --file=kb.json
```

## 🐛 Troubleshooting

### Chatbot not showing customer form
- Clear browser cache
- Check browser console for errors
- Verify all components are deployed

### R2 not working
- Verify R2 binding is configured in Pages settings
- Check bucket name matches exactly: `xtechs-chatbot-kb`
- Verify file exists: `chatbot-knowledge-base.json`
- System will fallback to local KB automatically

### API errors
- Check environment variables are set
- Verify ADMIN_API_TOKEN is correct
- Check Cloudflare Pages logs

## 📚 Next Steps

1. ✅ Configure R2 binding (Step 1 above)
2. ✅ Set ADMIN_API_TOKEN (Step 2 above)
3. ✅ Upload knowledge base (Step 3 above)
4. ✅ Test the chatbot (Step 4 above)
5. Monitor usage and update knowledge base as needed

## 🎉 Success!

Once all steps are completed, your chatbot will be:
- ✅ Deployed to Cloudflare Pages
- ✅ Using R2 for knowledge base storage
- ✅ Collecting customer information
- ✅ Providing personalized responses

For detailed setup instructions, see `CHATBOT_SETUP.md`.

