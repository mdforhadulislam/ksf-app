import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const categories = await db.collection('categories').find({}).toArray();
    return NextResponse.json(categories.map(c => ({ ...c, id: c._id.toString() })));
  } catch (error: any) {
    console.error('Categories GET error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const result = await db.collection('categories').insertOne({
      name: body.name || '',
      description: body.description || '',
      image: body.image || '',
      createdAt: new Date(),
    });

    return NextResponse.json({ ...body, id: result.insertedId.toString() });
  } catch (error: any) {
    console.error('Categories POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
