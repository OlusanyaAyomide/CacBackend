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
    },
    {
      timestamps: { createdAt: true, updatedAt: false }
    }
);

cacPostSchema.pre(/^find/,function(next){
    this.select("-__v").sort({
    createdAt: -1
    })
    next()
})

export const cacPost = mongoose.model("cacpost",cacPostSchema)
