import catchAsync from "../utils/globalerr.js";
import { Field } from "../models/FieldModel.js";
import { Business } from "../models/businessModel.js";
import { Info } from "../models/infoModel.js";
import { cacPost } from "../models/cacModel.js";

export const postField = catchAsync(async(req,res,next)=>{
	console.log("Innn hereeee")
	const infos = await Info.insertMany(req.body.business.info)
	const info = infos.map((item)=>{return item._id})
	const newBusiness = await Business.create({...req.body.business,info})
	const newField = await Field.create({
		...req.body,
		business:newBusiness._id
	})
	return res.status(200).json({
		status:'success',
		data:newField
	})
})

export const getFields = catchAsync(async(req,res,next)=>{
	const getTimeAgo = (number)=>{
		const TimeAgo = new Date()
		return TimeAgo.setDate(TimeAgo.getDate()-number)
	}

const { status, duration,page,limit } = req.query;
	
	const filter = {};
	const userpage = page?page:1
	const pagelimit = limit?limit:10
	if (status) {
      filter.status = status;
	}



	if (duration) {
      const currentDate = new Date();
      // Changed from if-else to "switch-case"
      switch (duration) {
				case "week":
					const oneWeekAgo = getTimeAgo(7)
					filter.createdAt = { $gte: oneWeekAgo, $lte: currentDate };
					break;
				case "month":
					const oneMonthAgo = getTimeAgo(7)
					filter.createdAt = { $gte: oneMonthAgo, $lte: currentDate };
					break;
      }
	}

   // Get the count of all fields
   const all = await Field.find({}).count() // Get the count of all fields
   const currentDate = new Date(); // Get current date
   const sevenDaysAgo = getTimeAgo(7) // Get seven days ago
   const week = await Field.find({ createdAt: { $gte: sevenDaysAgo, $lte: currentDate } }).count() // Get all created between now and seven days ago
   const monthAgo = getTimeAgo(31) // Get one month ago
   const month = await Field.find({ createdAt: { $gte: monthAgo, $lte: currentDate } }).count() // Get all created between now and one month ago

   // Define the filter
	const entrystatus = await Field.aggregate([
      {
				$group:{
            _id:"$status",
            count:{
							$sum:1
            }
				}
      }
	])



   // Filter the result
	const allPost = await Field.find(filter).limit(pagelimit).skip((userpage*pagelimit)-pagelimit)
	const totalPage = Math.ceil(all/pagelimit)

   // Return the final filtered result
	return res.status(200).json({
		status:"success",  
		length:allPost.length,
		page:userpage,
		total:totalPage,
		timeLine:{week,month,all},
		entrystatus,
		data:allPost
	})
})


export const findField = catchAsync(async(req,res,next)=>{

   // Find field
	const field = await Field.findById(req.params.id)

   // If no fields found
	if (!field) {
      return res.status(404).json(
				{
            status:"failed",
            message: "Field not found"  
				}
      )

	}
	return res.status(200).json(
      {
				status:"success",
				data:field   
      }
	)
})

export const updateStatus = catchAsync(async(req,res,next)=>{
	let status = req.body.status.trim();

	const field = await Field.findByIdAndUpdate(req.params.id,{status:req.body.status})
	return res.status(200).json(
      {
				status:"success", 
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
	const onlybusiness = {...req.body.business}
	delete onlybusiness['info']
	const updatedBusiness = await Business.findByIdAndUpdate(req.body.business._id,onlybusiness)
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
	const newEntry = await cacPost.create(req.body)
	return res.status(200).json({status:"success",entry:newEntry})
})

export const getAllPostCac = catchAsync(async(req,res,next)=>{
	const getTimeAgo = (number)=>{
	const TimeAgo = new Date()
	return TimeAgo.setDate(TimeAgo.getDate()-number)
	}

	const { status, duration,page,limit } = req.query;
	
	const filter = {};
	const userpage = page?page:1
	const pagelimit = limit?limit:10



	if (duration) {
      const currentDate = new Date();
      if (duration === 'week') {
				const oneWeekAgo = getTimeAgo(7)
				filter.createdAt = { $gte: oneWeekAgo, $lte: currentDate };
      } else if (duration === 'month') {
				const oneMonthAgo = getTimeAgo(31)
				filter.createdAt = { $gte: oneMonthAgo, $lte: currentDate };
      }
	}

	const all = await cacPost.find({}).count()
	const currentDate = new Date();
	const sevenDaysAgo = getTimeAgo(7)
	const week =await  cacPost.find({ createdAt: { $gte: sevenDaysAgo, $lte: currentDate } }).count()
	const monthAgo = getTimeAgo(31)
	const month = await cacPost.find({ createdAt: { $gte: monthAgo, $lte: currentDate } }).count()
	const allPost = await cacPost.find(filter).limit(pagelimit).skip((userpage*pagelimit)-pagelimit)
	const totalPage = Math.ceil(all/pagelimit)

	return res.status(200).json({
		status:"success",
		length:allPost.length,
		page:userpage,
		total:totalPage,
		timeLine:{week,month,all},
		data:allPost
	})
})



export const getAllCac = catchAsync(async(req, res, next) => {
	// Check if a valid search term was passed
	if (!req.query.search_term) {
		return res.status(400).json({
			message: "Invalid search term provided"
		})
	}

	// Trim the search term
  const term = req.query.search_term.trim();
	// Change into a global, case-insensitive regex
	const regex = new RegExp(`${term}`, 'gi');

	// Get all businesses matching regex and return array of id objects
	let businesses = await Business.find({ $or: [{"companyName1": {"$regex": regex}}, {"companyName2": {"$regex": regex}}]}, {_id: 1, info:0})
	// map to only ID
	businesses = businesses.map(elem => elem._id)
	// Convert to set and back to array to remove duplicates
	businesses = [...(new Set(businesses))]

	// Find all fields with businesses matching at least one element in the businesses array
	const fields = await Field.find({"business": {$in: businesses}});

	// Get all corresponding CAC POST Models
	let postCAC = await cacPost.find({$or: [{"firstName": {"$regex": regex}}, {"lastName": {"$regex": regex}}, {"description": {"$regex": regex}}]})

	// Send successful response
	return res.status(200).json({
		message: "Businesses retreived",
		data: {
			fields,
			postCAC
		}
	})

})


