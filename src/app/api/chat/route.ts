import { NextRequest, NextResponse } from 'next/server';
import { generateOpenAIResponse } from '@/lib/chatbot/openai';
import type { ChatMessage } from '@/lib/chatbot/chatbot';
import type { CustomerInfo } from '@/lib/chatbot/customer-info';
import { getKnowledgeBaseFromR2 } from '@/lib/r2/knowledge-base';
import { knowledgeBase as localKnowledgeBase, getContextForQuery } from '@/lib/chatbot/knowledge-base';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [], customerInfo } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Convert conversation history to the right format
    const history: ChatMessage[] = conversationHistory.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.timestamp || Date.now()),
    }));

    // Parse customer info if provided
    let parsedCustomerInfo: CustomerInfo | undefined;
    if (customerInfo) {
      parsedCustomerInfo = {
        fullName: customerInfo.fullName,
        email: customerInfo.email,
        address: customerInfo.address,
        phone: customerInfo.phone,
        collectedAt: new Date(customerInfo.collectedAt || Date.now()),
      };
    }

    // Try to get knowledge base from R2, fallback to local
    let knowledgeBase = localKnowledgeBase;
    try {
      const kbFromR2 = await getKnowledgeBaseFromR2();
      if (kbFromR2 && kbFromR2.length > 0) {
        knowledgeBase = kbFromR2;
      }
    } catch (error) {
      console.warn('Failed to fetch from R2, using local knowledge base:', error);
      // Continue with local knowledge base
    }

    // Get relevant context from knowledge base for the user's query
    const knowledgeBaseContext = getContextForQuery(message);

    // Generate response using OpenAI
    let response: string;
    try {
      response = await generateOpenAIResponse(
        message,
        history,
        parsedCustomerInfo,
        knowledgeBaseContext
      );
    } catch (error: any) {
      console.error('OpenAI error:', error);
      
      // Fallback to a helpful message if OpenAI fails
      if (error.message?.includes('API key')) {
        response = "I'm having trouble connecting right now. Please call us directly on 1300 983 247 for immediate assistance.";
      } else if (error.message?.includes('rate limit')) {
        response = "I'm receiving a lot of messages right now. Please try again in a moment, or call us on 1300 983 247.";
      } else {
        response = "I'm having a bit of trouble right now. Could you try rephrasing your question, or would you prefer to speak with our team directly? You can call us on 1300 983 247.";
      }
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error. Please try again or contact us directly at 1300 983 247.',
        response: "I'm having a bit of trouble right now. Could you try rephrasing your question, or would you prefer to speak with our team directly? You can call us on 1300 983 247."
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chat API is running',
    greeting: "G'day! I'm here to help with questions about xTechs Renewables.",
  });
}

