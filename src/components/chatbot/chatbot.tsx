"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minimize2, Maximize2, Calendar } from "lucide-react";
import { getInitialGreeting } from "@/lib/chatbot/chatbot";
import type { ChatMessage } from "@/lib/chatbot/chatbot";
import type { CustomerInfo } from "@/lib/chatbot/customer-info";
import { WelcomePrompt } from "./welcome-prompt";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";

// Configure marked for better formatting
marked.setOptions({
  breaks: false, // Don't convert single line breaks to <br> (better for lists)
  gfm: true, // GitHub Flavored Markdown
});

// Helper function to parse markdown safely
function parseMarkdown(content: string): string {
  try {
    if (!content || typeof content !== 'string') {
      return '';
    }
    
    const trimmedContent = content.trim();
    
    // Parse markdown - marked.parse() returns a string in v16
    const parsed = marked.parse(trimmedContent, {
      breaks: false,
      gfm: true,
    });
    
    // marked.parse() in v16 returns a string directly
    const result = typeof parsed === 'string' ? parsed : String(parsed || trimmedContent);
    
    // Verify that markdown was actually parsed (check for <strong> tags)
    if (trimmedContent.includes('**') && !result.includes('<strong>')) {
      console.warn('Markdown parsing may have failed. Input:', trimmedContent.substring(0, 100));
      console.warn('Output:', result.substring(0, 100));
    }
    
    return result;
  } catch (error) {
    console.error('Markdown parsing error:', error, 'Content:', content.substring(0, 50));
    // Fallback: escape HTML and return as plain text
    return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

// Check if message should show booking link
function shouldShowBookingLink(content: string): boolean {
  const lowerContent = content.toLowerCase();
  const bookingKeywords = [
    'book', 'booking', 'site visit', 'site assessment', 'quote', 'pricing', 
    'get started', 'appointment', 'schedule', 'contact page', '/contact'
  ];
  return bookingKeywords.some(keyword => lowerContent.includes(keyword));
}

// Get time-based greeting for Victoria, Australia
function getTimeBasedGreeting(customerInfo: CustomerInfo | null): string {
  // Get current time in Victoria, Australia (AEST/AEDT)
  const now = new Date();
  const victoriaTime = new Date(now.toLocaleString("en-US", { timeZone: "Australia/Melbourne" }));
  const hour = victoriaTime.getHours();
  
  let timeGreeting = "";
  if (hour >= 5 && hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    timeGreeting = "Good afternoon";
  } else if (hour >= 17 && hour < 21) {
    timeGreeting = "Good evening";
  } else {
    timeGreeting = "G'day";
  }
  
  if (customerInfo) {
    const name = customerInfo.fullName.split(' ')[0];
    return `${timeGreeting} ${name}! I'm here to help you with any questions about our solar, battery, and renewable energy solutions. How can I assist you today?`;
  } else {
    // If no customer info, the AI will naturally ask for it in the conversation
    const greetings = [
      `${timeGreeting}! Welcome to xTechs Renewables. I'm here to help you with any questions about our solar, battery, and renewable energy solutions. How can I assist you today?`,
      `${timeGreeting}! Thanks for visiting xTechs Renewables. I'm your friendly assistant here to answer questions about our clean energy services across Victoria. What would you like to know?`,
      `${timeGreeting}! Great to have you here. I'm here to help you learn about our solar panels, batteries, EV chargers, and more. What can I help you with today?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

export function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check for welcome prompt on mount
  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('chatbot-welcome-seen');
    if (!hasSeenPrompt) {
      // Show welcome prompt after a delay
      const timer = setTimeout(() => {
        setShowWelcomePrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Reset when chat opens
  useEffect(() => {
    if (isOpen) {
      // Check if customer info exists in session storage
      const storedInfo = sessionStorage.getItem('chatbot-customer-info');
      if (storedInfo) {
        try {
          const parsed = JSON.parse(storedInfo);
          setCustomerInfo(parsed);
        } catch (e) {
          // Invalid stored data, ignore
        }
      }
    } else {
      // Reset when closed
      setMessages([]);
    }
  }, [isOpen]);

  // Initialize with greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Get time-based greeting for Victoria, Australia
      const greeting = getTimeBasedGreeting(customerInfo);
      setMessages([
        {
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length, customerInfo]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleWelcomeStartChat = () => {
    setShowWelcomePrompt(false);
    setIsOpen(true);
  };

  const handleWelcomeDismiss = () => {
    setShowWelcomePrompt(false);
  };


  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);
    setSuggestedQuestions([]); // Clear suggestions when user sends a message

    // Check if user is providing customer info naturally (for conversation context only)
    const updatedCustomerInfo = extractCustomerInfoFromMessage(currentInput, customerInfo);
    if (updatedCustomerInfo && updatedCustomerInfo !== customerInfo) {
      setCustomerInfo(updatedCustomerInfo);
      sessionStorage.setItem('chatbot-customer-info', JSON.stringify(updatedCustomerInfo));
    }

    try {
      // Add human-like delay (1-3 seconds)
      const delay = Math.random() * 2000 + 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages,
          customerInfo: updatedCustomerInfo || customerInfo,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response || "I'm sorry, I didn't understand that. Could you rephrase?",
        timestamp: new Date(data.timestamp || Date.now()),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Generate suggested follow-up questions based on the response
      const suggestions = generateSuggestedQuestions(data.response, currentInput, messages);
      setSuggestedQuestions(suggestions);
      
      // Note: We don't check again here to prevent duplicate saves
      // Customer info is already checked and saved above if needed
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment, or call us on 1300 983 247.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Redirect to booking page
  function redirectToBooking() {
    router.push('/contact');
  }

  // Extract customer info from natural conversation
  function extractCustomerInfoFromMessage(message: string, existingInfo: CustomerInfo | null): CustomerInfo | null {
    const lowerMessage = message.toLowerCase();
    let info = existingInfo ? { ...existingInfo } : null;

    // Extract name - enhanced patterns
    if (!info || !info.fullName) {
      const namePatterns = [
        /(?:my name is|i'm|i am|call me|this is|it's|it is|name's|name is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
        /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)(?:\s+here|\s+speaking)/i,
        /(?:i'm|i am)\s+([A-Z][a-z]+)/i,
        /(?:name|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
        /^([A-Z][a-z]+)\s*[,.]/i, // "John," or "John."
      ];
      for (const pattern of namePatterns) {
        const match = message.match(pattern);
        if (match && match[1]) {
          const extractedName = match[1].trim();
          // Basic validation - at least 2 characters, starts with letter
          if (extractedName.length >= 2 && /^[A-Za-z]/.test(extractedName)) {
            info = info || { fullName: "", email: "", address: "", collectedAt: new Date() };
            info.fullName = extractedName;
            break;
          }
        }
      }
    }

    // Extract site visit date and time
    if (!info || !info.siteVisitDate || !info.siteVisitTime) {
      // Patterns for dates: "23rd December 2025", "December 23, 2025", "23/12/2025", etc.
      const datePatterns = [
        /(?:visit|appointment|site visit|booking|booked|scheduled)\s+(?:for|on|at)?\s*(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})/i,
        /(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})/i,
        /(\d{1,2}\/\d{1,2}\/\d{4})/,
        /(\d{4}-\d{2}-\d{2})/,
      ];
      
      // Patterns for times: "12 PM", "12:00 PM", "12pm", "12:00", etc.
      const timePatterns = [
        /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/i,
        /(\d{1,2}\s*(?:AM|PM|am|pm))/i,
        /(\d{1,2}:\d{2})/,
        /(?:at|@)\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)/i,
      ];
      
      let extractedDate: string | undefined;
      let extractedTime: string | undefined;
      
      // Try to find date
      for (const pattern of datePatterns) {
        const match = message.match(pattern);
        if (match && match[1]) {
          extractedDate = match[1].trim();
          break;
        }
      }
      
      // Try to find time
      for (const pattern of timePatterns) {
        const match = message.match(pattern);
        if (match && match[1]) {
          extractedTime = match[1].trim();
          break;
        }
      }
      
      // If we found date or time, update info
      if (extractedDate || extractedTime) {
        if (!info) {
          info = { fullName: "", email: "", address: "", collectedAt: new Date() };
        }
        if (extractedDate && !info.siteVisitDate) {
          info.siteVisitDate = extractedDate;
        }
        if (extractedTime && !info.siteVisitTime) {
          info.siteVisitTime = extractedTime;
        }
      }
    }

    // Extract email
    if (!info || !info.email) {
      const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
      const emailMatch = message.match(emailPattern);
      if (emailMatch && emailMatch[1]) {
        if (!info) {
          info = { fullName: "", email: "", address: "", collectedAt: new Date() };
        }
        info.email = emailMatch[1].trim();
      }
    }

    // Extract phone
    if (!info || !info.phone) {
      const phonePattern = /(\+?61|0)[2-478](?:[ -]?[0-9]){8}/;
      const phoneMatch = message.match(phonePattern);
      if (phoneMatch && phoneMatch[0]) {
        if (!info) {
          info = { fullName: "", email: "", address: "", collectedAt: new Date() };
        }
        info.phone = phoneMatch[0].trim();
      }
    }

    // Extract address - enhanced patterns
    if (!info || !info.address) {
      const addressPatterns = [
        /(?:i live in|i'm in|i'm from|address is|located in|based in|i'm at|i live at|my address is|we're in|we're from)\s+([^,]+(?:,\s*VIC|,\s*Victoria|,\s*Melbourne)?[^.]*)/i,
        /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,?\s*(?:VIC|Victoria|Melbourne)[^.]*)/i,
        /(\d+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,?\s*(?:VIC|Victoria|Melbourne)[^.]*)/i,
        /(?:in|at|from)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*(?:VIC|Victoria|Melbourne)?/i,
        /([A-Z][a-z]+)\s+(?:VIC|Victoria|Melbourne)/i, // "Rowville VIC" or "Melbourne Victoria"
        /\b(\d{4})\b/, // Australian postcode (4 digits)
      ];
      for (const pattern of addressPatterns) {
        const match = message.match(pattern);
        if (match && match[1]) {
          const extractedAddress = match[1].trim();
          // Basic validation - at least 3 characters
          if (extractedAddress.length >= 3) {
            if (!info) {
              info = { fullName: "", email: "", address: "", collectedAt: new Date() };
            }
            // If it's just a postcode, try to get more context
            if (/^\d{4}$/.test(extractedAddress)) {
              // Look for suburb name before postcode
              const suburbMatch = message.match(/([A-Z][a-z]+)\s+\d{4}/i);
              if (suburbMatch && suburbMatch[1]) {
                info.address = `${suburbMatch[1]} ${extractedAddress} VIC`;
              } else {
                info.address = extractedAddress;
              }
            } else {
              info.address = extractedAddress;
            }
            break;
          }
        }
      }
    }

    // Extract system type
    const systemTypePatterns = [
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:a\s+)?(?:solar\s+)?(?:pv\s+)?(?:system\s+)?(?:\+|\s+and\s+)?(?:battery|batteries|storage)/i, type: "Solar PV + Battery" },
      { pattern: /(?:solar\s+)?(?:pv\s+)?(?:system\s+)?(?:\+|\s+and\s+)?(?:battery|batteries|storage)/i, type: "Solar PV + Battery" },
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:a\s+)?(?:solar\s+)?(?:pv\s+)?system/i, type: "Solar PV System" },
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:a\s+)?(?:battery|batteries|storage)(?:\s+system)?/i, type: "Battery Storage" },
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:an\s+)?(?:ev\s+)?(?:electric\s+vehicle\s+)?(?:car\s+)?charg(?:er|ing)/i, type: "EV Charging" },
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:an?\s+)?(?:off[- ]?grid|offgrid)(?:\s+system)?/i, type: "Off-Grid System" },
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:electrical\s+)?(?:services|work)/i, type: "Electrical Services" },
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:commercial\s+)?(?:solar|pv)/i, type: "Commercial Solar" },
      { pattern: /(?:interested in|want|need|looking for|considering|getting|installing|getting a quote for)\s+(?:residential\s+)?(?:solar|pv)/i, type: "Residential Solar" },
      // Simple patterns
      { pattern: /\b(solar\s+pv\s*\+\s*battery|solar\s*\+\s*battery|pv\s*\+\s*battery)\b/i, type: "Solar PV + Battery" },
      { pattern: /\b(solar\s+pv|pv\s+system)\b/i, type: "Solar PV System" },
      { pattern: /\b(battery\s+storage|battery\s+system)\b/i, type: "Battery Storage" },
      { pattern: /\b(ev\s+charger|ev\s+charging|electric\s+vehicle\s+charger)\b/i, type: "EV Charging" },
      { pattern: /\b(off[- ]?grid|offgrid)\b/i, type: "Off-Grid System" },
    ];

    for (const { pattern, type } of systemTypePatterns) {
      const match = message.match(pattern);
      if (match) {
        if (!info) {
          info = { fullName: "", email: "", address: "", collectedAt: new Date() };
        }
        info.systemType = type;
        break; // Use first match
      }
    }

    // Only return if we have at least name or email
    if (info && (info.fullName || info.email)) {
      return info as CustomerInfo;
    }

    return existingInfo;
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = async (question: string) => {
    // Check if user wants to book a site visit
    if (question.toLowerCase().includes('book') && question.toLowerCase().includes('site visit')) {
      redirectToBooking();
      return;
    }

    setSuggestedQuestions([]);
    
    // Create user message directly
    const userMessage: ChatMessage = {
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Check if user is providing customer info naturally (for conversation context only)
    const updatedCustomerInfo = extractCustomerInfoFromMessage(question, customerInfo);
    if (updatedCustomerInfo && updatedCustomerInfo !== customerInfo) {
      setCustomerInfo(updatedCustomerInfo);
      sessionStorage.setItem('chatbot-customer-info', JSON.stringify(updatedCustomerInfo));
    }

    try {
      // Add human-like delay (1-3 seconds)
      const delay = Math.random() * 2000 + 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          conversationHistory: messages,
          customerInfo: updatedCustomerInfo || customerInfo,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response || "I'm sorry, I didn't understand that. Could you rephrase?",
        timestamp: new Date(data.timestamp || Date.now()),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Generate suggested follow-up questions based on the response
      const suggestions = generateSuggestedQuestions(data.response, question, messages);
      setSuggestedQuestions(suggestions);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment, or call us on 1300 983 247.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Generate suggested questions based on conversation context
  function generateSuggestedQuestions(
    lastResponse: string,
    lastUserMessage: string,
    conversationHistory: ChatMessage[]
  ): string[] {
    const lowerResponse = lastResponse.toLowerCase();
    const lowerUserMessage = lastUserMessage.toLowerCase();
    const suggestions: string[] = [];

    // If user asked about solar, suggest related topics
    if (lowerUserMessage.includes('solar') || lowerResponse.includes('solar')) {
      if (!lowerResponse.includes('battery')) {
        suggestions.push("What about battery storage?");
      }
      if (!lowerResponse.includes('rebate')) {
        suggestions.push("Are there any rebates available?");
      }
      if (!lowerResponse.includes('price') && !lowerResponse.includes('cost')) {
        suggestions.push("How much does a solar system cost?");
      }
    }

    // If user asked about batteries, suggest related topics
    if (lowerUserMessage.includes('battery') || lowerResponse.includes('battery')) {
      if (!lowerResponse.includes('tesla')) {
        suggestions.push("What battery brands do you offer?");
      }
      if (!lowerResponse.includes('price') && !lowerResponse.includes('cost')) {
        suggestions.push("How much do batteries cost?");
      }
    }

    // If user asked about pricing, suggest next steps
    if (lowerUserMessage.includes('price') || lowerUserMessage.includes('cost') || lowerResponse.includes('quote')) {
      suggestions.push("How do I get a quote?");
      suggestions.push("Book a site visit");
    }

    // If user asked about installation, suggest related topics
    if (lowerUserMessage.includes('install') || lowerResponse.includes('installation')) {
      suggestions.push("How long does installation take?");
      suggestions.push("What's included in the installation?");
    }

    // General suggestions if conversation is just starting
    if (conversationHistory.length <= 2) {
      suggestions.push("What services do you offer?");
      suggestions.push("Do you serve my area?");
      suggestions.push("Book a site visit");
    }

    // If no specific suggestions, provide helpful general ones
    if (suggestions.length === 0) {
      if (!lowerResponse.includes('contact') && !lowerResponse.includes('1300')) {
        suggestions.push("How can I contact you?");
      }
      if (!lowerResponse.includes('process') && !lowerResponse.includes('installation')) {
        suggestions.push("What's the installation process?");
      }
      suggestions.push("Tell me more about your services");
    }

    // Return top 3 suggestions
    return suggestions.slice(0, 3);
  }

  return (
    <>
      {/* Welcome Prompt */}
      {showWelcomePrompt && (
        <WelcomePrompt
          onStartChat={handleWelcomeStartChat}
          onDismiss={handleWelcomeDismiss}
        />
      )}

      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => {
              setIsOpen(true);
              setShowWelcomePrompt(false);
            }}
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow bg-emerald-600 hover:bg-emerald-700 text-white h-14 w-14 p-0 relative"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse animation indicator */}
            <motion.div
              className="absolute inset-0 bg-emerald-600 rounded-full opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] max-w-[calc(100vw-3rem)]"
          >
            <Card className={`shadow-2xl border-2 border-emerald-100 dark:border-emerald-900 flex flex-col overflow-hidden ${
              isMinimized ? 'h-auto' : 'h-[600px] max-h-[calc(100vh-8rem)]'
            }`}>
              <CardHeader className="flex-shrink-0 bg-emerald-600 text-white rounded-t-lg p-4 border-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    xTechs Chat Support
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="text-white hover:bg-emerald-700 h-8 w-8 p-0"
                      aria-label={isMinimized ? "Maximize" : "Minimize"}
                    >
                      {isMinimized ? (
                        <Maximize2 className="w-4 h-4" />
                      ) : (
                        <Minimize2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMinimized(false);
                      }}
                      className="text-white hover:bg-emerald-700 h-8 w-8 p-0"
                      aria-label="Close chat"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized ? (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-emerald-600 text-white"
                              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <>
                              <div 
                                className="text-sm break-words [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:font-weight-600 [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ol]:my-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol>li]:leading-relaxed [&_ul>li]:leading-relaxed [&_h1]:font-semibold [&_h1]:my-3 [&_h1]:text-base [&_h1:first-child]:mt-0 [&_h2]:font-semibold [&_h2]:my-2 [&_h2]:text-sm [&_h2:first-child]:mt-0 [&_h3]:font-semibold [&_h3]:my-2 [&_h3]:text-sm [&_h3:first-child]:mt-0 [&_code]:bg-gray-100 dark:[&_code]:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_a]:text-emerald-600 [&_a]:dark:text-emerald-400 [&_a]:underline [&_a]:hover:text-emerald-700 [&_a]:dark:hover:text-emerald-300"
                                style={{
                                  lineHeight: '1.6',
                                }}
                                dangerouslySetInnerHTML={{ 
                                  __html: parseMarkdown(message.content || '')
                                }}
                              />
                              {shouldShowBookingLink(message.content || '') && (
                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                  <a
                                    href="/contact"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      redirectToBooking();
                                    }}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                  >
                                    <Calendar className="w-4 h-4" />
                                    Book Site Visit →
                                  </a>
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Book Site Visit Button */}
                    {messages.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex justify-center"
                      >
                        <Button
                          onClick={redirectToBooking}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Site Visit
                        </Button>
                      </motion.div>
                    )}

                    {/* Suggested Questions */}
                    {!isLoading && suggestedQuestions.length > 0 && messages.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 mt-2"
                      >
                        {suggestedQuestions.map((question, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-xs px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer"
                          >
                            {question}
                          </button>
                        ))}
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </CardContent>

                  <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                      Powered by xTechs Renewables • Victoria, Australia
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Chat minimized. Click maximize to continue.
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

