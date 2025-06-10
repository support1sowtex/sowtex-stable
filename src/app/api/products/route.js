import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect"; // Adjust path as needed
import Product from "../../Models/Product"; // Adjust path as needed
import Category from "../../Models/Categories"; // Adjust path as needed
import User from "../../Models/User"; // Adjust path as needed
import { faker } from '@faker-js/faker';
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await dbConnect(); // Ensure connection to MongoDB

    const id = request.nextUrl.searchParams.get("id");

    if (id) {
      const product = await Product.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "id",
            as: "categoryInfo",
          },
        },
        {
          $unwind: {
            path: "$categoryInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategoryId",
            foreignField: "subCategoryId",
            as: "subCategoryInfo",
          },
        },
        {
          $unwind: {
            path: "$subCategoryInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            sku: 1,
            content: 1,
            moq: 1,
            image: 1,
            createdDate: 1,
            colors:1,
            description:1,
            categoryName: "$categoryInfo.name",
            subCategoryName: {
              $ifNull: ["$subCategoryInfo.name", "No Subcategory"],
            },
          },
        },
      ]);

      if (!product || product.length === 0) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Product fetched", product: product[0],status:"ok" });
    }

    // Return all products if no ID
    const allProducts = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategoryId",
          foreignField: "subCategoryId",
          as: "subCategoryInfo",
        },
      },
      {
        $unwind: {
          path: "$subCategoryInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          sku: 1,
          content: 1,
          moq: 1,
          image: 1,
          createdDate: 1,
          categoryName: "$categoryInfo.name",
          subCategoryName: {
            $ifNull: ["$subCategoryInfo.name", "No Subcategory"],
          },
        },
      },
    ]);

    return NextResponse.json({ message: "Product list", productsWithCategory: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
