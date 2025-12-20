/**
 * Chatbot logic for xTechs Renewables
 * Provides conversational, friendly responses with Australian context
 */

import { getContextForQuery, searchKnowledgeBase } from './knowledge-base';
import type { CustomerInfo } from './customer-info';
import { formatCustomerInfoForContext, extractLocationContext } from './customer-info';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GREETINGS = [
  "G'day! Welcome to xTechs Renewables. I'm here to help you with any questions about our solar, battery, and renewable energy solutions. How can I assist you today?",
  "Hello! Thanks for visiting xTechs Renewables. I'm your friendly assistant here to answer questions about our clean energy services across Victoria. What would you like to know?",
  "Hi there! Great to have you here. I'm here to help you learn about our solar panels, batteries, EV chargers, and more. What can I help you with today?",
];

const FALLBACK_RESPONSES = [
  "I'm not entirely sure about that specific detail, but I'd be happy to connect you with our team who can provide more information. Would you like to book a site assessment or speak with one of our experts?",
  "That's a great question! While I don't have all the details on that, our team would be delighted to help. You can call us on 1300 983 247 or book a consultation through our contact page.",
  "I appreciate your question. For more detailed information on that topic, I'd recommend speaking directly with our team. They can provide personalized advice based on your specific situation.",
];

/**
 * Generate a friendly, conversational response
 */
export function generateResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
  customerInfo?: CustomerInfo,
  knowledgeBase?: any[]
): string {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Use provided knowledge base or fallback to local
  const kb = knowledgeBase || [];
  
  // Handle greetings
  if (isGreeting(lowerMessage)) {
    if (customerInfo) {
      const name = customerInfo.fullName.split(' ')[0]; // First name
      return `G'day ${name}! Thanks for providing your details. I'm here to help you with any questions about our solar, battery, and renewable energy solutions. How can I assist you today?`;
    }
    return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  }
  
  // Handle goodbye
  if (isGoodbye(lowerMessage)) {
    if (customerInfo) {
      const name = customerInfo.fullName.split(' ')[0];
      return `Thanks for chatting, ${name}! If you have any more questions about solar, batteries, or our services, feel free to ask. Have a great day!`;
    }
    return "Thanks for chatting! If you have any more questions about solar, batteries, or our services, feel free to ask. Have a great day!";
  }
  
  // Handle contact requests
  if (isContactRequest(lowerMessage)) {
    let response = "Absolutely! You can reach us by calling 1300 983 247, or you can book a site assessment through our contact page.";
    if (customerInfo) {
      const location = extractLocationContext(customerInfo.address);
      if (location.isMelbourne) {
        response += " Since you're in the Melbourne area, we can easily arrange a site visit.";
      } else if (location.isVictoria) {
        response += " We serve customers throughout Victoria, so we can definitely help you.";
      }
      response += " Is there a particular service you're interested in?";
    } else {
      response += " We're based in Rowville, Melbourne, and serve customers throughout Victoria. Is there a particular service you're interested in?";
    }
    return response;
  }
  
  // Handle pricing questions
  if (isPricingQuestion(lowerMessage)) {
    let response = "Great question! Solar system pricing varies based on your specific needs - things like system size, roof type, and location all factor in.";
    if (customerInfo) {
      const location = extractLocationContext(customerInfo.address);
      response += ` Since you're in ${location.location || customerInfo.address}, we can provide a more accurate quote.`;
    }
    response += " The best way to get an accurate quote is through a site assessment, which we can book for you. We also provide guidance on Solar Victoria rebates that may reduce your costs. Would you like to know more about the rebates, or would you prefer to book an assessment?";
    return response;
  }
  
  // Get relevant context from knowledge base
  const context = kb.length > 0 
    ? getContextForQueryFromKB(userMessage, kb)
    : getContextForQuery(userMessage);
  
  // Generate response based on context
  const response = craftResponse(userMessage, context, conversationHistory, customerInfo);
  
  return response;
}

/**
 * Get context from provided knowledge base
 */
function getContextForQueryFromKB(query: string, kb: any[]): string {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  
  // Score each chunk
  const scored = kb.map((chunk: any) => {
    let score = 0;
    const lowerContent = (chunk.content || '').toLowerCase();
    const lowerTitle = (chunk.title || '').toLowerCase();
    const lowerKeywords = (chunk.keywords || []).map((k: string) => k.toLowerCase()).join(' ');
    
    if (lowerTitle.includes(lowerQuery)) score += 10;
    queryWords.forEach(word => {
      if (lowerKeywords.includes(word)) score += 5;
      if (lowerTitle.includes(word)) score += 3;
      if (lowerContent.includes(word)) score += 1;
    });
    if (lowerContent.includes(lowerQuery)) score += 5;
    
    return { chunk, score };
  });
  
  // Get top 3 results
  const topChunks = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.chunk);
  
  if (topChunks.length === 0) {
    return "xTechs Renewables provides solar PV, battery storage, EV charging, and electrical services across Victoria, Australia.";
  }
  
  return topChunks
    .map((chunk: any) => `${chunk.title}: ${chunk.content}`)
    .join('\n\n');
}

function isGreeting(message: string): boolean {
  const greetingWords = ['hi', 'hello', 'hey', 'gday', 'g\'day', 'good morning', 'good afternoon', 'good evening', 'howdy'];
  return greetingWords.some(word => message.startsWith(word) || message.includes(word));
}

function isGoodbye(message: string): boolean {
  const goodbyeWords = ['bye', 'goodbye', 'thanks', 'thank you', 'cheers', 'see you', 'later'];
  return goodbyeWords.some(word => message.includes(word)) && !message.includes('question');
}

function isContactRequest(message: string): boolean {
  const contactWords = ['contact', 'phone', 'call', 'email', 'address', 'location', 'where', 'reach', 'speak', 'talk'];
  return contactWords.some(word => message.includes(word));
}

function isPricingQuestion(message: string): boolean {
  const pricingWords = ['price', 'cost', 'how much', 'expensive', 'affordable', 'budget', 'quote', 'pricing'];
  return pricingWords.some(word => message.includes(word));
}

function craftResponse(
  userMessage: string,
  context: string,
  conversationHistory: ChatMessage[],
  customerInfo?: CustomerInfo
): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // If we have good context, use it
  if (context && context.length > 50) {
    // Extract the most relevant information
    const contextLines = context.split('\n\n');
    const primaryContext = contextLines[0] || context;
    
    // Create a friendly, conversational response
    let response = primaryContext;
    
    // Personalize with customer info if available
    if (customerInfo) {
      const name = customerInfo.fullName.split(' ')[0];
      const location = extractLocationContext(customerInfo.address);
      
      // Add location-specific context
      if (location.isMelbourne && response.includes('Victoria')) {
        response = response.replace(/Victoria/g, 'your area in Melbourne');
      }
    }
    
    // Make it more conversational
    if (lowerMessage.includes('what') || lowerMessage.includes('tell me')) {
      response = `Sure thing! ${primaryContext}`;
    } else if (lowerMessage.includes('how')) {
      response = `Great question! ${primaryContext}`;
    } else if (lowerMessage.includes('do you') || lowerMessage.includes('can you')) {
      response = `Yes, absolutely! ${primaryContext}`;
    } else if (lowerMessage.includes('?')) {
      response = primaryContext;
    }
    
    // Add a helpful follow-up if appropriate
    if (!response.includes('contact') && !response.includes('1300')) {
      // Check if we should suggest next steps
      if (lowerMessage.includes('solar') || lowerMessage.includes('battery') || lowerMessage.includes('ev')) {
        if (customerInfo) {
          response += " Since we have your details, would you like me to help you book a site assessment?";
        } else {
          response += " Would you like to know more about pricing, or would you prefer to book a site assessment?";
        }
      }
    }
    
    return response;
  }
  
  // Fallback response
  let fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  if (customerInfo) {
    const name = customerInfo.fullName.split(' ')[0];
    fallback = fallback.replace('you', name);
  }
  return fallback;
}

/**
 * Get a random greeting for initial chat
 */
export function getInitialGreeting(): string {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

