import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products.map(p => ({ 
      ...p, 
      id: p._id.toString(),
      price: p.price || 0,
      name: p.name || '',
      description: p.description || '',
      image: p.image || '',
      category: p.category || '',
      stock: p.stock || 0,
    })));
  } catch (error: any) {
    console.error('Products GET error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const result = await db.collection('products').insertOne({
      name: body.name || '',
      price: body.price || 0,
      description: body.description || '',
      image: body.image || '',
      category: body.category || '',
      stock: body.stock || 0,
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      ...body, 
      id: result.insertedId.toString(),
      price: body.price || 0,
    });
  } catch (error: any) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
