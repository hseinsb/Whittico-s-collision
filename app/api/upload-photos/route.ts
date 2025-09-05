import { NextRequest, NextResponse } from 'next/server';

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

    // For now, we'll return the files as base64 data URLs
    // In production, you'd upload to cloud storage (AWS S3, Cloudinary, etc.)
    const photoUrls = await Promise.all(
      validFiles.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;
        return dataUrl;
      })
    );

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
