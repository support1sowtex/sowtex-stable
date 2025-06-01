import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id:Number,
  customerId: String,
  fName: String,
  lName: String,
  email: String,
  code: String,
  phoneNumber: String,
  companyName: String,
  natOfBus: String,
  degination: String,
  country: String,
  state: String,
  city: String,
  zipCode: String,
  password: String,
  membership: String,
  memType: String,
  type:String,
  orgId:Number,
  deleted: { 
      type: String, 
      enum: ['Y', 'N'], 
      default: 'N' 
    },
  createdDate: { type: Date, default: Date.now },
  updatedBy: Number,
  updatedDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);