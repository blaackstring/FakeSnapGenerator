import mongoose from "mongoose";

console.log(process.env.MONGODB_URL,process.env.MONGODB_NAME);


export const  DbConnect=async()=>{
 try {
    const connect= await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
    console.log("MongoDB connected successfully")
    return true;
 } catch (error) {
    console.error("MongoDB connection failed",error)
    return false;
}
}