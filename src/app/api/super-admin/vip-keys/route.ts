import { NextResponse } from 'next/server';
import { generateVipKey, getAllVipKeys } from '@/lib/db';
import { isSuperAdminAuthenticated, SUPER_ADMIN_SESSION_COOKIE } from '@/lib/auth';
import { cookies } from 'next/headers';
import { assertTrustedMutationOrigin } from '@/lib/security';

export async function GET() {
  try {
    const auth = await isSuperAdminAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const keys = await getAllVipKeys();
    return NextResponse.json(keys);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    await assertTrustedMutationOrigin();
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SUPER_ADMIN_SESSION_COOKIE)?.value;
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized: No session cookie' }, { status: 401 });
    }
    
    const auth = await isSuperAdminAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized: Invalid session' }, { status: 401 });
    }
    
    // Generate a secure random VIP key: VIP-XXXX-XXXX-XXXX
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generateSegment = () => Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const newKey = 'GANGLIST-' + generateSegment() + '-' + generateSegment();
    
    await generateVipKey(newKey);
    return NextResponse.json({ success: true, key: newKey });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
