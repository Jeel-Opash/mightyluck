import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    return NextResponse.json({ success: true, message: 'Logged out successfully' }, { status: 200 });
  } catch (err) {
    console.error('[LOGOUT ERROR]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
