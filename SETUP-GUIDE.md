# Whittico's Collision - Contact Form Setup Guide

This guide will walk you through setting up the complete contact form integration from website → Google Sheets → Email notifications.

## 🎯 Overview

**Data Flow:**
Website Form → API Route → Google Sheets → Apps Script → Email to info@whitticoscollision.co

## 📋 Prerequisites

- Google Workspace account
- Access to Google Sheets and Apps Script
- Gmail account (info@whitticoscollision.co)

---

## Step 1: Create Google Sheet

1. **Create a new Google Sheet**
   - Name: `Whittico Website Submissions`
   - URL will be: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

2. **Set up the Submissions tab**
   - Rename "Sheet1" to "Submissions"
   - Add these headers in row 1 (columns A-M):
     ```
     timestamp | source | name | email | phone | subject | message | vehicle | insurer | claimNo | photos | ip | userAgent
     ```

3. **Copy the Spreadsheet ID**
   - From the URL: `https://docs.google.com/spreadsheets/d/1234567890abcdef/edit`
   - Copy: `1234567890abcdef`

---

## Step 2: Create Google Service Account

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select existing

2. **Enable Google Sheets API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: `whittico-website-forms`
   - Click "Create and Continue"

4. **Download Service Account Key**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose "JSON" format
   - Download the file

5. **Share Sheet with Service Account**
   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email (from JSON file)
   - Give "Editor" permissions

---

## Step 3: Set Up Environment Variables

1. **Create `.env.local` file in your project root:**
   ```bash
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   Your private key here
   -----END PRIVATE KEY-----"
   ```

2. **Extract values from service account JSON:**
   ```json
   {
     "client_email": "← Use this for GOOGLE_SERVICE_ACCOUNT_EMAIL",
     "private_key": "← Use this for GOOGLE_PRIVATE_KEY"
   }
   ```

---

## Step 4: Install Dependencies

```bash
npm install googleapis
```

---

## Step 5: Set Up Apps Script

1. **Open Google Sheet → Extensions → Apps Script**

2. **Create new project:**
   - Name: `Whittico Notifications`

3. **Replace Code.gs content:**
   - Copy the entire contents from `google-apps-script/Code.gs`
   - Paste into the Apps Script editor

4. **Set up Script Properties:**
   - In Apps Script editor: Project Settings (gear icon)
   - Scroll to "Script Properties"
   - Add these properties:
     ```
     TO_EMAIL = info@whitticoscollision.co
     BCC_EMAIL = (leave empty or add backup email)
     FROM_NAME = Whittico's Collision Website
     REPLY_TO_FALLBACK = info@whitticoscollision.co
     EXPECTED_HEADERS = timestamp,source,name,email,phone,subject,message,vehicle,insurer,claimNo,photos,ip,userAgent
     ```

5. **Set up Trigger:**
   - Click "Triggers" (clock icon in sidebar)
   - Click "Add Trigger"
   - Choose function: `onFormSubmit`
   - Event source: "From spreadsheet"
   - Event type: "On change" (since we're writing directly, not using Google Forms)
   - Save

6. **Test the setup:**
   - Run the `testSetup` function to verify everything is configured correctly

---

## Step 6: Gmail Filter Setup

1. **Create Gmail Filter:**
   - In Gmail, click gear icon → "See all settings"
   - Go to "Filters and Blocked Addresses"
   - Click "Create a new filter"

2. **Filter criteria:**
   - Has the words: `X-Whittico-Contact: true`
   - Click "Create filter"

3. **Filter actions:**
   - ✅ Never send to Spam
   - ✅ Apply label: "Website/Leads" (create if doesn't exist)
   - ✅ Mark as important
   - Click "Create filter"

---

## Step 7: Test the Integration

1. **Install new dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Submit test form:**
   - Go to http://localhost:3001
   - Fill out the hero contact form
   - Submit

4. **Verify the flow:**
   - ✅ New row appears in Google Sheet
   - ✅ Apps Script trigger fires (check Executions in Apps Script)
   - ✅ Email arrives at info@whitticoscollision.co
   - ✅ Email has correct Reply-To header
   - ✅ Gmail filter applies label and prevents spam

---

## 🚨 Troubleshooting

### Form Submission Fails
- Check browser console for errors
- Verify environment variables are set correctly
- Check service account permissions on the sheet

### No Email Received
- Check Apps Script execution transcript (Executions tab)
- Verify script properties are set correctly
- Check Gmail spam folder
- Verify trigger is installed and active

### Headers Mismatch Error
- Ensure sheet headers exactly match EXPECTED_HEADERS property
- Check for extra spaces or typos

### Rate Limiting
- API currently allows 5 submissions per minute per IP
- Adjust in `app/api/submit-contact/route.ts` if needed

---

## 📊 Monitoring

**Apps Script Dashboard:**
- View execution history and errors
- Monitor quota usage

**Google Sheet Tabs:**
- `Submissions`: All form data
- `EmailLog`: Email send status (auto-created)
- `Errors`: Error logs (auto-created)

**Gmail:**
- All contact emails tagged with "Website/Leads"
- Reply directly to customers via Gmail Reply function

---

## 🔒 Security Notes

- Sheet is private to your Google Workspace
- Service account has minimal required permissions
- Rate limiting prevents spam abuse
- Input sanitization prevents malicious content
- No sensitive data stored beyond contact info

---

## ✅ Success Checklist

- [ ] Google Sheet created with correct headers
- [ ] Service account created and has access to sheet
- [ ] Environment variables configured
- [ ] Apps Script deployed with trigger
- [ ] Gmail filter configured
- [ ] Test submission successful
- [ ] Email received with correct Reply-To
- [ ] No console errors

---

## 📞 Support

If you need help with setup:
1. Check the browser console for specific error messages
2. Review Apps Script execution logs
3. Verify all configuration steps were completed exactly as written

The system is designed to be robust and will log any issues to help with debugging!
