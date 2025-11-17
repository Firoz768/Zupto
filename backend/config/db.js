import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Database Not Connected");
  }
};

export default connectDb;
