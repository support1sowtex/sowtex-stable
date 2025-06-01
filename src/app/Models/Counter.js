import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g., "categoryId"
  sequence_value: { type: Number, default: 0 },
});

export default mongoose.models.Counter || mongoose.model('categories', CounterSchema);
