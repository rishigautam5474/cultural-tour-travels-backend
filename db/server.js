import mongoose from "mongoose";

async function connectionDb(uri) {
  return await mongoose.connect(uri);
}

export default connectionDb;
