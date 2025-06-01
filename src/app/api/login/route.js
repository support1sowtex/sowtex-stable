import jwt from 'jsonwebtoken';
import User from "../../Models/User";
import connectToDatabase from "../../lib/dbConnect";
export async function POST(req) {
  
  try {
    // console.log("here");
    await connectToDatabase();
    const body = await req.json();
    const { email, password } = body;
    console.log("email", email);
    console.log("password", password);
    const validEmail = 'negikaithal@gmail.com';
    const validPassword = 'Negi@321';
    // const user = await User.find ({ email });
    // console.log("user", user);
    const userData = await User.findOne({ email:email }).select('email password fName lName');

    if(userData === null) {
      return new Response(JSON.stringify({ message: 'Email not found' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (email === userData.email && password === userData.password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return new Response(JSON.stringify({ message: 'Login Successful', username: userData  }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `token=${token}; Path=/; Max-Age=3600`, // Store token in cookie
        },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid email or password'}), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}