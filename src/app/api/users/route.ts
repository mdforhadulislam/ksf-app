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
    const users = await readCollection('users');
    return NextResponse.json(users.map((u: any) => ({ ...u, id: u.id || u._id, uid: u.id || u._id })));
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const users = await readCollection('users');
    
    // Check if email already exists
    const existing = users.find((u: any) => u.email === body.email);
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    
    const newUser = { 
      ...body, 
      id: Date.now().toString(), 
      createdAt: new Date(),
      role: body.role || 'user'
    };
    users.push(newUser);
    await writeCollection('users', users);
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const users = await readCollection('users');
    const index = users.findIndex((u: any) => u.id === id || u._id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    users[index] = { ...users[index], ...data, updatedAt: new Date() };
    await writeCollection('users', users);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
