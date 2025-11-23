// Google Apps Script integration for xTechs website
// This replaces the Google Sheets API approach

// Configuration
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

// Lead data interface
export interface LeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  postcode?: string;
  suburb?: string;
  consentMarketing: boolean;
  consentAnalytics?: boolean;
  utm: Record<string, string>;
  source: string;
  variant?: string;
  createdAt: string;
  calculatorResults?: {
    inputs: any;
    results: any;
  };
}

// Booking data interface
export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  notes?: string;
  selectedDate: string;
  selectedTime: string;
  type?: string;
  createdAt: string;
}

// Add lead to Google Sheets via Apps Script
export async function addLeadToSheet(leadData: LeadData) {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      throw new Error('Google Apps Script URL not configured');
    }

    const payload = {
      type: 'lead',
      ...leadData
    };

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    console.log('Lead added to Google Sheets via Apps Script:', result);
    return { success: true, leadId: result.leadId };
    
  } catch (error) {
    console.error('Error adding lead to Google Sheets:', error);
    throw error;
  }
}

// Add booking to Google Sheets via Apps Script
export async function addBookingToSheet(bookingData: BookingData) {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      throw new Error('Google Apps Script URL not configured');
    }

    const payload = {
      type: 'booking',
      ...bookingData
    };

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    console.log('Booking added to Google Sheets via Apps Script:', result);
    return { success: true, bookingId: result.bookingId };
    
  } catch (error) {
    console.error('Error adding booking to Google Sheets:', error);
    throw error;
  }
}

// Get existing bookings for a date (simplified - would need additional Apps Script function)
export async function getBookingsForDate(date: string) {
  try {
    // For now, return empty array
    // In production, you'd add a GET endpoint to your Apps Script
    // to fetch bookings for a specific date
    console.log('Getting bookings for date:', date);
    return [];
    
  } catch (error) {
    console.error('Error fetching bookings from Google Sheets:', error);
    return [];
  }
}

// Test the connection
export async function testGoogleAppsScriptConnection() {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      throw new Error('Google Apps Script URL not configured');
    }

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Google Apps Script connection test:', result);
    return { success: true, message: result.message };
    
  } catch (error) {
    console.error('Error testing Google Apps Script connection:', error);
    throw error;
  }
}

