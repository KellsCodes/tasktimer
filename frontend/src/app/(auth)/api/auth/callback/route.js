import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This function handles the GET request from backend
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/login?error=true', request.url));
    }

    const cookieStore = cookies();

    // Set the cookies
    cookieStore.set('accessToken', accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    // Redirect to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));

  } catch (error) {
    console.error('Error in Next.js OAuth callback:', error);
    return NextResponse.redirect(new URL('/login?error=true', request.url));
  }
}
