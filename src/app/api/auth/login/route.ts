import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { encryptSession } from '@/lib/auth';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email/username and password are required.' },
        { status: 400 }
      );
    }

    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const users = db.collection('users');

    // Find user by email or username
    const user = await users.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: email },
      ],
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    if (user.password !== hashPassword(password)) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    // Update last login time
    await users.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

    // Set session cookie
    const token = encryptSession(user._id.toString());
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully!',
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        balance: user.balance,
        level: user.level,
      },
    }, { status: 200 });

  } catch (err: any) {
    console.error('[LOGIN ERROR]', err);
    return NextResponse.json({
      error: 'Internal server error.',
      details: err?.message || String(err)
    }, { status: 500 });
  }
}
