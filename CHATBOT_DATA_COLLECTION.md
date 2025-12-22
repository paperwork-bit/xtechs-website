# Chatbot Natural Data Collection Implementation

This document explains how the chatbot now collects customer information naturally during conversation and saves it to the database.

## Overview

The chatbot now collects customer information (name, email, address, and optional phone) naturally during conversation, without using a form. The AI assistant asks for information organically as the conversation flows, making it feel like a friendly chat rather than an interrogation.

## How It Works

### 1. Natural Information Collection

When a user opens the chat:
1. The chatbot greets them with a time-based greeting
2. The AI naturally asks for missing information during the conversation
3. Information is collected one piece at a time, woven into the conversation
4. The AI answers the user's questions first, then naturally asks for missing info

### 2. Information Collection Flow

The chatbot tracks what information is missing and asks for it naturally:

- **Name**: "By the way, what's your name?" or "What should I call you?"
- **Email**: "What's the best email to reach you at?" or "Could I get your email address?"
- **Address**: "Where are you located?" or "What area are you in?" (helps provide location-specific advice)
- **Phone** (optional): Only asked if relevant: "Would it be helpful if I had your phone number?"

### 3. Automatic Data Extraction

The system automatically extracts customer information from natural conversation using enhanced pattern matching:

**Name Extraction:**
- "My name is John Smith"
- "I'm Sarah"
- "Call me Mike"
- "This is David"

**Email Extraction:**
- Automatically detects email addresses in messages
- Pattern: `user@domain.com`

**Phone Extraction:**
- Australian phone number patterns
- Format: `+61` or `0` followed by area code and number

**Address Extraction:**
- "I live in Melbourne"
- "I'm in Rowville, VIC"
- "Located in 3000" (postcode)
- "Based in Victoria"

### 4. Automatic Database Saving

When all required information is collected (name, email, address), the system automatically:
1. Validates the information
2. Saves it to the database via `/api/chatbot/lead`
3. Stores it in session storage for the current chat session
4. Continues the conversation naturally

**Required Fields:**
- Full Name (minimum 2 characters)
- Email (valid email format)
- Address (minimum 5 characters)

**Optional Fields:**
- Phone number

## Technical Implementation

### API Endpoint

**POST `/api/chatbot/lead`**

Saves customer information collected from the chatbot to the database.

**Request Body:**
```json
{
  "fullName": "John Smith",
  "email": "john@example.com",
  "address": "123 Main St, Melbourne VIC 3000",
  "phone": "0400 000 000",
  "source": "chatbot"
}
```

**Response:**
```json
{
  "ok": true,
  "leadId": "chatbot_1234567890_abc123"
}
```

### System Prompt Updates

The system prompt now includes instructions for:
- Naturally asking for customer information
- Collecting information one piece at a time
- Making it feel like a conversation, not a form
- Acknowledging when information is collected

### Enhanced Pattern Matching

The customer info extraction has been enhanced with:
- More name patterns (handles various ways people introduce themselves)
- Better address extraction (handles postcodes, suburbs, cities)
- Improved validation (ensures quality data)
- Context-aware extraction (understands natural language)

## User Experience

### Example Conversation Flow

```
Bot: Good morning! Welcome to xTechs Renewables. I'm here to help you with any questions about our solar, battery, and renewable energy solutions. How can I assist you today?

User: Hi, I'm interested in solar panels for my home.

Bot: That's great! Solar panels are an excellent investment. By the way, what's your name?

User: I'm Sarah Johnson.

Bot: Nice to meet you, Sarah! Now, about solar panels for your home - we offer a range of systems. Where are you located? This helps me give you location-specific advice.

User: I'm in Melbourne, Rowville area.

Bot: Perfect! We're actually based in Rowville too. What's the best email to reach you at?

User: sarah.johnson@email.com

Bot: Thanks Sarah! I've got your details. Now, about solar panels - we can design a system tailored to your home...
```

### Key Features

1. **Natural Flow**: Information is collected naturally, not all at once
2. **Context-Aware**: The AI answers questions first, then asks for info
3. **Non-Intrusive**: Phone number is optional and only asked if relevant
4. **Automatic Saving**: Data is saved automatically when complete
5. **Session Persistence**: Information is stored in session storage

## Database Schema

The chatbot leads are saved to the same `leads` table as other lead sources:

- `id`: Unique lead ID (format: `chatbot_timestamp_random`)
- `name`: Customer's full name
- `email`: Customer's email address
- `phone`: Customer's phone (optional)
- `message`: Contains the address (stored in message field)
- `source`: Set to "chatbot"
- `tenant_id`: Default tenant ID
- `status`: Set to "new"
- `created_at`: Unix timestamp

## Files Modified

1. **`src/lib/chatbot/openai.ts`**
   - Added system prompt instructions for natural data collection
   - Added `getMissingCustomerInfo()` function
   - Enhanced system message with missing info tracking

2. **`src/components/chatbot/chatbot.tsx`**
   - Added `dataSaved` state to track if data has been saved
   - Added `hasRequiredInfo()` function
   - Added `saveCustomerData()` function
   - Enhanced `extractCustomerInfoFromMessage()` with better patterns
   - Automatic saving when required info is collected

3. **`src/app/api/chatbot/lead/route.ts`** (NEW)
   - New API endpoint for saving chatbot customer data
   - Validates required fields (name, email, address)
   - Saves to D1 database
   - Returns success/error response

## Benefits

1. **Better User Experience**: No forms - information is collected naturally
2. **Higher Completion Rates**: Users are more likely to provide info in conversation
3. **Better Data Quality**: Information is validated and sanitized
4. **Automatic Lead Capture**: Leads are automatically saved when information is complete
5. **Natural Conversation**: Feels like talking to a real person, not filling out a form

## Testing

To test the data collection:

1. Open the chatbot
2. Start a conversation
3. The AI will naturally ask for your name, email, and address
4. Provide the information naturally in your responses
5. Check the database to verify the lead was saved

## Future Enhancements

Potential improvements:
- Add consent collection for marketing/analytics
- Track conversation quality metrics
- Add analytics on data collection completion rates
- Improve address validation and formatting
- Add support for international addresses

