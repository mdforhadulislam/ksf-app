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
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    return NextResponse.json({ 
      ...product, 
      id: product._id.toString(),
      price: product.price || 0,
      name: product.name || '',
      description: product.description || '',
      image: product.image || '',
      category: product.category || '',
      stock: product.stock || 0,
    });
  } catch (error: any) {
    console.error('Product GET error:', error);
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
    
    await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Product PUT error:', error);
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
    
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Product DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
