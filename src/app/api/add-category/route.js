import connectToDatabase from "../../lib/dbConnect";
import Category from "../../Models/Categories";
import SubCategory from "../../Models/SubCategory";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    await connectToDatabase().then(() => console.log("database connected"));
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("cat_name");
    const prefix = formData.get("cat_pref");
    const orderby = formData.get("orderby");
    const createdBy = formData.get("createdBy");
    const type = formData.get("type");
    const cat = formData.get("cat");
    const sub_cat_name = formData.get("sub_cat_name");
    const sub_cat_pref = formData.get("sub_cat_pref");
    const cat_image = formData.get("cat_image");
    const cat_stock_image = formData.get("cat_stock_image");

    // If adding a main category
    if (name) {
      // Auto-increment `id` by counting documents
      const total = await Category.countDocuments();
      const newId = total + 1;

      // File upload
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const imagePaths = [];

      for (const file of [cat_image, cat_stock_image]) {
        if (file instanceof Blob) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const filename = `${Date.now()}-${file.name}`;
          const filePath = path.join(uploadDir, filename);
          await fs.promises.writeFile(filePath, buffer);
          imagePaths.push(`/uploads/${filename}`);
        }
      }

      // Create product with calculated ID
      const Cat = new Category({
        id: newId,
        name,
        prefix,
        image: imagePaths[0] || "",
        stockImage: imagePaths[1] || "",
        orderby: Number(orderby),
        createdBy: Number(createdBy),
        createdDate: new Date(),
        updatedDate: new Date(),
      });

      await Cat.save();

      return NextResponse.json(
        { message: "Category saved successfully", status: "ok" },
        { status: 200 }
      );
    }

    // Handle subcategory
    else if (type === "sub_cat") {
      if (!sub_cat_name) {
        return NextResponse.json(
          { error: "Subcat Name is required" },
          { status: 400 }
        );
      }

     const total = await SubCategory.countDocuments();
  const newId = total + 1;
      
      
  const subCat = new SubCategory({
    subCategoryId: newId,
    name: sub_cat_name,
    categoryId: Number(cat),
    prefix: sub_cat_pref,
    createdBy: Number(createdBy),
    createdDate: new Date(),
    updatedDate: new Date(),
  });

  await subCat.save();

  return NextResponse.json(
    { message: "Subcategory saved successfully", status: "ok" },
    { status: 200 }
  );
}


  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
