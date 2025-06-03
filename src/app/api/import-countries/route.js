import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/dbConnect";
import Country from "../../Models/Country";
import State from "../../Models/State";
import path from 'path';
import csv from 'csv-parser';
import fs from 'fs';

export async function GET(request) {
  try {
    await connectToDatabase();

    const type = request.nextUrl.searchParams.get("type") || "country";
    console.log("Importing type:", type);

    if (type === "country") {
      const filePath = path.join(process.cwd(), 'public', 'uploads', 'xx_countries.csv');
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { message: 'CSV file not found at public/uploads/xx_countries.csv' },
          { status: 404 }
        );
      }

      const results = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', resolve)
          .on('error', reject);
      });

      await Country.deleteMany({});
      const inserted = await Country.insertMany(results);

      return NextResponse.json(
        { message: "Countries imported successfully", count: inserted.length, status: "ok" },
        { status: 200 }
      );

    } else if (type === "state") {
      const stateFilePath = path.join(process.cwd(), 'public', 'uploads', 'xx_states.csv');
      if (!fs.existsSync(stateFilePath)) {
        return NextResponse.json(
          { message: 'CSV file not found at public/uploads/xx_states.csv' },
          { status: 404 }
        );
      }

      const stateData = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(stateFilePath)
          .pipe(csv())
          .on('data', (data) => stateData.push(data))
          .on('end', resolve)
          .on('error', reject);
      });

      await State.deleteMany({});
      const insertedStates = await State.insertMany(stateData);

      return NextResponse.json(
        { message: "States imported successfully", count: insertedStates.length, status: "ok" },
        { status: 200 }
      );
    } else if(type==="city"){
      return NextResponse.json({message:"city uploaded", count: 123, status: "ok"});
    }

    return NextResponse.json({ message: "Invalid type parameter" }, { status: 400 });

  } catch (error) {
    console.error("Error importing:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
