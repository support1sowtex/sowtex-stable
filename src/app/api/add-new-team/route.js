import jwt from 'jsonwebtoken';
import User from "../../Models/User";
import connectToDatabase from "../../lib/dbConnect";
export async function POST(req) {
  
  try {
    // console.log("here");
    await connectToDatabase();
    const body = await req.json();
    console.log(body);
    // const { email, password } = body;
     return new Response(JSON.stringify({ message: 'added team' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}