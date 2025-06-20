import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });

  res.cookies.set('authToken', '', {
    httpOnly: false,
    secure: true,
    maxAge: 0,
    path: '/',
  });

  res.cookies.set('userType', '', {
    httpOnly: false,
    secure: true,
    maxAge: 0,
    path: '/',
  });

  return res;
}
