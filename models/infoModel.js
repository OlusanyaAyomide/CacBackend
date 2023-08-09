import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    passport: { type: String },
    signature: { type: String },
    userid: { type: String },
    shares: { type: String },
    city: { type: String },
    state:{type:String},
    officeNumber:{type:String},
    officeStreet:{type:String},
    dateOfBirth:{type:Date}
});


infoSchema.pre(/^find/,function(next){
    this.select("-__v")
    next()
})


  
export const Info = mongoose.model("info",infoSchema)
