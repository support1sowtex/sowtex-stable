// File: /app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import User from '../../Models/User';
import connectToDatabase from "../../lib/dbConnect"; // Adjust path as needed

export async function GET(request) {
  try {
    await connectToDatabase();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization token missing or invalid format' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    const user = await User.findOne({ email: decoded.email }).select('-password -__v').lean();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const dashboardData = {
      user: {
        email: user.email,
        fName: user.fName,
        lName: user.lName,
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}