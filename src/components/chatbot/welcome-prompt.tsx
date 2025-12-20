"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Sparkles } from "lucide-react";

interface WelcomePromptProps {
  onStartChat: () => void;
  onDismiss: () => void;
}

export function WelcomePrompt({ onStartChat, onDismiss }: WelcomePromptProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the prompt before (using localStorage)
    const hasSeenPrompt = localStorage.getItem('chatbot-welcome-seen');
    
    // Show prompt after a short delay for better UX
    const timer = setTimeout(() => {
      if (!hasSeenPrompt) {
        setIsVisible(true);
      }
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleStartChat = () => {
    localStorage.setItem('chatbot-welcome-seen', 'true');
    setIsVisible(false);
    onStartChat();
  };

  const handleDismiss = () => {
    localStorage.setItem('chatbot-welcome-seen', 'true');
    setIsVisible(false);
    onDismiss();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Prompt Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[101] w-[90vw] sm:w-[400px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-2 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 text-white hover:bg-emerald-800 h-8 w-8 p-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
                <CardTitle className="text-lg font-semibold flex items-center gap-2 pr-8">
                  <Sparkles className="w-5 h-5" />
                  Welcome to xTechs Renewables!
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Need help? Our expert team is here to assist you! Chat with us about:
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>Solar panel systems and installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>Battery storage solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>EV charging stations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                    <span>Pricing, rebates, and quotes</span>
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button
                    onClick={handleStartChat}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDismiss}
                    className="flex-1"
                  >
                    Maybe Later
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                  Click the chat button anytime for assistance
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

