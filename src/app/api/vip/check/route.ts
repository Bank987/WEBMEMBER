import { NextResponse } from 'next/server';
import { checkVipKey } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    if (!key) return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    
    const vipKey = await checkVipKey(key);
    if (!vipKey) {
      return NextResponse.json({ error: 'Invalid or used key' }, { status: 404 });
    }
    
    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check key' }, { status: 500 });
  }
}
