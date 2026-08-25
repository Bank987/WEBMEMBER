import { NextResponse } from 'next/server';
import { generateVipKey, getAllVipKeys } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('super_admin_auth')?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const keys = await getAllVipKeys();
    return NextResponse.json(keys);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get VIP keys' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('super_admin_auth')?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Generate a secure random VIP key: VIP-XXXX-XXXX-XXXX
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generateSegment = () => Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const newKey = `GANGLIST-${generateSegment()}-${generateSegment()}`;
    
    await generateVipKey(newKey);
    return NextResponse.json({ success: true, key: newKey });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate VIP key' }, { status: 500 });
  }
}

