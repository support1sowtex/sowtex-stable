import { NextResponse } from "next/server";
import connectToDatabase from "../../lib/dbConnect"; // Adjust path as needed
import User from "../../Models/User"; // Adjust path as needed

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch all products where deleted != 'Y'
    const users = await User.find({ deleted: { $ne: 'Y' } }).sort({ createdDate: -1 });

    return NextResponse.json({ message: "Product list", users }, { status: 200 });

  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
