import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host:'smtp.example.com',
    port:587,
    secure: false,
    auth:{
        user:"ayomideflex72@gmail.com",
        pass:"juvguylsrlkxhuww"
    }
})

export const mailSender = async (body)=>{
    const mailer = await transporter.sendMail()
    
}