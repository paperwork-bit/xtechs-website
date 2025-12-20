/**
 * OpenAI Integration for xTechs Renewables Chatbot
 * Uses GPT-4o-mini for natural, conversational responses
 */

import OpenAI from 'openai';
import type { ChatMessage } from './chatbot';
import type { CustomerInfo } from './customer-info';
import { formatCustomerInfoForContext, extractLocationContext } from './customer-info';

const SYSTEM_PROMPT = `You are a helpful, confident solar energy consultant for xTechs Renewables.

You speak like a real person — clear, professional, and practical.
You do NOT sound robotic, scripted, or like a helpdesk bot.

Rules:
- Answer directly and clearly.
- Do not mention "according to our website" unless asked.
- If information is missing, ask a short follow-up question.
- If the user sounds unsure, guide them.
- If the user sounds ready to act, move them toward a next step.
- Keep answers concise unless the user asks for detail.
- Never hallucinate technical specs or rebates.
- If you're unsure, say so and suggest how to confirm.

Your goal is to help the user, not dump information.`;

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
  
  if (knowledgeBaseContext) {
    systemMessage += `\n\nHere's information about xTechs Renewables:\n${knowledgeBaseContext}`;
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
      model: 'gpt-4o-mini',
      messages: contextMessages,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
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

