// app/api/export-users/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from '../../lib/dbConnect';
import User from "../../Models/User";

export async function GET() {
  await connectToDatabase();
  const users = await User.find({ deleted: "N" }).lean();
  return NextResponse.json(users);
}