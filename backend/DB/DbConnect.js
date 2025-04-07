import mongoose from "mongoose";



export const  DbConnect=async()=>{
 try {
    const connect=mongoose.connect(`${process.env.MONGODB_URL}//${process.env.MONGODB_NAME}`)
    console.log("MongoDB connected successfully")
    return true;
 } catch (error) {
    console.error("MongoDB connection failed",error)
    return false;
}
}