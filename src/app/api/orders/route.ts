import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');

async function readCollection(name: string) {
  try {
    const data = await readFile(join(DATA_DIR, `${name}.json`), 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeCollection(name: string, data: any) {
  await writeFile(join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const orders = await readCollection('orders');
    return NextResponse.json(orders.map((o: any) => ({ ...o, id: o.id || o._id })));
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orders = await readCollection('orders');
    const newOrder = { ...body, id: Date.now().toString(), createdAt: new Date() };
    orders.push(newOrder);
    await writeCollection('orders', orders);
    return NextResponse.json(newOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const orders = await readCollection('orders');
    const index = orders.findIndex((o: any) => o.id === id || o._id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    orders[index] = { ...orders[index], status, updatedAt: new Date() };
    await writeCollection('orders', orders);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
