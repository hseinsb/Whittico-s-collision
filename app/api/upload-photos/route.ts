import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fallback for local development
const uploadsDir = join(process.cwd(), 'public', 'uploads');

async function ensureUploadsDir() {
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('photos') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: 'Maximum 5 photos allowed' },
        { status: 400 }
      );
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type === 'image/jpeg' || file.type === 'image/png';
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      return NextResponse.json(
        { error: 'Only JPG/PNG files under 5MB allowed' },
        { status: 400 }
      );
    }

    // Check if Cloudinary is configured (for production)
    const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                         process.env.CLOUDINARY_API_KEY && 
                         process.env.CLOUDINARY_API_SECRET;

    let photoUrls: string[] = [];

    if (useCloudinary) {
      // Upload to Cloudinary (production)
      photoUrls = await Promise.all(
        validFiles.map(async (file, index) => {
          const buffer = await file.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          const dataUrl = `data:${file.type};base64,${base64}`;
          
          try {
            const result = await cloudinary.uploader.upload(dataUrl, {
              folder: 'whitticos-collision/photos',
              public_id: `contact_${Date.now()}_${index}`,
              resource_type: 'auto',
              quality: 'auto',
              fetch_format: 'auto',
            });
            
            return result.secure_url;
          } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error('Failed to upload photo');
          }
        })
      );
    } else {
      // Fallback to local storage (development)
      await ensureUploadsDir();
      photoUrls = await Promise.all(
        validFiles.map(async (file, index) => {
          const timestamp = Date.now();
          const filename = `photo_${timestamp}_${index}.${file.type.split('/')[1]}`;
          const filepath = join(uploadsDir, filename);
          
          const buffer = await file.arrayBuffer();
          await writeFile(filepath, Buffer.from(buffer));
          
          // Return the public URL
          return `${request.nextUrl.origin}/uploads/${filename}`;
        })
      );
    }

    return NextResponse.json({
      success: true,
      photoUrls: photoUrls,
      count: photoUrls.length
    });

  } catch (error) {
    console.error('Photo upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload photos' },
      { status: 500 }
    );
  }
}
