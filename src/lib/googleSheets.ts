import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Initialize Google Sheets
export async function getGoogleSheet() {
  if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Missing Google Sheets configuration');
  }

  const serviceAccountAuth = new JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
    ],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

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

// Add lead to Google Sheets
export async function addLeadToSheet(leadData: LeadData) {
  try {
    const doc = await getGoogleSheet();
    
    // Get or create leads sheet
    let sheet = doc.sheetsByTitle['Leads'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Leads',
        headerValues: [
          'Timestamp',
          'Email',
          'First Name',
          'Last Name',
          'Phone',
          'Postcode',
          'Suburb',
          'Marketing Consent',
          'Analytics Consent',
          'UTM Source',
          'UTM Medium',
          'UTM Campaign',
          'UTM Term',
          'UTM Content',
          'Source',
          'Variant',
          'Calculator Used',
          'System Size (kW)',
          'Total Rebates ($)',
          'Final Price ($)',
          'Lead ID'
        ]
      });
    }

    // Prepare row data
    const rowData = {
      'Timestamp': leadData.createdAt,
      'Email': leadData.email,
      'First Name': leadData.firstName || '',
      'Last Name': leadData.lastName || '',
      'Phone': leadData.phone || '',
      'Postcode': leadData.postcode || '',
      'Suburb': leadData.suburb || '',
      'Marketing Consent': leadData.consentMarketing ? 'Yes' : 'No',
      'Analytics Consent': leadData.consentAnalytics ? 'Yes' : 'No',
      'UTM Source': leadData.utm.utm_source || '',
      'UTM Medium': leadData.utm.utm_medium || '',
      'UTM Campaign': leadData.utm.utm_campaign || '',
      'UTM Term': leadData.utm.utm_term || '',
      'UTM Content': leadData.utm.utm_content || '',
      'Source': leadData.source,
      'Variant': leadData.variant || '',
      'Calculator Used': leadData.calculatorResults ? 'Yes' : 'No',
      'System Size (kW)': leadData.calculatorResults?.inputs?.systemSizeKw || '',
      'Total Rebates ($)': leadData.calculatorResults?.results?.totalRebates || '',
      'Final Price ($)': leadData.calculatorResults?.results?.finalPrice || '',
      'Lead ID': `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    await sheet.addRow(rowData);
    console.log('Lead added to Google Sheets:', rowData['Lead ID']);
    
    return { success: true, leadId: rowData['Lead ID'] };
  } catch (error) {
    console.error('Error adding lead to Google Sheets:', error);
    throw error;
  }
}

// Add booking to Google Sheets
export async function addBookingToSheet(bookingData: BookingData) {
  try {
    const doc = await getGoogleSheet();
    
    // Get or create bookings sheet
    let sheet = doc.sheetsByTitle['Bookings'];
    if (!sheet) {
      sheet = await doc.addSheet({
        title: 'Bookings',
        headerValues: [
          'Timestamp',
          'First Name',
          'Last Name',
          'Email',
          'Phone',
          'Address',
          'Service Type',
          'Selected Date',
          'Selected Time',
          'Type',
          'Notes',
          'Booking ID',
          'Status'
        ]
      });
    }

    // Check for conflicts
    const existingRows = await sheet.getRows();
    const requestedTime = bookingData.selectedTime;
    const requestedDate = bookingData.selectedDate;
    
    const conflicts = existingRows.filter(row => 
      row.get('Selected Date') === requestedDate &&
      row.get('Selected Time') === requestedTime
    );

    if (conflicts.length > 0) {
      throw new Error('Time slot already booked');
    }

    // Prepare row data
    const rowData = {
      'Timestamp': bookingData.createdAt,
      'First Name': bookingData.firstName,
      'Last Name': bookingData.lastName,
      'Email': bookingData.email,
      'Phone': bookingData.phone,
      'Address': bookingData.address,
      'Service Type': bookingData.serviceType,
      'Selected Date': bookingData.selectedDate,
      'Selected Time': bookingData.selectedTime,
      'Type': bookingData.type || '',
      'Notes': bookingData.notes || '',
      'Booking ID': `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      'Status': 'New'
    };

    await sheet.addRow(rowData);
    console.log('Booking added to Google Sheets:', rowData['Booking ID']);
    
    return { success: true, bookingId: rowData['Booking ID'] };
  } catch (error) {
    console.error('Error adding booking to Google Sheets:', error);
    throw error;
  }
}

// Get existing bookings for a date
export async function getBookingsForDate(date: string) {
  try {
    const doc = await getGoogleSheet();
    const sheet = doc.sheetsByTitle['Bookings'];
    
    if (!sheet) {
      return [];
    }

    const rows = await sheet.getRows();
    const bookingsForDate = rows.filter(row => row.get('Selected Date') === date);
    
    return bookingsForDate.map(row => ({
      selectedTime: row.get('Selected Time'),
      serviceType: row.get('Service Type'),
      customerName: `${row.get('First Name')} ${row.get('Last Name')}`
    }));
  } catch (error) {
    console.error('Error fetching bookings from Google Sheets:', error);
    return [];
  }
}

