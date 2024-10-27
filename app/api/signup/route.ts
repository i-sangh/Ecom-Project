import { User } from '../../models/Users';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already registered' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    // Don't send password back in response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return new Response(
      JSON.stringify({
        message: 'User registered successfully',
        user: userWithoutPassword,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to register user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
