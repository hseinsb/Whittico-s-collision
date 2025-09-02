import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Interface for the form submission data
interface ContactSubmission {
  timestamp: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  vehicle: string;
  insurer: string;
  claimNo: string;
  photos: string;
  userType: string;
  ip: string;
  userAgent: string;
}

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Rate limiting (simple in-memory store for MVP)
const submissionTracker = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxSubmissions = 5; // Max 5 submissions per minute per IP

  if (!submissionTracker.has(ip)) {
    submissionTracker.set(ip, []);
  }

  const submissions = submissionTracker.get(ip)!;
  
  // Remove old submissions outside the window
  const recentSubmissions = submissions.filter(time => now - time < windowMs);
  submissionTracker.set(ip, recentSubmissions);

  if (recentSubmissions.length >= maxSubmissions) {
    return true;
  }

  // Add current submission
  recentSubmissions.push(now);
  submissionTracker.set(ip, recentSubmissions);
  
  return false;
}

function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string, maxLength: number = 2000): string {
  return input.trim().slice(0, maxLength);
}

async function writeToGoogleSheets(data: ContactSubmission): Promise<boolean> {
  try {
    if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets configuration');
      return false;
    }

    // Set up Google Sheets API authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare the row data in the exact order of sheet headers
    const rowData = [
      data.timestamp,
      data.source,
      data.name,
      data.email,
      data.phone,
      data.subject,
      data.message,
      data.vehicle,
      data.insurer,
      data.claimNo,
      data.photos,
      data.ip,
      data.userAgent,
    ];

    // Append the row to the Submissions sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Submissions!A:M', // Columns A through M
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return true;
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Rate limiting check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    if (!body.email && !body.phone) {
      return NextResponse.json(
        { error: 'Either email or phone is required' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (body.email && !validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const submissionData: ContactSubmission = {
      timestamp: new Date().toISOString(),
      source: sanitizeInput(body.source || 'website', 50),
      name: sanitizeInput(body.name, 100),
      email: sanitizeInput(body.email || '', 100),
      phone: sanitizeInput(body.phone || '', 20),
      subject: sanitizeInput(body.subject || 'Contact Form Submission', 200),
      message: sanitizeInput(body.message, 2000),
      vehicle: sanitizeInput(body.vehicle || '', 200),
      insurer: sanitizeInput(body.insurer || '', 100),
      claimNo: sanitizeInput(body.claimNo || '', 50),
      photos: sanitizeInput(body.photos || '', 1000),
      userType: sanitizeInput(body.userType || '', 50),
      ip: ip,
      userAgent: sanitizeInput(body.userAgent || '', 500),
    };

    // Write to Google Sheets
    const success = await writeToGoogleSheets(submissionData);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your submission. We\'ll contact you within 24 hours to schedule your free estimate.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
