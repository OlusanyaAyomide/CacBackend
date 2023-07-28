import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    isAdmin:{type:Boolean}
    },
    {
    timestamps: { createdAt: true, updatedAt: false }
})


userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.checkPassword = async function (
    inputpassword,
    hashedpassword
) {
    const isCorrect = await bcrypt.compare(inputpassword, hashedpassword);
    return isCorrect;
};

export const CacUser = mongoose.model("cacuser", userSchema);