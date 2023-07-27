import { isValidObjectId } from "mongoose";


export async function isIdValid(req, res, next) {
	let id = req.params.id || req.body.id;
	id = id.trim();
	if(!isValidObjectId(id)) {
		return res.status(200).json(
      {
				status:"failed", 
				error: "Invalid Object ID passed"
      }
		)
	}
	next()
}