import mongoose from "mongoose";


const fieldSchema = new mongoose.Schema({
    activationKey:{ type:String,required:[true, "key is required"]},
    firstName:{ type:String,required:[true, "FirstName is required"]},
    surName:{ type:String,required:[true, "surName is required"]},
    middleName:{ type:String},
    email:{ type:String,required:[true, "email is required"]},
    phone:{ type:String,required:[true, "Phone is required"]},
    city:{ type:String,required:[true, "City is required"]},
    state:{type:String},
    streetName:{type:String},
    dateOfBirth:{ type:Date,required:[true, "Date of birth is required"]},
    userid:{type:String},
    houseNumber:{type:String},
    passport:{type:String},
    signature:{type:String},
    shares:{type:String},
    status:{
        type:String,
        enum:['active', 'completed', 'pending'],
        default:"active"
    },
    business:{ type: mongoose.Schema.Types.ObjectId, ref: 'business'}
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
)


fieldSchema.pre(/^find/,function(next){
    this.select("-__v")
    next()
})

fieldSchema.pre(/^find/, function () {
    this.select("-__v").populate({
      path: "business",
      select: "-__v",
    }).sort({
      createdAt: -1
    })
    ;
});

fieldSchema.post(/^find/,function (){
  this.populate({
    path:"business"
  })
})



  
export const Field = mongoose.model("fields",fieldSchema)