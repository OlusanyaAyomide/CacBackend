import express from "express";
import { postField ,getFields, postCacEntry, getAllPostCac, updateStatus, updateAllField} from "../controllers/formController.js";
import { Basevalidator,postCacValidation, updateStatusValidation } from "../validation/formValidator.js";
import { findField } from "../controllers/formController.js";

const formrouter = express.Router();
console.log("here")
formrouter.route("/pre").post(Basevalidator,postField) 
formrouter.route("/pre").get(getFields) 
formrouter.route("/pre/:id").get(findField)
formrouter.route("/prestatusupdate/:id").post(updateStatusValidation,updateStatus)
formrouter.route("/preupdate").post(updateAllField)
// formrouter.route("/post").post(postCacValidation,postCacEntry)
// formrouter.route("/post").get(getAllPostCac)

export default formrouter