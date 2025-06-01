import mongoose from 'mongoose';

const StateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country_id: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.State || mongoose.model('State', StateSchema);