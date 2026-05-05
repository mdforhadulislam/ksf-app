import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const orders = await db.collection('orders').find({}).toArray();
    return NextResponse.json(orders.map(o => ({ ...o, id: o._id.toString() })));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const result = await db.collection('orders').insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ ...body, id: result.insertedId.toString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const { ObjectId } = await import('mongodb');
    const db = await getDatabase();
    
    await db.collection('orders').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
