import { NextResponse } from 'next/server';
import { redeemVipKey } from '@/lib/db';
import { getAuthenticatedGang } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    if (!key) return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    
    // Auth check using standard getAuthenticatedGang
    const gang = await getAuthenticatedGang();
    if (!gang) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Redeem
    await redeemVipKey(key, gang.id);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to redeem key' }, { status: 400 });
  }
}
