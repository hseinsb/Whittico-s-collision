/**
 * Whittico's Collision - Website Contact Form Notifications
 * 
 * This Apps Script automatically sends email notifications when new form submissions
 * are added to the Google Sheet. It includes validation, error handling, and logging.
 */

// Script Properties Configuration (set these in Script Editor > Project Settings > Script Properties)
const CONFIG = {
  TO_EMAIL: 'info@whitticoscollision.co',
  BCC_EMAIL: '', // Optional
  FROM_NAME: "Whittico's Collision Website",
  REPLY_TO_FALLBACK: 'info@whitticoscollision.co',
  EXPECTED_HEADERS: 'timestamp,source,name,email,phone,subject,message,vehicle,insurer,claimNo,photos,ip,userAgent'
};

/**
 * Install this trigger manually:
 * 1. Go to Triggers (clock icon in left sidebar)
 * 2. Add Trigger:
 *    - Function: onFormSubmit
 *    - Event source: From spreadsheet
 *    - Event type: On form submit (or On change if not using Google Forms)
 */

/**
 * Main trigger function - called when new rows are added to the sheet
 */
function onFormSubmit(e) {
  try {
    console.log('Form submission trigger fired');
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions');
    if (!sheet) {
      throw new Error('Submissions sheet not found');
    }
    
    // Get the last row (most recent submission)
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      console.log('No data rows found');
      return;
    }
    
    // Process the most recent submission
    processSubmission(sheet, lastRow);
    
  } catch (error) {
    console.error('Error in onFormSubmit:', error);
    logError('onFormSubmit', error.toString(), '');
  }
}

/**
 * Alternative trigger for non-form submissions (if writing directly to sheet)
 * Set this up as a time-driven trigger every 1-5 minutes
 */
function checkForNewSubmissions() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions');
    if (!sheet) {
      throw new Error('Submissions sheet not found');
    }
    
    const lastProcessedRow = parseInt(PropertiesService.getScriptProperties().getProperty('LAST_PROCESSED_ROW') || '1');
    const lastRow = sheet.getLastRow();
    
    // Process any new rows
    for (let row = lastProcessedRow + 1; row <= lastRow; row++) {
      processSubmission(sheet, row);
      PropertiesService.getScriptProperties().setProperty('LAST_PROCESSED_ROW', row.toString());
    }
    
  } catch (error) {
    console.error('Error in checkForNewSubmissions:', error);
    logError('checkForNewSubmissions', error.toString(), '');
  }
}

/**
 * Process a single form submission
 */
function processSubmission(sheet, rowIndex) {
  try {
    console.log(`Processing submission in row ${rowIndex}`);
    
    // Validate headers
    if (!validateHeaders(sheet)) {
      throw new Error('Sheet headers do not match expected format');
    }
    
    // Get the submission data
    const rowData = sheet.getRange(rowIndex, 1, 1, 13).getValues()[0];
    const submission = parseSubmissionData(rowData);
    
    // Validate required fields
    if (!validateSubmission(submission)) {
      logError('validation', 'Missing required fields', JSON.stringify(submission));
      return;
    }
    
    // Check for duplicates
    if (isDuplicate(submission)) {
      console.log('Duplicate submission detected, skipping');
      return;
    }
    
    // Send email notification
    const emailSent = sendEmailNotification(submission);
    
    // Log the result
    logEmailResult(rowIndex, emailSent ? 'SENT' : 'FAILED', emailSent ? '' : 'Failed to send email');
    
    // Mark as processed
    markAsProcessed(submission);
    
  } catch (error) {
    console.error(`Error processing row ${rowIndex}:`, error);
    logError('processSubmission', error.toString(), `Row: ${rowIndex}`);
  }
}

/**
 * Validate that sheet headers match expected format
 */
function validateHeaders(sheet) {
  const headers = sheet.getRange(1, 1, 1, 13).getValues()[0];
  const expectedHeaders = CONFIG.EXPECTED_HEADERS.split(',');
  
  for (let i = 0; i < expectedHeaders.length; i++) {
    if (headers[i] !== expectedHeaders[i]) {
      console.error(`Header mismatch at column ${i + 1}: expected "${expectedHeaders[i]}", got "${headers[i]}"`);
      return false;
    }
  }
  
  return true;
}

/**
 * Parse row data into a structured submission object
 */
function parseSubmissionData(rowData) {
  return {
    timestamp: rowData[0],
    source: rowData[1],
    name: rowData[2],
    email: rowData[3],
    phone: rowData[4],
    subject: rowData[5],
    message: rowData[6],
    vehicle: rowData[7],
    insurer: rowData[8],
    claimNo: rowData[9],
    photos: rowData[10],
    ip: rowData[11],
    userAgent: rowData[12]
  };
}

/**
 * Validate that submission has required fields
 */
function validateSubmission(submission) {
  // Name and message are required
  if (!submission.name || !submission.message) {
    return false;
  }
  
  // Either email or phone is required
  if (!submission.email && !submission.phone) {
    return false;
  }
  
  return true;
}

/**
 * Check if this submission is a duplicate
 */
function isDuplicate(submission) {
  const hash = createSubmissionHash(submission);
  const processedHashes = PropertiesService.getScriptProperties().getProperty('PROCESSED_HASHES') || '';
  
  if (processedHashes.includes(hash)) {
    return true;
  }
  
  return false;
}

/**
 * Create a hash of the submission for duplicate detection
 */
function createSubmissionHash(submission) {
  const hashString = `${submission.name}|${submission.email}|${submission.phone}|${submission.message}`;
  return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, hashString).toString();
}

/**
 * Mark submission as processed to prevent duplicates
 */
function markAsProcessed(submission) {
  const hash = createSubmissionHash(submission);
  const processedHashes = PropertiesService.getScriptProperties().getProperty('PROCESSED_HASHES') || '';
  const updatedHashes = processedHashes ? `${processedHashes},${hash}` : hash;
  
  // Keep only last 1000 hashes to prevent property from getting too large
  const hashArray = updatedHashes.split(',');
  if (hashArray.length > 1000) {
    hashArray.splice(0, hashArray.length - 1000);
  }
  
  PropertiesService.getScriptProperties().setProperty('PROCESSED_HASHES', hashArray.join(','));
}

/**
 * Send email notification
 */
function sendEmailNotification(submission) {
  try {
    const subject = `[Whittico Web] ${submission.subject || submission.source} – ${submission.name}${submission.vehicle ? ' – ' + submission.vehicle : ''}`;
    
    // Determine reply-to email
    const replyTo = isValidEmail(submission.email) ? submission.email : CONFIG.REPLY_TO_FALLBACK;
    
    // Build email body
    const htmlBody = buildEmailBody(submission);
    const plainTextBody = buildPlainTextBody(submission);
    
    // Send email
    MailApp.sendEmail({
      to: CONFIG.TO_EMAIL,
      bcc: CONFIG.BCC_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      plainTextBody: plainTextBody,
      replyTo: replyTo,
      name: CONFIG.FROM_NAME,
      attachments: [],
      headers: {
        'X-Whittico-Contact': 'true'
      }
    });
    
    console.log(`Email sent successfully for submission: ${submission.name}`);
    return true;
    
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Build HTML email body
 */
function buildEmailBody(submission) {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #f6e197 0%, #e8b347 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">New Website Contact</h1>
      </div>
      
      <div style="padding: 30px; background: #f9f9f9;">
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #e8b347; padding-bottom: 10px;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #333;">${submission.name}</td>
            </tr>`;
  
  if (submission.email) {
    html += `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #333;"><a href="mailto:${submission.email}" style="color: #e8b347; text-decoration: none;">${submission.email}</a></td>
            </tr>`;
  }
  
  if (submission.phone) {
    html += `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 8px 0; color: #333;"><a href="tel:${submission.phone}" style="color: #e8b347; text-decoration: none;">${submission.phone}</a></td>
            </tr>`;
  }
  
  if (submission.vehicle) {
    html += `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Vehicle:</td>
              <td style="padding: 8px 0; color: #333;">${submission.vehicle}</td>
            </tr>`;
  }
  
  if (submission.insurer) {
    html += `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Insurer:</td>
              <td style="padding: 8px 0; color: #333;">${submission.insurer}</td>
            </tr>`;
  }
  
  if (submission.claimNo) {
    html += `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Claim #:</td>
              <td style="padding: 8px 0; color: #333;">${submission.claimNo}</td>
            </tr>`;
  }
  
  html += `
          </table>
          
          <h3 style="color: #333; margin: 25px 0 10px 0;">Message:</h3>
          <div style="background: #f8f8f8; padding: 15px; border-left: 4px solid #e8b347; border-radius: 4px; margin: 10px 0;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${submission.message.replace(/\n/g, '<br>')}</p>
          </div>`;
  
  // Add photos if any
  if (submission.photos) {
    html += `
          <h3 style="color: #333; margin: 25px 0 10px 0;">Photos:</h3>
          <div style="margin: 10px 0;">`;
    
    const photoUrls = submission.photos.split(',');
    photoUrls.forEach(url => {
      if (url.trim()) {
        html += `<p><a href="${url.trim()}" style="color: #e8b347; text-decoration: none;">📷 ${url.trim()}</a></p>`;
      }
    });
    
    html += `</div>`;
  }
  
  html += `
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-top: 20px;">
          <h3 style="color: #666; margin-top: 0; font-size: 14px;">Submission Details</h3>
          <p style="margin: 5px 0; font-size: 12px; color: #888;">
            <strong>Time:</strong> ${submission.timestamp}<br>
            <strong>Source:</strong> ${submission.source}<br>
            <strong>IP:</strong> ${submission.ip || 'Not available'}<br>
            <strong>User Agent:</strong> ${submission.userAgent || 'Not available'}
          </p>
        </div>
      </div>
      
      <div style="background: #333; color: white; padding: 20px; text-align: center;">
        <p style="margin: 0; font-size: 14px;">
          📧 Reply to this email to respond directly to the customer<br>
          🌐 Whittico's Collision Website Contact System
        </p>
      </div>
    </div>`;
  
  return html;
}

/**
 * Build plain text email body
 */
function buildPlainTextBody(submission) {
  let text = `NEW WEBSITE CONTACT - ${submission.subject || submission.source}\n\n`;
  text += `CONTACT DETAILS:\n`;
  text += `Name: ${submission.name}\n`;
  
  if (submission.email) text += `Email: ${submission.email}\n`;
  if (submission.phone) text += `Phone: ${submission.phone}\n`;
  if (submission.vehicle) text += `Vehicle: ${submission.vehicle}\n`;
  if (submission.insurer) text += `Insurer: ${submission.insurer}\n`;
  if (submission.claimNo) text += `Claim #: ${submission.claimNo}\n`;
  
  text += `\nMESSAGE:\n${submission.message}\n`;
  
  if (submission.photos) {
    text += `\nPHOTOS:\n`;
    const photoUrls = submission.photos.split(',');
    photoUrls.forEach(url => {
      if (url.trim()) text += `${url.trim()}\n`;
    });
  }
  
  text += `\n---\nSubmission Details:\n`;
  text += `Time: ${submission.timestamp}\n`;
  text += `Source: ${submission.source}\n`;
  text += `IP: ${submission.ip || 'Not available'}\n`;
  
  return text;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Log errors to the Errors sheet
 */
function logError(context, error, details) {
  try {
    const sheet = getOrCreateSheet('Errors', ['timestamp', 'context', 'error', 'details']);
    sheet.appendRow([new Date(), context, error, details]);
  } catch (e) {
    console.error('Failed to log error:', e);
  }
}

/**
 * Log email results to the EmailLog sheet
 */
function logEmailResult(rowIndex, status, error) {
  try {
    const sheet = getOrCreateSheet('EmailLog', ['timestamp', 'row_index', 'status', 'error', 'message_id']);
    sheet.appendRow([new Date(), rowIndex, status, error, '']);
  } catch (e) {
    console.error('Failed to log email result:', e);
  }
}

/**
 * Get or create a sheet with specified headers
 */
function getOrCreateSheet(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  
  return sheet;
}

/**
 * Test function to validate setup
 */
function testSetup() {
  console.log('Testing Whittico Contact Form Setup...');
  
  // Test sheet structure
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions');
  if (!sheet) {
    console.error('❌ Submissions sheet not found');
    return;
  }
  
  if (!validateHeaders(sheet)) {
    console.error('❌ Headers validation failed');
    return;
  }
  
  console.log('✅ Sheet structure is valid');
  
  // Test properties
  const requiredProps = ['TO_EMAIL', 'FROM_NAME', 'REPLY_TO_FALLBACK'];
  const properties = PropertiesService.getScriptProperties().getProperties();
  
  requiredProps.forEach(prop => {
    if (!properties[prop]) {
      console.error(`❌ Missing script property: ${prop}`);
    } else {
      console.log(`✅ ${prop} is configured`);
    }
  });
  
  console.log('✅ Setup test completed');
}

/**
 * Manual function to set up script properties
 * Run this once to configure the script
 */
function setupScriptProperties() {
  const properties = PropertiesService.getScriptProperties();
  
  properties.setProperties({
    'TO_EMAIL': CONFIG.TO_EMAIL,
    'BCC_EMAIL': CONFIG.BCC_EMAIL,
    'FROM_NAME': CONFIG.FROM_NAME,
    'REPLY_TO_FALLBACK': CONFIG.REPLY_TO_FALLBACK,
    'EXPECTED_HEADERS': CONFIG.EXPECTED_HEADERS
  });
  
  console.log('✅ Script properties configured');
}
