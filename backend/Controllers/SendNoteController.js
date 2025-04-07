import { Notes } from "../models/notes.model.js";

export const SendNote=async(req,res)=>{
    try {
        const note=req.body.data;
        const {title,description}=note;

        if(!note.title||!note.description) return res.status(400).send({success:false,message:"Please provide note details"});

      const newNote=new Notes({
          userid:req.user._id,
          title,
          description
      })

      await newNote.save();
      return res.status(200).send({
          success:true,
          message:"Note send Successfull",
          note:newNote
      })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Note send Unsuccessful",
        })
    }
}