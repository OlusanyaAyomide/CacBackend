import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone:{type:String},
    email:{type:String},
    companyName:{type:String},
    BNNumber:{type:String},
    regDate:{type:Date},
    address:{type:String},
    activationKey:{type:String},

    },
    {
      timestamps: { createdAt: true, updatedAt: false }
    }
);

taxSchema.pre(/^find/,function(next){
    this.select("-__v").sort({
    createdAt: -1
    })
    next()
})

export const TaxModel = mongoose.model("taxmodel",taxSchema)

