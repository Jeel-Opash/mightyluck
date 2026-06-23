import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';
import { decryptSession } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const userId = decryptSession(sessionCookie.value);
    if (!userId) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const users = db.collection('users');

    let objId;
    try {
      objId = new ObjectId(userId);
    } catch {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await users.findOne({ _id: objId });
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        balance: user.balance,
        level: user.level,
      },
    }, { status: 200 });

  } catch (err) {
    console.error('[AUTH ME ERROR]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
