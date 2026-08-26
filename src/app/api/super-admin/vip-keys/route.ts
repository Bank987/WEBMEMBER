import { NextResponse } from 'next/server';
import { generateVipKey, getAllVipKeys } from '@/lib/db';
import { isSuperAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    if (!(await isSuperAdminAuthenticated())) {
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
    if (!(await isSuperAdminAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Generate a secure random VIP key: VIP-XXXX-XXXX-XXXX
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generateSegment = () => Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const newKey = 'GANGLIST-' + generateSegment() + '-' + generateSegment();
    
    await generateVipKey(newKey);
    return NextResponse.json({ success: true, key: newKey });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate VIP key' }, { status: 500 });
  }
}

