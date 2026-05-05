import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products.map(p => ({ ...p, id: p._id.toString() })));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const result = await db.collection('products').insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ ...body, id: result.insertedId.toString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
