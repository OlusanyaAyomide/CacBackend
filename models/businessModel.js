import mongoose from "mongoose";


const businessSchema = new mongoose.Schema({
    companyName1:{type:String},
    companyName2:{type:String},
    companyName3:{type:String},
    businessType:{type:String},
    ngoType:{type:String},
    companyDescription:{type:String},
    info:[{ type: mongoose.Schema.Types.ObjectId, ref:'info'}]
})


businessSchema.pre("find",function(next){
    this.select("-__v").populate({
        path:"info"   
    })
    next()
})
businessSchema.pre(/^find/,function(next){
    this.select("-__v")
    next()
})



export const Business = mongoose.model("business",businessSchema)
