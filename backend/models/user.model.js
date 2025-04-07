import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({ 
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    }
  
});





 const User= mongoose.model("User",UserSchema);
export default User;