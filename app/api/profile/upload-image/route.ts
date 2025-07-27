import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookie, getUserFromToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromCookie(request);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // In a real application, you would upload this to a cloud storage service
    // like AWS S3, Cloudinary, or similar. For this example, we'll simulate
    // the upload and return a placeholder URL.
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a mock URL (in production, this would be the actual uploaded image URL)
    const imageUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`;

    return NextResponse.json({
      success: true,
      data: { imageUrl },
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}