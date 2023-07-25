import mongoose from "mongoose";

const cacPostSchema = new mongoose.Schema({
    firstName: { type: String },
    activationKey:{type:String},
    lastName: { type: String },
    description: { type: String },
    companyName:{type:String},
    files:[
        {type:String}
    ],
    createdAt:{
    type:Date,
    default:Date.now()
    },
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }

);

cacPostSchema.pre(/^find/,function(next){
    this.select("-__v")
    next()
})
  
export const cacPost = mongoose.model("cacpost",cacPostSchema)
