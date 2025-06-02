import { NextResponse } from "next/server";

import connectToDatabase from "../../lib/dbConnect.js";
import User from "../../Models/User";

export async function GET(request) {
  try {
    await connectToDatabase();

    // Get query parameters safely
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // First get total count
    const totalCountPipeline = [
      {
        $lookup: {
          from: "organizations",
          localField: "orgId",
          foreignField: "orgId",
          as: "organization"
        }
      },
      { $unwind: "$organization" },
      { $group: { _id: "$orgId" } },
      { $count: "total" }
    ];

    const totalResult = await User.aggregate(totalCountPipeline);
    const total = totalResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Then get paginated data
    const dataPipeline = [
      {
        $lookup: {
          from: "organizations",
          localField: "orgId",
          foreignField: "orgId",
          as: "organization"
        }
      },
      { $unwind: "$organization" },
      {
        $group: {
          _id: "$orgId",
          fName: { $first: "$fName" },
          lName: { $first: "$lName" },
          email: { $first: "$email" },
          customerId: { $first: "$customerId" },
          mobile: { $first: "$phoneNumber" },
          orgName: { $first: "$organization.orgName" },
          degination: { $first: '$degination' }
        }
      },
      {
        $project: {
          _id: 0,
          orgId: "$_id",
          fName: 1,
          lName: 1,
          email: 1,
          companyName: 1,
          orgName: 1,
          mobile: 1,
          customerId: 1,
          degination: 1
        }
      },
      { $skip: skip },
      { $limit: limit }
    ];

    const users = await User.aggregate(dataPipeline);

    return NextResponse.json({
      status: "ok",
      users: users || [],
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit
      }
    });

  } catch (error) {
    console.error("Error in trial-members API:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}