import { CacUser } from "../models/userModel.js";
import catchAsync from "../utils/globalerr.js";
import { JWTSECRET } from "./constants.js";
import jwt from "jsonwebtoken";

export const createNewUser = catchAsync(async (req, res, next) => {
    const user = await CacUser.create(req.body);
    return res.status(200).json({
      status:"success",
      user
    })
    
});

export const LogInUser = catchAsync(async (req,res,next)=>{
  const {email,password} = req.body
  if (!email || !password) {
    return res.status(400).json({error:"Email or password field missing"});
  }
  const user = await CacUser.findOne({ email }).select("+password");
  const isPasswordCorrect = await user?.checkPassword(password, user.password);
  if (!user || !isPasswordCorrect) {
    return res.status(400).json({
      status:"fail",error:"Username or password incorrect"
    });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWTSECRET,
    {
      expiresIn:"90d",
    }
  );
  res.status(200).json({
    status: "success",
    token,
    user:user
  });

})

export const GetUserProfile = catchAsync(async(req,res,next)=>{
  const user = await CacUser.findById(req.user.id).select("-password -__v")
  return res.status(200).json({user})
})

export const GetAllUsers = catchAsync(async(req,res,next)=>{
  const user = await CacUser.find({}).select("-password")
  return res.status(200).json({user})
})

export const Deleteusers= catchAsync(async(req,res,next)=>{
  const user = await CacUser.findById(req.params.id)
  if(!user){return res.status(400).json({error:"User does not exist"})}
  const deleted =await CacUser.findByIdAndDelete(user._id)
  return res.status(201).json({status:"success"})
})