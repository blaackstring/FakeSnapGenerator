import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
export const authmiddleware=async(req,res,next)=>{

try {
    const token=req.cookies.token;
    console.log(token);
    

    const decode=jwt.verify(token,process.env.JWT_SECRET);

    if(!decode) return res.status(403).send({
        success:false,
        message:"lacks valid authentication credentials."
    })

    const logged_user=await User.findById(decode.id,{password:0});
    if(!logged_user) return res.status(404).json({ message:  `User not found` });

    req.user=logged_user;
    next();
  
    
} catch (error) {
    res.status(401).send({
        success:false,
        message:"Authentification Failed"
    })
}
}