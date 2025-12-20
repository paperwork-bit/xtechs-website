# OpenAI Chatbot Setup Guide

This guide will help you set up OpenAI GPT-4o-mini integration for the xTechs Renewables chatbot.

## 🚀 Quick Setup Steps

### Step 1: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section (https://platform.openai.com/api-keys)
4. Click **Create new secret key**
5. Give it a name (e.g., "xTechs Chatbot")
6. Copy the API key immediately (you won't be able to see it again)

### Step 2: Add Environment Variable

#### For Local Development (.env.local)

Create or update `.env.local` file in the project root:

```bash
# OpenAI API Configuration (REQUIRED for chatbot)
OPENAI_API_KEY=sk-your-api-key-here
```

#### For Cloudflare Pages Deployment

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **xtechs-website** → **Settings** → **Environment Variables**
3. Click **Add variable**
4. Variable name: `OPENAI_API_KEY`
5. Value: Your OpenAI API key (starts with `sk-`)
6. Select environment: **Production** (and optionally **Preview**)
7. Click **Save**

### Step 3: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the chatbot on your website
3. Send a test message
4. You should receive a natural, conversational response from GPT-4o-mini

## 📋 Model Configuration

The chatbot uses:
- **Model**: GPT-4o-mini (cost-effective, fast, and capable)
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 500 (keeps responses concise)
- **Context**: Includes knowledge base and conversation history

## 💰 Pricing

GPT-4o-mini is OpenAI's most cost-effective model:
- **Input**: $0.15 per 1M tokens
- **Output**: $0.60 per 1M tokens

For typical chatbot usage, costs are minimal (usually under $10/month for moderate traffic).

## 🔒 Security Notes

- **Never commit** your API key to git
- The API key is server-side only (not exposed to the browser)
- Keep your API key secure and rotate it if compromised
- Set usage limits in OpenAI dashboard to prevent unexpected charges

## 🛠️ Troubleshooting

### Error: "OPENAI_API_KEY is not configured"
- Make sure you've added the environment variable
- Restart your development server after adding the variable
- For Cloudflare Pages, trigger a new deployment after adding the variable

### Error: "OpenAI API key is invalid"
- Verify your API key is correct
- Check if your OpenAI account has credits/billing set up
- Ensure the API key hasn't been revoked

### Error: "OpenAI API rate limit exceeded"
- You've hit OpenAI's rate limits
- The chatbot will show a helpful fallback message
- Consider upgrading your OpenAI plan for higher limits

### Fallback Behavior

If OpenAI fails for any reason, the chatbot will:
- Show a helpful error message
- Suggest calling directly: 1300 983 247
- Continue working (just without AI responses)

## 📝 Chatbot Personality

The chatbot is configured to:
- Sound like a real person (not robotic)
- Answer directly and clearly
- Ask follow-up questions when needed
- Guide users toward next steps
- Never hallucinate technical specs or rebates
- Admit when unsure and suggest confirmation

## 🔄 Updating the System Prompt

To modify the chatbot's personality, edit:
`src/lib/chatbot/openai.ts` → `SYSTEM_PROMPT` constant

## ✅ Checklist

- [ ] Created OpenAI account
- [ ] Generated API key
- [ ] Added `OPENAI_API_KEY` to `.env.local` (local)
- [ ] Added `OPENAI_API_KEY` to Cloudflare Pages (production)
- [ ] Tested chatbot responses
- [ ] Verified fallback behavior works
- [ ] Set up billing/usage limits in OpenAI dashboard

