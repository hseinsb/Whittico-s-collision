import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend (will be created when needed)
let resend: Resend | null = null;

// Interface for the form submission data
interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string;
  userAgent: string;
  timestamp: string;
  ip: string;
  // Dynamic fields for insurance/rental partners
  companyName?: string;
  claimNumber?: string;
  adjusterContact?: string;
  fleetSize?: string;
  contactRole?: string;
  // Photo count and URLs
  photos?: number;
  photoUrls?: string[];
}

// Email configuration - using process.env directly in nodemailer config

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

async function sendEmail(data: ContactSubmission): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing Resend API key - RESEND_API_KEY not set');
      return false;
    }

    // Initialize Resend only when needed
    if (!resend) {
      resend = new Resend(process.env.RESEND_API_KEY);
    }

    const subject = `[Whittico Web] ${data.subject} – ${data.name}`;
    const replyTo = validateEmail(data.email) ? data.email : 'info@whitticoscollision.co';

    let htmlBody = `
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
                <td style="padding: 8px 0; color: #333;">${data.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:${data.email}" style="color: #e8b347; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0; color: #333;"><a href="tel:${data.phone}" style="color: #e8b347; text-decoration: none;">${data.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td>
                <td style="padding: 8px 0; color: #333;">${data.subject}</td>
              </tr>`;
  
  // Add dynamic fields if present
  if (data.companyName) {
    htmlBody += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
                <td style="padding: 8px 0; color: #333;">${data.companyName}</td>
              </tr>`;
  }
  
  if (data.claimNumber) {
    htmlBody += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Claim #:</td>
                <td style="padding: 8px 0; color: #333;">${data.claimNumber}</td>
              </tr>`;
  }
  
  if (data.adjusterContact) {
    htmlBody += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Adjuster:</td>
                <td style="padding: 8px 0; color: #333;">${data.adjusterContact}</td>
              </tr>`;
  }
  
  if (data.fleetSize) {
    htmlBody += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Fleet Size:</td>
                <td style="padding: 8px 0; color: #333;">${data.fleetSize}</td>
              </tr>`;
  }
  
  if (data.contactRole) {
    htmlBody += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Role:</td>
                <td style="padding: 8px 0; color: #333;">${data.contactRole}</td>
              </tr>`;
  }
  
  if (data.photos && data.photos > 0) {
    htmlBody += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Photos:</td>
                <td style="padding: 8px 0; color: #333;">${data.photos} photo(s) attached</td>
              </tr>`;
    
    // Add photo links if available
    if (data.photoUrls && data.photoUrls.length > 0) {
      htmlBody += `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Photo Links:</td>
                <td style="padding: 8px 0; color: #333;">
                  ${data.photoUrls.map((url, index) => 
                    `<a href="${url}" style="color: #e8b347; text-decoration: none; margin-right: 10px;">Photo ${index + 1}</a>`
                  ).join('')}
                </td>
              </tr>`;
    }
  }
  
  htmlBody += `
            </table>
            
            <h3 style="color: #333; margin: 25px 0 10px 0;">Message:</h3>
            <div style="background: #f8f8f8; padding: 15px; border-left: 4px solid #e8b347; border-radius: 4px; margin: 10px 0;">
              <p style="margin: 0; line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <h3 style="color: #666; margin-top: 0; font-size: 14px;">Submission Details</h3>
            <p style="margin: 5px 0; font-size: 12px; color: #888;">
              <strong>Time:</strong> ${data.timestamp}<br>
              <strong>Source:</strong> ${data.source}<br>
              <strong>IP:</strong> ${data.ip}<br>
              <strong>User Agent:</strong> ${data.userAgent}
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

    const textBody = `
NEW WEBSITE CONTACT - ${data.subject}

CONTACT DETAILS:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.subject}${data.companyName ? `\nCompany: ${data.companyName}` : ''}${data.claimNumber ? `\nClaim #: ${data.claimNumber}` : ''}${data.adjusterContact ? `\nAdjuster: ${data.adjusterContact}` : ''}${data.fleetSize ? `\nFleet Size: ${data.fleetSize}` : ''}${data.contactRole ? `\nRole: ${data.contactRole}` : ''}${data.photos && data.photos > 0 ? `\nPhotos: ${data.photos} photo(s) attached` : ''}${data.photoUrls && data.photoUrls.length > 0 ? `\nPhoto Links: ${data.photoUrls.join(', ')}` : ''}

MESSAGE:
${data.message}

---
Submission Details:
Time: ${data.timestamp}
Source: ${data.source}
IP: ${data.ip}
    `;

    // Send email using Resend
    const result = await resend.emails.send({
      from: 'Whittico Website <onboarding@resend.dev>',
      to: ['info@whitticoscollision.co'],
      replyTo: replyTo,
      subject: subject,
      html: htmlBody,
      text: textBody,
    });

    console.log(`Email sent successfully for submission: ${data.name}`, result);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly.' },
        { status: 503 }
      );
    }

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
      ip: ip,
      userAgent: sanitizeInput(body.userAgent || '', 500),
      // Dynamic fields
      companyName: body.companyName ? sanitizeInput(body.companyName, 100) : undefined,
      claimNumber: body.claimNumber ? sanitizeInput(body.claimNumber, 50) : undefined,
      adjusterContact: body.adjusterContact ? sanitizeInput(body.adjusterContact, 100) : undefined,
      fleetSize: body.fleetSize ? sanitizeInput(body.fleetSize, 20) : undefined,
      contactRole: body.contactRole ? sanitizeInput(body.contactRole, 100) : undefined,
      photos: body.photos || 0,
      photoUrls: body.photoUrls || [],
    };

    // Send email notification
    const success = await sendEmail(submissionData);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your submission. We\'ll get back to you within 24 hours!' 
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
