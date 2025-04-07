
import { Notes } from "../models/notes.model.js";
import User from "../models/user.model.js";

export const getAllNotes = async (req, res) => {

    try {
        const userid=req.params.id;


        if(!userid) return res.status(400).send({success:false,message:"Please provide user id"});

        const userAllMsgs=await Notes.findById(userid);
        if(!userAllMsgs) return res.status(400).send({success:false,message:"No notes found"});
        return res.status(200).send({
            success:true,
            message:"Get All Notes Successfull",
            notes:userAllMsgs
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Get All Notes Unsuccessful",
        })
        
    }

}