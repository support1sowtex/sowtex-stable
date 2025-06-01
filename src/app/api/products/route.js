import { NextResponse } from "next/server";
import connectToDatabase from "../../lib/dbConnect"; // Adjust path as needed
import Product from "../../Models/Product"; // Adjust path as needed
import Category from "../../Models/Categories"; // Adjust path as needed
import User from "../../Models/User"; // Adjust path as needed
import { faker } from '@faker-js/faker';
export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
      const generateUser = (index) => ({
      id: 1,
      uniqueCode: `IND${index.toString().padStart(7, "0")}`,
      fName: faker.person.firstName().toLowerCase(),
      lName: faker.person.lastName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      code: faker.number.int({ min: 10, max: 99 }).toString(),
      phoneNumber: "+91-" + faker.phone.number("9#########"),
      companyName: faker.company.name(),
      natOfBus: faker.number.int({ min: 10, max: 99 }).toString(),
      degination: faker.number.int({ min: 10, max: 99 }).toString(),
      country: "101",
      state: "1",
      city: "1",
      zipCode: faker.location.zipCode(),
      password: "123456",
      password_confirm: "123456",
      membership: "",
      zipcode: faker.location.zipCode(),
      memType: "Free",
    });

    // Insert dummy users

    const insertDummyUsers = async (count = 10) => {
      try {
        // Get current count of users with uniqueCode starting with 'IND'
        const baseCount = await User.countDocuments({
          uniqueCode: { $regex: /^IND/ },
        });
        // return false;
        const users = [];

        for (let i = 1; i <= count; i++) {
          const currentIndex = baseCount + i;
          const user = generateUser(currentIndex);
          users.push(user);
          // console.log(user);return false;
        }

        await User.insertMany(users);
        console.log(
          `${count} dummy users inserted starting from IND${(baseCount + 1)
            .toString()
            .padStart(7, "0")}`
        );
        mongoose.disconnect();
      } catch (error) {
        console.error("Error inserting users:", error);
      }
    };
    insertDummyUsers(10);
    const productsWithCategory = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: 'id', // Make sure this matches your Category schema
          as: 'categoryInfo'
        }
      },
      {
        $unwind: {
          path: '$categoryInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'subcategories', // Ensure this matches your collection name
          localField: 'subCategoryId',
          foreignField: 'subCategoryId', // Must match exactly
          as: 'subCategoryInfo'
        }
      },
      {
        $unwind: {
          path: '$subCategoryInfo',
          preserveNullAndEmptyArrays: true // Keep this true to include products without subcategories
        }
      },
      {
        $project: {
          _id: 1,
          sku: 1,
          content: 1,
          moq: 1,
          image: 1,
          createdDate: 1,
          categoryName: '$categoryInfo.name',
          subCategoryName: { 
            $ifNull: ['$subCategoryInfo.name', 'No Subcategory'] // Handle null cases
          }
        }
      }
    ]);
   // for example, from request



    

    return Response.json({ message: "Product list", productsWithCategory  });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}