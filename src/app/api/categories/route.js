// app/api/categories/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/dbConnect';
// import Category from '../../Models/Categories';
import Category from "../../Models/Categories";

export async function GET() {
  try {
    await connectToDatabase();

    // Only fetch visible and non-deleted categories
    const categories = await Category.find({ visiblity: 'Y', deleted: 'N' })
      .sort({ orderby: 1 }) // Optional: sort by order
      .select({ id: 1, name: 1, _id: 0 }); // Only return needed fields

    // Format to value-label pairs for frontend
    const formatted = categories.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}
