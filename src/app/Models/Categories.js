import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: { type: String, maxlength: 500 },
  description: { type: String, maxlength: 1000 },
  image: { type: String, maxlength: 255 },
  stockImage: { type: String },
  prefix: { type: String, maxlength: 10 },
  visiblity: { type: String, enum: ['Y', 'N'], default: 'Y' },
  tags: { type: String },
  orderby: { type: Number, required: true },
  deleted: { type: String, enum: ['N', 'Y'], default: 'N' },
  createdBy: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedBy: { type: Number },
  updatedDate: { type: Date, default: Date.now }
});

// ❌ Removed auto-increment pre-save hook

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
