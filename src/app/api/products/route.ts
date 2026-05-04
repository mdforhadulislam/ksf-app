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
    const products = await readCollection('products');
    return NextResponse.json(products.map((p: any) => ({ ...p, id: p.id || p._id })));
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = await readCollection('products');
    const newProduct = { ...body, id: Date.now().toString(), createdAt: new Date() };
    products.push(newProduct);
    await writeCollection('products', products);
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
