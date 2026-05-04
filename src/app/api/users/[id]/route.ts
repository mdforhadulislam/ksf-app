import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await readFile(join(process.cwd(), 'data', 'users.json'), 'utf-8');
    const users = JSON.parse(data);
    const user = users.find((u: any) => u.id === id || u._id === id);
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...user, id: user.id || user._id, uid: user.id || user._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
