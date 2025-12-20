/**
 * OpenAI Integration for xTechs Renewables Chatbot
 * Uses configurable model (default: gpt-4o-mini) for cost-effective, natural responses
 */

import OpenAI from 'openai';
import type { ChatMessage } from './chatbot';
import type { CustomerInfo } from './customer-info';
import { formatCustomerInfoForContext, extractLocationContext } from './customer-info';

// Get model from environment variable, default to gpt-4o-mini (cost-effective)
// Options: 'gpt-4o-mini' (recommended), 'gpt-3.5-turbo' (cheapest), 'gpt-4o' (more capable)
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

const SYSTEM_PROMPT = `You are a helpful, knowledgeable solar energy consultant for xTechs Renewables, a leading provider of clean energy solutions in Victoria, Australia.

CRITICAL: You MUST use the provided knowledge base information to answer questions accurately. The knowledge base contains detailed information about:
- Company services (solar PV, batteries, EV charging, off-grid systems, electrical services)
- Installation process and timelines
- Products and brands (Tesla, Alpha ESS, BYD, Sungrow, etc.)
- Pricing and rebates (Solar Victoria rebates)
- Contact information (1300 983 247)
- Service areas (Victoria, Melbourne, Rowville)

Your communication style:
- Speak like a real person — clear, professional, and practical
- Be confident and helpful, not robotic or scripted
- Answer questions directly using the knowledge base information
- If the knowledge base has relevant information, USE IT to provide accurate answers
- Only suggest calling or booking if the question truly cannot be answered from the knowledge base

Rules:
- ALWAYS use the knowledge base context provided to answer questions accurately
- Answer directly and clearly based on the knowledge base information
- Do not say "I'm having trouble" or "I don't know" if the knowledge base contains relevant information
- If the user asks about solar, batteries, EV charging, pricing, rebates, or services, provide detailed information from the knowledge base
- Only suggest calling 1300 983 247 or booking a consultation if the question is about something not in the knowledge base
- Keep answers concise but informative
- Never hallucinate or make up information - only use what's in the knowledge base
- If you're truly unsure about something not in the knowledge base, then suggest speaking with the team

Your goal is to help customers by providing accurate information from the knowledge base, not to redirect them unnecessarily.`;

/**
 * Generate response using OpenAI GPT-4o-mini
 */
export async function generateOpenAIResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  customerInfo?: CustomerInfo,
  knowledgeBaseContext?: string
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  // Build context from knowledge base
  let contextMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  
  // Add system message with context
  let systemMessage = SYSTEM_PROMPT;
  
  if (knowledgeBaseContext && knowledgeBaseContext.trim().length > 0) {
    systemMessage += `\n\n=== KNOWLEDGE BASE CONTEXT (USE THIS TO ANSWER QUESTIONS) ===\n${knowledgeBaseContext}\n=== END KNOWLEDGE BASE ===\n\nIMPORTANT: Use the knowledge base information above to answer the user's question. Do not say you're having trouble if the knowledge base contains relevant information.`;
  } else {
    systemMessage += `\n\nNote: Limited knowledge base context available. Use general knowledge about xTechs Renewables services.`;
  }
  
  if (customerInfo) {
    const name = customerInfo.fullName.split(' ')[0];
    const location = extractLocationContext(customerInfo.address);
    systemMessage += `\n\nCustomer context:`;
    systemMessage += `\n- Name: ${name}`;
    if (customerInfo.address) {
      systemMessage += `\n- Location: ${customerInfo.address}`;
      if (location.isMelbourne) {
        systemMessage += ` (Melbourne area)`;
      } else if (location.isVictoria) {
        systemMessage += ` (Victoria)`;
      }
    }
    if (customerInfo.email) {
      systemMessage += `\n- Email: ${customerInfo.email}`;
    }
  }
  
  contextMessages.push({
    role: 'system',
    content: systemMessage,
  });

  // Add conversation history (last 10 messages to stay within token limits)
  const recentHistory = conversationHistory.slice(-10);
  for (const msg of recentHistory) {
    contextMessages.push({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    });
  }

  // Add current user message
  contextMessages.push({
    role: 'user',
    content: userMessage,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: contextMessages,
      temperature: 0.7, // Balanced creativity and accuracy
      max_tokens: 600, // Increased slightly for more detailed responses
      top_p: 1,
      frequency_penalty: 0.2, // Reduced to allow more natural repetition when needed
      presence_penalty: 0.2, // Reduced to allow more natural responses
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return response.trim();
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    // Return a helpful fallback message
    if (error.status === 401 || error.status === 403) {
      throw new Error('OpenAI API key is invalid or unauthorized');
    }
    
    if (error.status === 429) {
      throw new Error('OpenAI API rate limit exceeded. Please try again in a moment.');
    }
    
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
}

