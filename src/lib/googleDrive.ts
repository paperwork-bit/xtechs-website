import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Google Drive configuration
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// Initialize Google Drive
export async function getGoogleDrive() {
  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Missing Google Drive configuration');
  }

  const serviceAccountAuth = new JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const drive = google.drive({ version: 'v3', auth: serviceAccountAuth });
  return drive;
}

// Upload file to Google Drive
export async function uploadFileToDrive(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  folderId?: string
) {
  try {
    const drive = await getGoogleDrive();
    
    // Use provided folder ID or default from environment
    const parentFolderId = folderId || DRIVE_FOLDER_ID;
    
    const fileMetadata = {
      name: fileName,
      parents: parentFolderId ? [parentFolderId] : undefined,
    };

    const media = {
      mimeType: mimeType,
      body: fileBuffer,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id,name,webViewLink,webContentLink',
    });

    console.log('File uploaded to Google Drive:', response.data);
    return {
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      webViewLink: response.data.webViewLink,
      webContentLink: response.data.webContentLink,
    };
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
}

// Generate PDF and upload to Google Drive
export async function generateAndUploadPDF(
  pdfContent: string,
  fileName: string,
  leadData?: any
) {
  try {
    // Convert PDF content to buffer (assuming it's a string representation)
    const pdfBuffer = Buffer.from(pdfContent, 'utf-8');
    
    // Upload to Google Drive
    const uploadResult = await uploadFileToDrive(
      pdfBuffer,
      fileName,
      'application/pdf',
      DRIVE_FOLDER_ID
    );

    return uploadResult;
  } catch (error) {
    console.error('Error generating and uploading PDF:', error);
    throw error;
  }
}

// Create folder in Google Drive
export async function createFolder(folderName: string, parentFolderId?: string) {
  try {
    const drive = await getGoogleDrive();
    
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : undefined,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id,name,webViewLink',
    });

    console.log('Folder created in Google Drive:', response.data);
    return {
      success: true,
      folderId: response.data.id,
      folderName: response.data.name,
      webViewLink: response.data.webViewLink,
    };
  } catch (error) {
    console.error('Error creating folder in Google Drive:', error);
    throw error;
  }
}

// List files in a folder
export async function listFilesInFolder(folderId?: string) {
  try {
    const drive = await getGoogleDrive();
    
    const query = folderId 
      ? `'${folderId}' in parents`
      : `'${DRIVE_FOLDER_ID}' in parents`;
    
    const response = await drive.files.list({
      q: query,
      fields: 'files(id,name,mimeType,createdTime,webViewLink)',
      orderBy: 'createdTime desc',
    });

    return response.data.files || [];
  } catch (error) {
    console.error('Error listing files in Google Drive:', error);
    return [];
  }
}

// Get file download URL
export async function getFileDownloadUrl(fileId: string) {
  try {
    const drive = await getGoogleDrive();
    
    const response = await drive.files.get({
      fileId: fileId,
      fields: 'webContentLink,webViewLink,name',
    });

    return {
      success: true,
      downloadUrl: response.data.webContentLink,
      viewUrl: response.data.webViewLink,
      fileName: response.data.name,
    };
  } catch (error) {
    console.error('Error getting file download URL:', error);
    throw error;
  }
}

