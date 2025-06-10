// // models/Product.js
// import mongoose from "mongoose";

// const ProductsSchema = new mongoose.Schema({
//   unique_id: String,
//   categoryId: Number,
//   subCategoryId: Number,
//   sku: String,
//   content: String,
//   // moq: String,
//   description: String,
//   search: String,
//   listing: { type: String, enum: ['Public', 'Private'], default: 'Public' },
//   featured: { type: String, enum: ['Y', 'N'], default: 'N' },
//   gold: { type: String, enum: ['Y', 'N'], default: 'N' },
//   verify: { type: String, default: 'N' },
//   assured: { type: String, default: 'N' },
//   lat_des: { type: String, enum: ['Y', 'N'], default: 'N' },
//   certi_fab: { type: String, enum: ['Y', 'N'], default: 'N' },
//   sustainable: { type: String, enum: ['Y', 'N'], default: 'N' },
//   orgId: Number,
//   costing: String,
//   colors: [String],
//   sizes:[String],
//   image: [String], // store image filenames or paths
//   STATUS: { type: String, enum: ['active', 'Inactive', 'F-Inactive'], default: 'active' },
//   sowtexUserId: Number,
//   teamView: String,
//   certi: String,
//   deleted: { type: String, enum: ['Y', 'N'], default: 'N' },
//   createdBy: Number,
//   createdDate: { type: Date, default: Date.now },
//   updatedBy: Number,
//   updatedDate: { type: Date, default: Date.now },
// });

// export default mongoose.models.products || mongoose.model("products", ProductsSchema);
import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  unique_id: { type: String,  unique: true },
  categoryId: { type: Number, required: true },
  subCategoryId: { type: Number, required: true },
  sku: { type: String, required: true },
  content: String,
  moq: String,
  description: String,
  search: String,
  listing: { type: String, enum: ['Public', 'Private'], default: 'Public' },
  featured: { type: String, enum: ['Y', 'N'], default: 'N' },
  gold: { type: String, enum: ['Y', 'N'], default: 'N' },
  verify: { type: String, default: 'N' },
  assured: { type: String, default: 'N' },
  lat_des: { type: String, enum: ['Y', 'N'], default: 'N' },
  certi_fab: { type: String, enum: ['Y', 'N'], default: 'N' },
  sustainable: { type: String, enum: ['Y', 'N'], default: 'N' },
  orgId: Number,
  costing: String,
  colors: { type: [String], default: [] }, // Ensure it's always an array
    sizes:[String],  // Ensure it's always an array
  image: { type: [String], default: [] },  // Ensure it's always an array
  STATUS: { type: String, enum: ['active', 'Inactive', 'F-Inactive'], default: 'active' },
  sowtexUserId: Number,
  teamView: String,
  certi: String,
  deleted: { type: String, enum: ['Y', 'N'], default: 'N' },
  createdBy: Number,
  createdDate: { type: Date, default: Date.now },
  updatedBy: Number,
  updatedDate: { type: Date, default: Date.now },
}, { timestamps: false }); // Disable automatic timestamps since you're manually handling them

export default mongoose.models.products || mongoose.model("products", ProductsSchema);