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
    const { username, firstName, lastName, email, password, phone } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email and password are required.' },
        { status: 400 }
      );
    }

    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const users = db.collection('users');

    const existing = await users.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existing) {
      const field = existing.email === email.toLowerCase() ? 'Email' : 'Username';
      return NextResponse.json({ error: `${field} is already registered.` }, { status: 409 });
    }

    const newUser = {
      username,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email.toLowerCase(),
      password: hashPassword(password),
      phone: phone || '',
      balance: 1000.00,
      level: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(newUser);

    const token = encryptSession(result.insertedId.toString());
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: result.insertedId.toString(),
        username: newUser.username,
        email: newUser.email,
        balance: newUser.balance,
        level: newUser.level,
      },
    }, { status: 201 });

  } catch (err) {
    console.error('[REGISTER ERROR]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
