import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async() => {
    const mongoUrl = process.env.MONGODB_URL ;//;|| 'mongodb://localhost:27017/food-delivery';
    try {
        await mongoose.connect(mongoUrl);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
