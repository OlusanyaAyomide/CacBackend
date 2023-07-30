import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import { CacUser } from "../models/userModel.js";
import catchAsync from "../utils/globalerr.js";
import { JWTSECRET } from "./constants.js";
import jwt from "jsonwebtoken";

export const createNewUser = catchAsync(async (req, res, next) => {
    const {name,email}= req.body
    const existed = await CacUser.findOne({name,email})
    if (existed){
      return res.status(400).json({
        status:"fail",
        error:"User already exist"
      })
    }
    const user = await CacUser.create(req.body);
    return res.status(200).json({
      status:"success",
      user
    })
    
});

export const logInUser = catchAsync(async (req,res,next)=>{
  const email = req.body.email.trim(); // Trimming: minor sanitization
  const password = req.body.password.trim();

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      error:"Email or password field missing"
    });
  }

  // Try to find a user
  const user = await CacUser.findOne({ email }).select("+password");

  // If user not found
  if (!user) {
    return res.status(404).json({
      status:"fail",
      error:"User not found, try signing up "
    });
  }

  // check for password correctness
  const isPasswordCorrect = await user.checkPassword(password, user.password);

  // If password is wrong
  if (!isPasswordCorrect) {
    return res.status(400).json({
      status:"fail",
      error:"Incorrect password provided"
    });
  }

  // Sign the JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWTSECRET,
    { expiresIn:"7d" } // changed from 90d to 7d
  );

  // Return token on successful process
  res.status(200).json({
    status: "success",
    token,
    user:user
  });

})

export const getUserProfile = catchAsync(async(req,res,next)=>{
  const user = await CacUser.findById(req.user.id).select("-password -__v")
  return res.status(200).json({user})
})

export const getAllUsers = catchAsync(async(req,res,next)=>{
  const user = await CacUser.find({}).select("-password")
  return res.status(200).json({user})
})

export const deleteUsers= catchAsync(async(req,res,next)=>{
  // Attempt a deletion
  const deleted = await CacUser.findByIdAndDelete(req.body._id);
  // If the deletion failed
  if (!deleted) {
    return res.status(404).json({
      status:"error",
      error: "User not found in database"
    })
  }

  // Everything Successful
  return res.status(200).json({
    status:"success"
  })
})

export const updateAdmin =  catchAsync(async(req,res,next)=>{
  const {isAdmin,_id} = req.body
  const user = await CacUser.findByIdAndUpdate(_id,{isAdmin})
  if(user){
    return res.status(200).json(
      {status:"success"}
    )
  }

})