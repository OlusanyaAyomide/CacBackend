import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    zipcode: { type: String },
    passport: { type: String },
    signature: { type: String },
    userid: { type: String },
    shares: { type: String },
});


infoSchema.pre(/^find/,function(next){
    this.select("-__v")
    next()
})


  
export const Info = mongoose.model("info",infoSchema)
