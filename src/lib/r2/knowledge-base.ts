/**
 * R2 Storage utilities for Chatbot Knowledge Base
 * Handles storing and retrieving knowledge base data from Cloudflare R2
 */

import type { KnowledgeChunk } from '@/lib/chatbot/knowledge-base';

const KB_KEY = 'chatbot-knowledge-base.json';
const KB_VERSION_KEY = 'chatbot-kb-version.txt';

/**
 * Get R2 bucket binding from Cloudflare environment
 */
function getR2Bucket(): R2Bucket | null {
  // @ts-ignore - R2 binding is injected by Cloudflare Pages runtime
  if (typeof process !== 'undefined' && process.env?.CHATBOT_KB) {
    return process.env.CHATBOT_KB as any;
  }
  // @ts-ignore - Try globalThis for edge runtime
  if (typeof globalThis !== 'undefined' && (globalThis as any).CHATBOT_KB) {
    return (globalThis as any).CHATBOT_KB;
  }
  return null;
}

/**
 * Retrieve knowledge base from R2
 */
export async function getKnowledgeBaseFromR2(): Promise<KnowledgeChunk[] | null> {
  try {
    const bucket = getR2Bucket();
    if (!bucket) {
      console.warn('R2 bucket not available, falling back to local knowledge base');
      return null;
    }

    const object = await bucket.get(KB_KEY);
    if (!object) {
      console.warn('Knowledge base not found in R2');
      return null;
    }

    const text = await object.text();
    const data = JSON.parse(text);
    
    if (Array.isArray(data)) {
      return data as KnowledgeChunk[];
    }
    
    // Handle wrapped format
    if (data.knowledgeBase && Array.isArray(data.knowledgeBase)) {
      return data.knowledgeBase as KnowledgeChunk[];
    }

    return null;
  } catch (error) {
    console.error('Error retrieving knowledge base from R2:', error);
    return null;
  }
}

/**
 * Store knowledge base to R2
 */
export async function storeKnowledgeBaseToR2(
  knowledgeBase: KnowledgeChunk[]
): Promise<boolean> {
  try {
    const bucket = getR2Bucket();
    if (!bucket) {
      console.error('R2 bucket not available');
      return false;
    }

    const data = {
      knowledgeBase,
      version: Date.now(),
      updatedAt: new Date().toISOString(),
    };

    await bucket.put(KB_KEY, JSON.stringify(data, null, 2), {
      httpMetadata: {
        contentType: 'application/json',
      },
      customMetadata: {
        version: data.version.toString(),
      },
    });

    // Also store version separately for quick checks
    await bucket.put(KB_VERSION_KEY, data.version.toString(), {
      httpMetadata: {
        contentType: 'text/plain',
      },
    });

    return true;
  } catch (error) {
    console.error('Error storing knowledge base to R2:', error);
    return false;
  }
}

/**
 * Get knowledge base version from R2
 */
export async function getKnowledgeBaseVersion(): Promise<string | null> {
  try {
    const bucket = getR2Bucket();
    if (!bucket) {
      return null;
    }

    const object = await bucket.get(KB_VERSION_KEY);
    if (!object) {
      return null;
    }

    return await object.text();
  } catch (error) {
    console.error('Error getting knowledge base version:', error);
    return null;
  }
}

/**
 * Check if R2 is available
 */
export function isR2Available(): boolean {
  return getR2Bucket() !== null;
}

