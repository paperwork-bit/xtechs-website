/**
 * Script to upload knowledge base to Cloudflare R2
 * 
 * Usage:
 *   npx tsx scripts/upload-kb-to-r2.ts
 * 
 * Requires:
 *   - ADMIN_API_TOKEN environment variable
 *   - R2 bucket configured in Cloudflare
 */

import { knowledgeBase } from '../src/lib/chatbot/knowledge-base';

// Use production URL if available, otherwise try to detect from environment
const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 
                process.env.CF_PAGES_URL || 
                'https://0825b447.xtechs-website.pages.dev';
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN;

async function uploadKnowledgeBase() {
  if (!ADMIN_TOKEN) {
    console.error('❌ ADMIN_API_TOKEN environment variable is required');
    console.log('\nPlease set it in your .env file:');
    console.log('ADMIN_API_TOKEN=your-secret-token');
    process.exit(1);
  }

  console.log('📤 Uploading knowledge base to R2...');
  console.log(`   Knowledge base contains ${knowledgeBase.length} chunks`);

  try {
    const response = await fetch(`${API_URL}/api/chatbot/kb`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({
        knowledgeBase,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Successfully uploaded knowledge base to R2!');
    console.log(`   Version: ${result.version}`);
    console.log(`   Chunks: ${result.chunksCount}`);
    console.log(`   Message: ${result.message}`);
  } catch (error: any) {
    console.error('❌ Failed to upload knowledge base:', error.message);
    if (error.message.includes('Unauthorized')) {
      console.log('\n💡 Make sure ADMIN_API_TOKEN is set correctly');
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  uploadKnowledgeBase();
}

export { uploadKnowledgeBase };

