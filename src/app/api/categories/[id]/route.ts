import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { ObjectId } = await import('mongodb');
    const db = await getDatabase();
    const category = await db.collection('categories').findOne({ _id: new ObjectId(id) });
    
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...category, id: category._id.toString() });
  } catch (error: any) {
    console.error('Category GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { ObjectId } = await import('mongodb');
    const body = await request.json();
    const db = await getDatabase();
    
    await db.collection('categories').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Category PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { ObjectId } = await import('mongodb');
    const db = await getDatabase();
    
    await db.collection('categories').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Category DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
