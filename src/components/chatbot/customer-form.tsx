"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, MapPin, Phone } from "lucide-react";
import type { CustomerInfo } from "@/lib/chatbot/customer-info";
import { validateCustomerInfo } from "@/lib/chatbot/customer-info";

interface CustomerFormProps {
  onSubmit: (info: CustomerInfo) => void;
  onSkip?: () => void;
}

export function CustomerForm({ onSubmit, onSkip }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const customerInfo: CustomerInfo = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim() || undefined,
      collectedAt: new Date(),
    };

    const validation = validateCustomerInfo(customerInfo);
    
    if (validation.valid) {
      onSubmit(customerInfo);
    } else {
      setErrors(validation.errors);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Smith"
          required
          disabled={isSubmitting}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email Address <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john.smith@example.com"
          required
          disabled={isSubmitting}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Address <span className="text-red-500">*</span>
        </label>
        <Input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="123 Main St, Melbourne VIC 3000"
          required
          disabled={isSubmitting}
          className="w-full"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Please include suburb and state (e.g., Melbourne VIC)
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Phone Number (Optional)
        </label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="0400 000 000"
          disabled={isSubmitting}
          className="w-full"
        />
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {isSubmitting ? "Submitting..." : "Continue to Chat"}
        </Button>
        {onSkip && (
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            disabled={isSubmitting}
          >
            Skip
          </Button>
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Your information helps us provide personalized assistance. We respect your privacy and only use this information to help you.
      </p>
    </form>
  );
}

