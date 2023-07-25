import catchAsync from "../utils/globalerr.js";
import { Field } from "../models/FieldModel.js";
import { Business } from "../models/businessModel.js";
import { Info } from "../models/infoModel.js";


export const postField = catchAsync(async(req,res,next)=>{

   const infos =await Info.insertMany(req.body.business.info)
   const info = infos.map((item)=>{return item._id})
   const newbusiness=await Business.create({...req.body.business,info})
   const newField = await Field.create({...req.body,business:newbusiness._id})
   return res.status(200).json({
      status:'success',
      data:newField
   })
})

export const getFields = catchAsync(async(req,res,next)=>{

   const allPost = await Field.find({})
   return res.status(200).json({
      status:"success",
      data:allPost
   })
})


export const findField = catchAsync(async(req,res,next)=>{
   const field = await Field.findById(req.params.id)
   return res.status(200).json(
      {
         status:"success",
         data:field   
      }
   )
})

export const updateStatus = catchAsync(async(req,res,next)=>{
   const field = await Field.findByIdAndUpdate(req.params.id,{status:req.body.status})
   return res.status(200).json(
      {
         status:"sucess",
         data:field
      }
   )
})

export const updateAllField = catchAsync(async(req,res,next)=>{
   const bulkUpdateQuery = req.body.business.info.map(({_id,...rest})=>({
      updateOne:{
         filter: { _id }, 
         update: { $set: rest }
      }
      }
   ))
   const updatedinfo = await Info.bulkWrite(bulkUpdateQuery)
   console.log("info updated",updatedinfo)
   const onlybusiness = {...req.body.business}
   delete onlybusiness['info']
   const updatedBusiness = await Business.findByIdAndUpdate(req.body.business._id,onlybusiness)
   console.log("Busines updated",onlybusiness)
   const onlyfield = {...req.body}
   delete onlyfield['business']
   const newfield = await Field.findByIdAndUpdate(req.body._id,onlyfield)
   const newdata = await Field.findById(req.body._id)
   return res.status(200).json({
      status:"success",
      data:newdata
   })
})


export const postCacEntry = catchAsync(async(req,res,next)=>{
   // const newEntry = await cacPost.create(req.body)
   // return res.status(200).json({status:"success",entry:newEntry})
})

export const getAllPostCac = catchAsync(async(req,res,next)=>{
   // const features = new ApiFeatures(cacPost.find({}),req.query)
   // .filtering()
   // .sorting()
   // .limiting()
   // .paginating()

   // const allPostcac =   await features.query
   // res.status(200).json({
   //    status: "success",
   //    length: allPostcac.length,
   //    entry:allPostcac,
   //  });
})


