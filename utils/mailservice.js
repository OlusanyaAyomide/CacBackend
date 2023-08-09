import nodemailer from "nodemailer"
import { preString } from "./preTemplate.js"
import { Field } from "../models/FieldModel.js"


const transporter = nodemailer.createTransport({
    service: "gmail", 
    host: "smtp.gmail.com",
    port:587,
    secure: false,
    auth:{
        user:"ayomideflex72@gmail.com",
        pass:"juvguylsrlkxhuww"
    }
})

export const mailSender = async (body)=>{
    const allfile =await Field.findById(body._id)
    try{
        const mailbody = await preString(allfile)
        const mailsender = await transporter.sendMail({
            from:"ayomideflex72@gmail.com",
            to:body.email,
            subject:"JohnWell Cac form",
            html:mailbody
        })
        console.log(mailsender.messageId)
    }
    catch(err){
        console.log(err)
    }

}