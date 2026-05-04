import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await readFile(join(process.cwd(), 'data', 'products.json'), 'utf-8');
    const products = JSON.parse(data);
    const product = products.find((p: any) => p.id === id || p._id === id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const filePath = join(process.cwd(), 'data', 'products.json');
    const data = await readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    const index = products.findIndex((p: any) => p.id === id || p._id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    products[index] = { ...products[index], ...body, updatedAt: new Date() };
    await writeFile(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const filePath = join(process.cwd(), 'data', 'products.json');
    const data = await readFile(filePath, 'utf-8');
    const products = JSON.parse(data);
    const filtered = products.filter((p: any) => p.id !== id && p._id !== id);
    await writeFile(filePath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
