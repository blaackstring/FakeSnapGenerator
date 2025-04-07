import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer"

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: "Please provide email and password" });


        const user = await User.findOne({ email: email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const ispassmatch = await bcryptjs.compare(password, user.password);

        if (!ispassmatch) return res.status(400).json({ success: false, message: "Invalid Password" });

        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000 // 1 day 
        })
        return res.status(200).send({
            success: true,
            message: "Login Success",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },

        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Login Unsuccessful",
        })

    }
}



export const signup = async (req, res) => {
    try {

        const { email, password, username, gender } = req.body;
        console.log(email, password, username, gender);

        if (!email || !password || !username) return res.status(400).json({ success: false, message: "Please provide email, password and username" });

        const user = await User.findOne({ email: email, username: username });
        console.log(user);
        if (user) return res.status(201).json({
            success: false,
            message: "User already exists"
        })


        const hashPassword = await hashpass(password);
        const newUser = new User({
            username,
            email,
            gender,
            password: hashPassword
        })
        await newUser.save();
        return res.status(200).send({
            sucess: true,
            message: "User Signup Successfull",
            user: {
                _id: newUser._id,
                username: newUser.username,
                gender: newUser.gender,
                email: newUser.email
            }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Signup Unsuccessful",
        })

    }
}

export const checkSession = (req, res) => {
    try {
        console.log(req.user);
        if (!req.user) return res.status(401).json({ isAuthenticated: false });
        res.status(200).json({ isAuthenticated: true, User: req.user });
    } catch (error) {
        console.log(error)
        req.status(500).send({
            success: false,
            message: "Authentification Failed"
        })
    }
}
export const forgetPassword = async (req, res) => {
    try {
        let email = req.body.email;
        console.log(email);


        if (!email) return res.status(200).send({
            success: false,
            message: "mail not found"
        })

        const USER = await User.find({ email });

        if (!USER) return res.status(200).send({
            success: false,
            message: "User not found in Database"
        })

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "3m" })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.APP_MAIL,
                pass: process.env.APP_PASSWORD,
            },
        });



        const reciver = {
            from: process.env.APP_MAIL,
            to: email,
            subject: "Password Reset Request",
            html: `
        <p> Click the link below to proceed:</p>
        <p><a href="${process.env.FRONTEND_URL}/${token}" target="_blank" style="color: blue; text-decoration: underline;">
            Reset Your Password
        </a></p>
      `,
        }

        await transporter.sendMail(reciver)
        res.status(200).send({ success: true, message: "Reset link sent Successfully to your Gmail account" })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "unable to forget the password"
        })
    }
}
export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token.toString();
        const password = req.body.password
        console.log(token);
        console.log(password);

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) return res.status(403).json({success:false, message: "Invalid token" });

        console.log(decode);
        const email = decode.email;
        const user = await User.findOne({ email });
        const hashPassword = await hashpass(password);
        console.log(hashPassword, user);

        user.password = hashPassword;
        await user.save()

        res.status(200).send({ success: true, message: "Password reset Successfull" })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "unable to reset the password"
        })
    }
}

const hashpass = async (Password, salt_round = 10) => {
    return await bcryptjs.hash(Password, salt_round);
}


export const logout=(req,res)=>{
        res.clearCookie('token'); // If using cookies
        return res.status(200).json({ success:true,message: "Logged out successfully" });
    
}