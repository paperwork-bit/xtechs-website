import { NextRequest, NextResponse } from 'next/server';
import { 
  getKnowledgeBaseFromR2, 
  storeKnowledgeBaseToR2,
  getKnowledgeBaseVersion,
  isR2Available 
} from '@/lib/r2/knowledge-base';
import { knowledgeBase as localKnowledgeBase } from '@/lib/chatbot/knowledge-base';
import type { KnowledgeChunk } from '@/lib/chatbot/knowledge-base';

export const runtime = 'edge';

/**
 * GET - Retrieve knowledge base from R2 or fallback to local
 */
export async function GET(request: NextRequest) {
  try {
    // Try to get from R2 first
    if (isR2Available()) {
      const kbFromR2 = await getKnowledgeBaseFromR2();
      if (kbFromR2 && kbFromR2.length > 0) {
        const version = await getKnowledgeBaseVersion();
        return NextResponse.json({
          knowledgeBase: kbFromR2,
          source: 'r2',
          version: version || 'unknown',
        });
      }
    }

    // Fallback to local knowledge base
    return NextResponse.json({
      knowledgeBase: localKnowledgeBase,
      source: 'local',
      version: 'local',
    });
  } catch (error) {
    console.error('Error retrieving knowledge base:', error);
    // Fallback to local on error
    return NextResponse.json({
      knowledgeBase: localKnowledgeBase,
      source: 'local-fallback',
      version: 'local',
      error: 'Failed to retrieve from R2, using local fallback',
    });
  }
}

/**
 * POST - Update knowledge base in R2
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.ADMIN_API_TOKEN;
    
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isR2Available()) {
      return NextResponse.json(
        { error: 'R2 bucket not available' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { knowledgeBase } = body;

    if (!Array.isArray(knowledgeBase)) {
      return NextResponse.json(
        { error: 'Invalid format: knowledgeBase must be an array' },
        { status: 400 }
      );
    }

    // Validate knowledge chunks
    for (const chunk of knowledgeBase) {
      if (!chunk.id || !chunk.title || !chunk.content || !chunk.category) {
        return NextResponse.json(
          { error: 'Invalid knowledge chunk format' },
          { status: 400 }
        );
      }
    }

    const success = await storeKnowledgeBaseToR2(knowledgeBase as KnowledgeChunk[]);

    if (success) {
      const version = await getKnowledgeBaseVersion();
      return NextResponse.json({
        success: true,
        message: 'Knowledge base updated successfully',
        version: version || 'unknown',
        chunksCount: knowledgeBase.length,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to store knowledge base' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating knowledge base:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

