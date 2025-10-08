// Google Apps Script for xTechs Website Data Collection
// This is the correct code for Google Apps Script (not Node.js)

// Configuration - Update these with your actual Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const LEADS_SHEET_NAME = 'Leads';
const BOOKINGS_SHEET_NAME = 'Bookings';

// Initialize sheets
function getLeadsSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(LEADS_SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(LEADS_SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 22).setValues([[
      'Timestamp', 'Email', 'First Name', 'Last Name', 'Phone', 'Postcode', 'Suburb',
      'Marketing Consent', 'Analytics Consent', 'UTM Source', 'UTM Medium', 'UTM Campaign',
      'UTM Term', 'UTM Content', 'Source', 'Variant', 'Calculator Used', 'System Size (kW)',
      'Total Rebates ($)', 'Final Price ($)', 'Lead ID', 'Status'
    ]]);
  }
  return sheet;
}

function getBookingsSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(BOOKINGS_SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(BOOKINGS_SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 13).setValues([[
      'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Address',
      'Service Type', 'Selected Date', 'Selected Time', 'Type', 'Notes', 'Booking ID', 'Status'
    ]]);
  }
  return sheet;
}

// Handle lead submissions
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.type === 'lead') {
      return handleLead(data);
    } else if (data.type === 'booking') {
      return handleBooking(data);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Invalid request type' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle lead data
function handleLead(data) {
  try {
    const sheet = getLeadsSheet();
    const leadId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const rowData = [
      new Date().toISOString(),
      data.email || '',
      data.firstName || '',
      data.lastName || '',
      data.phone || '',
      data.postcode || '',
      data.suburb || '',
      data.consentMarketing ? 'Yes' : 'No',
      data.consentAnalytics ? 'Yes' : 'No',
      data.utm ? (data.utm.utm_source || '') : '',
      data.utm ? (data.utm.utm_medium || '') : '',
      data.utm ? (data.utm.utm_campaign || '') : '',
      data.utm ? (data.utm.utm_term || '') : '',
      data.utm ? (data.utm.utm_content || '') : '',
      data.source || '',
      data.variant || '',
      data.calculatorResults ? 'Yes' : 'No',
      data.calculatorResults ? (data.calculatorResults.inputs ? data.calculatorResults.inputs.systemSizeKw || '' : '') : '',
      data.calculatorResults ? (data.calculatorResults.results ? data.calculatorResults.results.totalRebates || '' : '') : '',
      data.calculatorResults ? (data.calculatorResults.results ? data.calculatorResults.results.finalPrice || '' : '') : '',
      leadId,
      'New'
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        leadId: leadId,
        message: 'Lead added successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle booking data
function handleBooking(data) {
  try {
    const sheet = getBookingsSheet();
    const bookingId = 'booking_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const rowData = [
      new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.address || '',
      data.serviceType || '',
      data.selectedDate || '',
      data.selectedTime || '',
      data.type || '',
      data.notes || '',
      bookingId,
      'New'
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        bookingId: bookingId,
        message: 'Booking added successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'xTechs Website Data Handler is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function for leads
function testLead() {
  const testData = {
    type: 'lead',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    phone: '0412345678',
    postcode: '3000',
    suburb: 'Melbourne',
    consentMarketing: true,
    consentAnalytics: true,
    utm: {
      utm_source: 'test',
      utm_medium: 'test'
    },
    source: 'test',
    variant: 'test'
  };
  
  const result = handleLead(testData);
  console.log(result.getContent());
}

// Test function for bookings
function testBooking() {
  const testData = {
    type: 'booking',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '0412345678',
    address: '123 Test St, Melbourne VIC 3000',
    serviceType: 'Site Assessment',
    selectedDate: '2024-01-20',
    selectedTime: '14:00',
    type: 'residential',
    notes: 'Test booking'
  };
  
  const result = handleBooking(testData);
  console.log(result.getContent());
}
