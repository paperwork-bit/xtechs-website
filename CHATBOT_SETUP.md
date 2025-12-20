# Chatbot Setup Guide

This guide explains how to set up the RAG-based chatbot with Cloudflare R2 storage and customer information collection.

## Overview

The chatbot system includes:
- **RAG (Retrieval-Augmented Generation)**: Knowledge base stored in Cloudflare R2
- **Customer Information Collection**: Collects customer details before chat starts
- **Personalized Responses**: Uses customer info to provide location-specific and personalized answers

## Prerequisites

1. Cloudflare account with Pages and R2 enabled
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Admin API token configured

## Step 1: Create R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** → **Create bucket**
3. Name the bucket: `xtechs-chatbot-kb`
4. Choose a location (recommended: same region as your Pages deployment)
5. Click **Create bucket**

## Step 2: Configure R2 Binding

The R2 binding is already configured in:
- `wrangler.toml`
- `wrangler.jsonc`

The binding name is `CHATBOT_KB` and bucket name is `xtechs-chatbot-kb`.

### For Cloudflare Pages Dashboard:

1. Go to your Pages project → **Settings** → **Functions**
2. Under **R2 Bucket Bindings**, add:
   - **Variable name**: `CHATBOT_KB`
   - **R2 bucket**: `xtechs-chatbot-kb`

## Step 3: Set Environment Variables

Add to your Cloudflare Pages environment variables:

```bash
# Admin token for knowledge base updates
ADMIN_API_TOKEN=your-secret-admin-token-here

# OpenAI API Configuration
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_CHAT_MODEL=gpt-4o-mini  # Optional: gpt-4o-mini (default, cost-effective), gpt-3.5-turbo (cheapest), or gpt-4o (more capable)
```

Generate a secure random token:
```bash
openssl rand -hex 32
```

### OpenAI Model Options

The chatbot uses OpenAI for generating responses. You can configure which model to use via the `OPENAI_CHAT_MODEL` environment variable:

- **`gpt-4o-mini`** (default, recommended): Best balance of cost and quality. Very cost-effective while maintaining good response quality.
- **`gpt-3.5-turbo`**: Cheapest option, still provides good responses for most queries.
- **`gpt-4o`**: More capable but more expensive. Use if you need higher quality responses.

**Note:** If `OPENAI_CHAT_MODEL` is not set, the system defaults to `gpt-4o-mini` which is already very cost-effective.

## Step 4: Upload Knowledge Base to R2

### Option A: Using the Upload Script

1. Set the `ADMIN_API_TOKEN` environment variable:
   ```bash
   export ADMIN_API_TOKEN=your-secret-token
   ```

2. Run the upload script:
   ```bash
   npx tsx scripts/upload-kb-to-r2.ts
   ```

### Option B: Using the API Directly

```bash
curl -X POST https://your-domain.com/api/chatbot/kb \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d @knowledge-base.json
```

### Option C: Using Wrangler CLI

```bash
# Put the knowledge base JSON file in R2
wrangler r2 object put xtechs-chatbot-kb/chatbot-knowledge-base.json \
  --file=knowledge-base.json
```

## Step 5: Verify Setup

1. **Check R2 Bucket**: Verify the file `chatbot-knowledge-base.json` exists in your R2 bucket
2. **Test API**: 
   ```bash
   curl https://your-domain.com/api/chatbot/kb
   ```
   Should return the knowledge base with `source: "r2"`

3. **Test Chatbot**: Open your website and click the chat button. The customer form should appear first.

## How It Works

### Customer Information Collection

When a user opens the chatbot:
1. A form appears asking for:
   - Full Name (required)
   - Email Address (required)
   - Address (required) - includes suburb and state
   - Phone Number (optional)

2. Customer info is stored in browser session storage
3. The chatbot uses this info to personalize responses:
   - Addresses customer by first name
   - Provides location-specific information
   - Suggests relevant services based on location

### RAG System

1. **Knowledge Base Storage**: All business information is stored in R2 as JSON
2. **Retrieval**: When a user asks a question:
   - System searches the knowledge base for relevant chunks
   - Scores chunks based on keyword matches
   - Returns top 3 most relevant chunks
3. **Response Generation**: 
   - Uses retrieved context to generate answers
   - Personalizes based on customer info
   - Maintains conversational, friendly tone

### Fallback Behavior

- If R2 is unavailable, falls back to local knowledge base
- If customer info is not provided, chatbot still works but without personalization
- All errors are handled gracefully with helpful messages

## Updating the Knowledge Base

### Method 1: Via API (Recommended)

1. Update `src/lib/chatbot/knowledge-base.ts`
2. Run the upload script:
   ```bash
   npx tsx scripts/upload-kb-to-r2.ts
   ```

### Method 2: Direct R2 Upload

1. Export knowledge base:
   ```typescript
   import { knowledgeBase } from './src/lib/chatbot/knowledge-base';
   console.log(JSON.stringify(knowledgeBase, null, 2));
   ```

2. Upload to R2 via Cloudflare Dashboard or Wrangler CLI

## API Endpoints

### GET `/api/chatbot/kb`
Retrieves knowledge base from R2 or falls back to local.

**Response:**
```json
{
  "knowledgeBase": [...],
  "source": "r2" | "local",
  "version": "timestamp"
}
```

### POST `/api/chatbot/kb`
Updates knowledge base in R2. Requires authentication.

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "knowledgeBase": [...]
}
```

### POST `/api/chat`
Main chat endpoint. Accepts customer info and uses R2 knowledge base.

**Body:**
```json
{
  "message": "user question",
  "conversationHistory": [...],
  "customerInfo": {
    "fullName": "John Smith",
    "email": "john@example.com",
    "address": "123 Main St, Melbourne VIC 3000",
    "phone": "0400 000 000"
  }
}
```

## Troubleshooting

### R2 Bucket Not Found
- Verify bucket name matches in `wrangler.toml` and Cloudflare Dashboard
- Check R2 binding is configured in Pages settings

### Knowledge Base Not Loading
- Check R2 bucket has the file `chatbot-knowledge-base.json`
- Verify R2 binding is correctly configured
- Check browser console for errors
- System will fallback to local knowledge base automatically

### Customer Form Not Appearing
- Clear browser session storage
- Check browser console for JavaScript errors
- Verify all required components are imported

### Authentication Errors
- Verify `ADMIN_API_TOKEN` is set correctly
- Check token matches in environment variables
- Ensure token is included in Authorization header

## Security Considerations

1. **Admin Token**: Keep `ADMIN_API_TOKEN` secret and rotate regularly
2. **Customer Data**: Customer info is stored in browser session only (not sent to server unless needed)
3. **R2 Access**: R2 bucket should have restricted access (only via bindings)
4. **Input Validation**: All customer inputs are validated before use

## Next Steps

- Monitor chatbot usage and responses
- Regularly update knowledge base with new information
- Collect feedback to improve responses
- Consider adding analytics to track common questions

