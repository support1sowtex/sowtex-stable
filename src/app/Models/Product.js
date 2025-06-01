// models/Product.js
import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  unique_id: String,
  categoryId: Number,
  subCategoryId: Number,
  sku: String,
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
  colors: [String],
  image: [String], // store image filenames or paths
  STATUS: { type: String, enum: ['active', 'Inactive', 'F-Inactive'], default: 'active' },
  sowtexUserId: Number,
  teamView: String,
  certi: String,
  deleted: { type: String, enum: ['Y', 'N'], default: 'N' },
  createdBy: Number,
  createdDate: { type: Date, default: Date.now },
  updatedBy: Number,
  updatedDate: { type: Date, default: Date.now },
});

export default mongoose.models.products || mongoose.model("products", ProductsSchema);
