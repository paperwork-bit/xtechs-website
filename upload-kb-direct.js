// Direct upload script using wrangler R2
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Import knowledge base (simplified - you may need to adjust)
const kbPath = path.join(__dirname, '../src/lib/chatbot/knowledge-base.ts');

console.log('📤 Uploading knowledge base to R2...');
console.log('Note: This requires the knowledge base to be exported as JSON');

// For now, create a simple JSON structure
const knowledgeBase = require('../src/lib/chatbot/knowledge-base');

const kbData = {
  knowledgeBase: knowledgeBase.knowledgeBase,
  version: Date.now(),
  updatedAt: new Date().toISOString()
};

const tempFile = path.join(__dirname, 'kb-temp.json');
fs.writeFileSync(tempFile, JSON.stringify(kbData, null, 2));

try {
  execSync(`npx wrangler r2 object put xtechs-chatbot-kb/chatbot-knowledge-base.json --file=${tempFile}`, {
    stdio: 'inherit'
  });
  console.log('✅ Knowledge base uploaded successfully!');
  fs.unlinkSync(tempFile);
} catch (error) {
  console.error('❌ Failed to upload:', error.message);
  if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  process.exit(1);
}
