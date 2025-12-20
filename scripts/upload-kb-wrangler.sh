#!/bin/bash

# Direct upload of knowledge base to R2 using wrangler
# This script exports the knowledge base and uploads it to R2

set -e

echo "📤 Uploading knowledge base to R2..."

# Create a temporary JSON file with the knowledge base
# We'll use Node.js to extract it from the TypeScript file
node << 'NODE_SCRIPT'
const fs = require('fs');
const path = require('path');

// Read the knowledge base file
const kbPath = path.join(__dirname, '../src/lib/chatbot/knowledge-base.ts');
const kbContent = fs.readFileSync(kbPath, 'utf8');

// Extract the knowledgeBase array using regex (simple approach)
// This is a simplified extraction - in production you might want to use a proper TS parser
const kbMatch = kbContent.match(/export const knowledgeBase[^=]*=\s*(\[[\s\S]*?\]);/);
if (!kbMatch) {
  console.error('Could not extract knowledge base from TypeScript file');
  process.exit(1);
}

// For now, we'll create a script that uses tsx to import and export
console.log('Knowledge base structure found');
NODE_SCRIPT

# Use tsx to import and export the knowledge base
npx tsx << 'TSX_SCRIPT'
import { knowledgeBase } from '../src/lib/chatbot/knowledge-base';
import * as fs from 'fs';
import * as path from 'path';

const kbData = {
  knowledgeBase,
  version: Date.now(),
  updatedAt: new Date().toISOString(),
};

const tempFile = path.join(__dirname, 'kb-temp.json');
fs.writeFileSync(tempFile, JSON.stringify(kbData, null, 2));
console.log(`✅ Knowledge base exported to ${tempFile}`);
console.log(`   Contains ${knowledgeBase.length} chunks`);
TSX_SCRIPT

# Upload to R2
echo "📤 Uploading to R2..."
npx wrangler r2 object put xtechs-chatbot-kb/chatbot-knowledge-base.json \
  --file=scripts/kb-temp.json

# Clean up
rm -f scripts/kb-temp.json

echo "✅ Knowledge base uploaded successfully to R2!"

