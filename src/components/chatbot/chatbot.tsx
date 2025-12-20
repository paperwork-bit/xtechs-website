"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { getInitialGreeting } from "@/lib/chatbot/chatbot";
import type { ChatMessage } from "@/lib/chatbot/chatbot";
import type { CustomerInfo } from "@/lib/chatbot/customer-info";
import { CustomerForm } from "./customer-form";
import { WelcomePrompt } from "./welcome-prompt";
import { motion, AnimatePresence } from "framer-motion";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  // Reset form when chat opens
  useEffect(() => {
    if (isOpen) {
      // Check if customer info exists in session storage
      const storedInfo = sessionStorage.getItem('chatbot-customer-info');
      if (storedInfo) {
        try {
          const parsed = JSON.parse(storedInfo);
          setCustomerInfo(parsed);
          setShowCustomerForm(false);
        } catch (e) {
          // Invalid stored data, show form
          setShowCustomerForm(true);
        }
      } else {
        setShowCustomerForm(true);
      }
    } else {
      // Reset when closed
      setShowCustomerForm(true);
      setMessages([]);
    }
  }, [isOpen]);

  // Initialize with greeting after customer info is collected
  useEffect(() => {
    if (isOpen && !showCustomerForm && messages.length === 0 && customerInfo) {
      const name = customerInfo.fullName.split(' ')[0];
      const greeting = `G'day ${name}! Thanks for providing your details. I'm here to help you with any questions about our solar, battery, and renewable energy solutions. How can I assist you today?`;
      setMessages([
        {
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, showCustomerForm, customerInfo, messages.length]);

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

  const handleCustomerSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setShowCustomerForm(false);
    // Store in session storage
    sessionStorage.setItem('chatbot-customer-info', JSON.stringify(info));
  };

  const handleCustomerSkip = () => {
    setShowCustomerForm(false);
    // Initialize with regular greeting
    const greeting = getInitialGreeting();
    setMessages([
      {
        role: "assistant",
        content: greeting,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages,
          customerInfo: customerInfo,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response || "I'm sorry, I didn't understand that. Could you rephrase?",
        timestamp: new Date(data.timestamp || Date.now()),
      };

      setMessages((prev) => [...prev, assistantMessage]);
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
            <Card className="shadow-2xl border-2 border-emerald-100 dark:border-emerald-900 flex flex-col h-[600px] max-h-[calc(100vh-8rem)]">
              <CardHeader className="flex-shrink-0 bg-emerald-600 text-white rounded-t-lg">
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

              {!isMinimized && (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    {showCustomerForm ? (
                      <div className="py-4">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Let's Get Started
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          To provide you with the best assistance, please share a few details about yourself.
                        </p>
                        <CustomerForm 
                          onSubmit={handleCustomerSubmit}
                          onSkip={handleCustomerSkip}
                        />
                      </div>
                    ) : (
                      <>
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
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
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
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </CardContent>

                  {!showCustomerForm && (
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
                  )}
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

