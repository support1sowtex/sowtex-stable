import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  id: String,
  sortname: String,
  name: String,
  phonecode: String,
  flag: String,
  deleted: String,
  order: String
});

// Check if the model already exists before creating it
const Country = mongoose.models.Country || mongoose.model("Country", countrySchema);

export default Country;