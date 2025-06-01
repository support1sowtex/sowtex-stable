import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  orgId: Number,
  orgUniqueId: { type: String, default: '' },
  orgName: { type: String, default: '' },
  natureOfBusinessId: Number,
  address: { type: String, default: '' },
  rating: Number,
  countryId: Number,
  stateId: Number,
  cityId: Number,
  zipCode: { type: String, default: '' },
  memberShip: { type: String, enum: ['Free', 'Paid'], default: 'Free' },
  planId: {
    type: String,
    enum: [
      'freeUsers', 'individual', 'individualMonthly', 'individualAnnually',
      'businessMonthly', 'businessAnnually', 'trial', 'starter', ''
    ],
    default: null
  },
  gstin: { type: String, default: '' },
  pan: { type: String, default: '' },
  orgProfile: { type: String, default: null },
  telephoneNo: { type: String, default: '' },
  alternetemail: { type: String, default: '' },
  alternativePhone: { type: String, default: '' },
  websiteUrl: { type: String, default: '' },
  logo: { type: String, default: '' },
  companyCertificate: { type: String, default: '' },
  textile_certificate: { type: String, default: '' },
  panCard: { type: String, default: '' },
  gstCertificate: { type: String, default: '' },
  deleted: { type: String, enum: ['N', 'Y'], default: 'N' },
  createdBy: Number,
  callingPin: Number,
  createdDate: { type: Date, default: Date.now },
  updatedBy: Number,
  updatedDate: { type: String, default: null },
  planchooseDate: { type: Date, default: null },
  planupgradeDate: { type: Date, default: null },
  dnd: { type: String, enum: ['Y', 'N'], default: 'N' },
  marketing: { type: String, enum: ['N', 'Y'], default: 'N' },
  est_year: { type: String, default: null },
  total_emp: { type: String, default: null },
  supplier: { type: String, default: null },
  supplier_type: { type: String, enum: ['B', 'S', 'BOTH', ''], default: null },
  video_1: { type: String, default: null },
  video_2: { type: String, default: null },
  video_3: { type: String, default: null },
  isFeatured: { type: String, enum: ['Y', 'N'], default: 'N' },
  stage: { type: Number, default: 3 }
}, { timestamps: true });

export default mongoose.models.Organization || mongoose.model("Organization", OrganizationSchema);
