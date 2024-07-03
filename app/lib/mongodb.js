// db.js
"use server"
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB
