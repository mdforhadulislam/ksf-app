import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const tempPath = join(tmpdir(), `upload_${Date.now()}_${file.name}`);
    await writeFile(tempPath, buffer);
    
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: 'ksf-store/products',
    });
    
    await unlink(tempPath);
    
    return NextResponse.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
