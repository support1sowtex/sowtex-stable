// lib/getFullUserProfile.js
import connectToDatabase from "./dbConnect";
import User from "../app/Models/User"; // Adjust path as needed

// Function: Get full user profile
async function getFullUserProfile(userId) {
  await connectToDatabase();
  const user = await User.findOne({ id: userId });
  return user;
}

// Function: Get user's full name (for example)
async function getFullUserFullName(userId) {
  await connectToDatabase();
  const user = await User.findOne({ id: userId });
  return user?.fName + " " + user?.lName || null;
}

// Function: Get user's email
async function getFullUserEmail(userId) {
  await connectToDatabase();
  const user = await User.findOne({ id: userId });
  return user?.email || null;
}

// Named exports (optional if you prefer named import)
export {
  getFullUserProfile,
  getFullUserFullName,
  getFullUserEmail,
};

// Grouped export (default) for easier global access
const userHelpers = {
  getFullUserProfile,
  getFullUserFullName,
  getFullUserEmail,
};

export default userHelpers;
