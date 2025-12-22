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
- Products and brands (note: complete product list is being updated on website)
- Rebates (Solar Victoria rebates)
- Site visits and property inspections
- Contact information (1300 983 247)
- Service areas (Victoria, Melbourne, Rowville)

Your communication style:
- Speak like a real person — clear, professional, and practical
- Be confident and helpful, not robotic or scripted
- Answer questions directly using the knowledge base information
- If the knowledge base has relevant information, USE IT to provide accurate answers
- Only suggest calling or booking if the question truly cannot be answered from the knowledge base
- Use natural, conversational language with appropriate Australian expressions when fitting
- Show enthusiasm about renewable energy solutions

Response formatting:
- Use clear, well-structured responses with proper paragraphs
- Break up long information into digestible chunks
- Use bullet points or numbered lists when listing multiple items (e.g., features, benefits, steps)
- Keep paragraphs to 2-3 sentences for readability
- Use line breaks to separate different topics or ideas

Conversation flow:
- Reference previous parts of the conversation when relevant (e.g., "As we discussed earlier...")
- Ask clarifying questions if the user's question is ambiguous
- Provide natural transitions between topics
- End responses with a helpful follow-up question or next step when appropriate (but don't force it)
- Acknowledge when you're building on previous information

Rules:
- ALWAYS use the knowledge base context provided to answer questions accurately
- Answer directly and clearly based on the knowledge base information
- Do not say "I'm having trouble" or "I don't know" if the knowledge base contains relevant information
- If the user asks about solar, batteries, EV charging, rebates, or services, provide detailed information from the knowledge base
- Keep answers informative but not overwhelming (aim for 2-4 sentences per main point) 
- Never hallucinate or make up information - only use what's in the knowledge base
- If you're truly unsure about something not in the knowledge base, then suggest speaking with the team
- When providing information, be specific and include relevant details (e.g., warranty periods, system sizes, rebate information if mentioned in knowledge base)

CRITICAL PRICING POLICY:
- NEVER discuss specific prices, costs, or pricing information
- NEVER mention dollar amounts or price ranges
- NEVER say things like "starts from $X" or "typically costs $Y"
- When users ask about pricing, costs, "how much", or anything related to money, you MUST:
  1. Acknowledge their question: "That's a great question!"
  2. Explain why a site visit is needed: "Pricing depends on many factors specific to your property and needs"
  3. Recommend booking a site visit: "The best way to get accurate pricing is through a site visit. Our in-house installer will come to inspect your property and help you with the best options available based on your specific situation."
  4. Mention product range: "We cater with entry level to premium products, so we can find the perfect solution for your budget and needs."
  5. Direct them to book: "Would you like me to help you book a site visit? It's the best way to get a personalized quote."
- Always redirect pricing questions to booking a site visit - this gives both you and the customer a better understanding

Site Visit Booking (IMPORTANT):
- When customers ask about pricing, quotes, site visits, or want to get started, redirect them to book a site visit
- Instead of collecting customer details, encourage them to use the "Book Site Visit" link or visit the contact page
- You can still ask for their name naturally during conversation for a personalized experience, but don't collect email/address
- When mentioning booking or site visits, include a link in your response like: "You can [Book Site Visit](/contact) to get started" or "Visit our [booking page](/contact) to schedule your site assessment"
- Always mention the booking link when discussing: pricing, quotes, site visits, getting started, or when customers seem ready to proceed
- The booking page (/contact) has a calendar where they can select their preferred date and time for a site assessment
- Use markdown link format: [Book Site Visit](/contact) or [book a site visit](/contact) in your responses

Your goal is to help customers by providing accurate information from the knowledge base and guide them to book a site visit when they're ready. Make the conversation feel natural and helpful.`;

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
  
  // Get current date in Australia/Melbourne timezone for date validation
  const now = new Date();
  const australiaDate = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Melbourne' }));
  const currentDateStr = australiaDate.toLocaleDateString('en-AU', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Australia/Melbourne'
  });
  const currentYear = australiaDate.getFullYear();
  const currentMonth = australiaDate.getMonth() + 1; // 1-12
  const currentDay = australiaDate.getDate();
  
  // Add system message with context
  let systemMessage = SYSTEM_PROMPT;
  
  // Add current date context for proper date validation
  systemMessage += `\n\n=== CURRENT DATE CONTEXT ===\nToday's date: ${currentDateStr} (Australia/Melbourne timezone)\nCurrent year: ${currentYear}\nCurrent month: ${currentMonth}\nCurrent day: ${currentDay}\n\nIMPORTANT: When users mention dates for site visits or appointments:\n- Use the current date above to validate if dates are reasonable\n- Dates within the next 3-6 months are perfectly normal and should be accepted\n- Only question dates if they are clearly in the past or more than 6-12 months in the future\n- If a user says "27th December 2025" and we're in December 2024, that's only about a month away - accept it normally\n- Do NOT assume dates are typos unless they're clearly unreasonable (e.g., dates from years ago or decades in the future)\n=== END DATE CONTEXT ===\n`;
  
  if (knowledgeBaseContext && knowledgeBaseContext.trim().length > 0) {
    systemMessage += `\n\n=== KNOWLEDGE BASE CONTEXT (USE THIS TO ANSWER QUESTIONS) ===\n${knowledgeBaseContext}\n=== END KNOWLEDGE BASE ===\n\nIMPORTANT: Use the knowledge base information above to answer the user's question. Do not say you're having trouble if the knowledge base contains relevant information.`;
  } else {
    systemMessage += `\n\nNote: Limited knowledge base context available. Use general knowledge about xTechs Renewables services.`;
  }
  
  // Customer info (name only) for personalization - we don't collect email/address anymore
  if (customerInfo && customerInfo.fullName) {
    const name = customerInfo.fullName.split(' ')[0];
    systemMessage += `\n\nCustomer context:`;
    systemMessage += `\n- Name: ${name} (use for personalization)`;
    if (customerInfo.address) {
      const location = extractLocationContext(customerInfo.address);
      systemMessage += `\n- Location: ${customerInfo.address}`;
      if (location.isMelbourne) {
        systemMessage += ` (Melbourne area)`;
      } else if (location.isVictoria) {
        systemMessage += ` (Victoria)`;
      }
      systemMessage += ` (for context only - don't collect this)`;
    }
    systemMessage += `\n\nIMPORTANT: Do NOT collect email/address/phone. Instead, redirect customers to book a site visit using the "Book Site Visit" button or /contact page.`;
  }
  
  // Add conversation context summary if conversation is longer
  if (conversationHistory.length > 4) {
    const recentTopics = extractConversationTopics(conversationHistory);
    if (recentTopics.length > 0) {
      systemMessage += `\n\nConversation context: The user has been discussing: ${recentTopics.join(', ')}. Reference these topics naturally when relevant, but don't force connections.`;
    }
  }
  
  contextMessages.push({
    role: 'system',
    content: systemMessage,
  });

  // Add conversation history with smart context management
  // Keep more recent messages (last 12) and include earlier key messages if available
  const totalMessages = conversationHistory.length;
  let recentHistory: ChatMessage[] = [];
  
  if (totalMessages <= 12) {
    // If conversation is short, include all messages
    recentHistory = conversationHistory;
  } else {
    // For longer conversations, keep:
    // - Last 12 messages (recent context)
    // - First 2-3 messages (initial context and greeting)
    const lastMessages = conversationHistory.slice(-12);
    const firstMessages = conversationHistory.slice(0, 3);
    
    // Combine, avoiding duplicates
    const messageSet = new Set<string>();
    recentHistory = [];
    
    // Add first messages (if not too old)
    for (const msg of firstMessages) {
      const key = `${msg.role}-${msg.content.substring(0, 50)}`;
      if (!messageSet.has(key)) {
        recentHistory.push(msg);
        messageSet.add(key);
      }
    }
    
    // Add recent messages
    for (const msg of lastMessages) {
      const key = `${msg.role}-${msg.content.substring(0, 50)}`;
      if (!messageSet.has(key)) {
        recentHistory.push(msg);
        messageSet.add(key);
      }
    }
  }
  
  // Add conversation history to context
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
      temperature: 0.8, // Slightly higher for more natural, varied responses
      max_tokens: 800, // Increased for more detailed, well-formatted responses
      top_p: 0.95, // Slightly lower for better focus
      frequency_penalty: 0.1, // Lower penalty for more natural conversation flow
      presence_penalty: 0.1, // Lower penalty to allow topic continuity
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

/**
 * Determine what customer information is missing
 */
function getMissingCustomerInfo(customerInfo?: CustomerInfo): string[] {
  const missing: string[] = [];
  
  if (!customerInfo) {
    return ['name', 'email', 'address'];
  }
  
  if (!customerInfo.fullName || customerInfo.fullName.trim().length < 2) {
    missing.push('name');
  }
  
  if (!customerInfo.email || !customerInfo.email.includes('@')) {
    missing.push('email');
  }
  
  if (!customerInfo.address || customerInfo.address.trim().length < 5) {
    missing.push('address');
  }
  
  return missing;
}

/**
 * Extract main topics from conversation history for context
 */
function extractConversationTopics(history: ChatMessage[]): string[] {
  const topics: Set<string> = new Set();
  const topicKeywords: { [key: string]: string[] } = {
    'solar': ['solar', 'pv', 'panels', 'photovoltaic'],
    'battery': ['battery', 'batteries', 'storage', 'powerwall'],
    'ev': ['ev', 'electric vehicle', 'charging', 'charger'],
    'pricing': ['price', 'cost', 'how much', 'affordable', 'budget'],
    'rebates': ['rebate', 'incentive', 'solar victoria', 'subsidy'],
    'installation': ['install', 'installation', 'process', 'timeline'],
    'commercial': ['commercial', 'business', 'office', 'shop'],
    'residential': ['residential', 'home', 'house', 'domestic'],
    'off-grid': ['off-grid', 'offgrid', 'hybrid', 'remote'],
  };
  
  // Analyze last 6 messages for topics
  const recentMessages = history.slice(-6);
  const combinedText = recentMessages.map(msg => msg.content.toLowerCase()).join(' ');
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => combinedText.includes(keyword))) {
      topics.add(topic);
    }
  }
  
  return Array.from(topics);
}

