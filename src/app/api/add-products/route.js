
// app/api/add-products/route.js
import  connectToDatabase   from '../../lib/dbConnect';
import Product from '../../Models/Product';
import Category from '../../Models/Categories';
import { NextResponse } from 'next/server';
import fs from 'fs';
import Swal from 'sweetalert2';
import path from 'path';

export async function POST(request) {
  try {
    await connectToDatabase().then(
      console.log('database connected')
      
    );
    // Create uploads directory if not exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Get form data
    const formData = await request.formData();
    const jsonData = formData.get('formData');
    const files = formData.getAll('files');

    if (!jsonData) {
      return NextResponse.json(
        { error: 'Form data is missing' },
        { status: 400 }
      );
    }

    // Parse JSON data
    const parsedData = JSON.parse(jsonData);
    const selectedOptionsRaw = formData.get('selectedOptions'); // ✅ get single field
    const colors = selectedOptionsRaw ? JSON.parse(selectedOptionsRaw) : [];
 
    // Process uploaded files
    const imagePaths = [];
    for (const file of files) {
      if (file instanceof Blob) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, filename);
        
        await fs.promises.writeFile(filePath, buffer);
        imagePaths.push(`/uploads/${filename}`);
      }
    }
    const colorString = colors.join(','); 
    // Create and save product
       const count = await Product.countDocuments({ categoryId: Number(parsedData.cat)});
   const parentCategory = await Category.findOne({ id:Number(parsedData.cat) });
    let uniqueId = "";
        if (!parentCategory) {
      console.log("Category not found");
    } else {
      const prefix = parentCategory.prefix;
      const countStr = count.toString();
      const zerosNeeded = 10 - prefix.length - countStr.length;
      const zeroPadding = "0".repeat(zerosNeeded);
      const uniqueId = prefix + zeroPadding + countStr;
      console.log("Generated ID:", uniqueId);
    }

// const parentCategory = await Category.countDocuments({ categoryId: 1 });
//       console.log("count is" ,parentCategory);

    const product = new Product({
      ...parsedData,
      image: imagePaths,
      unique_id: uniqueId,
      categoryId: Number(parsedData.cat),
      subCategoryId: Number(parsedData.sub_cat),
      colors: colorString,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    await product.save();

    return NextResponse.json(
      { message: 'Product saved successfully', "status":"ok" },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
