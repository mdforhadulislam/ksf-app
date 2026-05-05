import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const users = await db.collection('users').find({}).toArray();
    return NextResponse.json(users.map(u => ({ ...u, id: u._id.toString(), uid: u._id.toString() })));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const result = await db.collection('users').insertOne({
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
    const { id, ...data } = body;
    const { ObjectId } = await import('mongodb');
    const db = await getDatabase();
    
    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
