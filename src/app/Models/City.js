import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  id:Number,
  name: {
    type: String,
    required: true,
  },
  state_id: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.City || mongoose.model('City', CitySchema);