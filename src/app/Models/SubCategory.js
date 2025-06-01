// models/SubCategory.js
import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    default: null
  },
  subCategoryId: {
    type: Number,
    required: true,
    unique: true
  },
   id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    default: null,
    maxlength: 100
  },
  prefix: {
    type: String,
    default: null,
    maxlength: 10
  },
  deleted: {
    type: String,
    enum: ['N', 'Y'],
    default: 'N'
  },
  createdBy: {
    type: Number,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  }
});

// Update the `updatedDate` before each save
SubCategorySchema.pre('save', function (next) {
  this.updatedDate = Date.now();
  next();
});

export default mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema);

