import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Here you would typically verify against your database
    // This is a placeholder implementation
    const isValidUser = true; // Replace with actual validation
    
    if (isValidUser) {
      // Create a successful response with httpOnly cookie
      const response = NextResponse.json(
        { success: true },
        { status: 200 }
      );
      
      // Set auth cookie
      response.cookies.set('authToken', 'your-jwt-token-here', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}