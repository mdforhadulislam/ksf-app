import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
      return NextResponse.json({ error: 'Cloudinary not configured. Please update .env.local' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const tempPath = join(tmpdir(), `upload_${Date.now()}_${file.name}`);
    await writeFile(tempPath, buffer);
    
    try {
      const result = await cloudinary.uploader.upload(tempPath, {
        folder: 'ksf-store/products',
      });
      
      await unlink(tempPath);
      
      return NextResponse.json({ 
        url: result.secure_url, 
        public_id: result.public_id 
      });
    } catch (uploadError: any) {
      await unlink(tempPath).catch(() => {});
      console.error('Cloudinary upload error:', uploadError);
      return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Upload route error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
