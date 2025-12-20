// Export knowledge base to JSON for R2 upload
// Usage: node scripts/export-kb.js

const fs = require('fs');
const path = require('path');

// Since we can't directly import TS, we'll read and parse it
// For production, you might want to compile TS first or use a different approach

console.log('📤 Exporting knowledge base...');

// Read the knowledge base file
const kbPath = path.join(__dirname, '../src/lib/chatbot/knowledge-base.ts');
let kbContent = fs.readFileSync(kbPath, 'utf8');

// Simple extraction - find the knowledgeBase array
// This is a basic approach - for production use a proper TS parser
const startMarker = 'export const knowledgeBase: KnowledgeChunk[] = [';
const startIdx = kbContent.indexOf(startMarker);
if (startIdx === -1) {
  console.error('❌ Could not find knowledgeBase export');
  process.exit(1);
}

// For now, let's create a manual export or use the API approach
// The best way is to use the API endpoint after deployment

console.log('💡 To upload knowledge base:');
console.log('   1. After R2 binding is configured, use the API:');
console.log('      export ADMIN_API_TOKEN=your-token');
console.log('      npx tsx scripts/upload-kb-to-r2.ts');
console.log('');
console.log('   2. Or manually create kb.json and upload via wrangler:');
console.log('      npx wrangler r2 object put xtechs-chatbot-kb/chatbot-knowledge-base.json --file=kb.json');

