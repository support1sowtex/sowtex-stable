// app/api/organization/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/dbConnect';
import Organization from '../../Models/Organization';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  console.log(q);
  if (!q) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const orgs = await Organization.find({
      orgName: { $regex: q, $options: 'i' }
    })
      .limit(10)
      .select('orgName orgUniqueId');

    const results = orgs.map(org => ({
      label: `${org.orgName} [${org.orgUniqueId}]`,
      value: org._id
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error('Error fetching organizations:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
