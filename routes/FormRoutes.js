import express from "express";
import { postField ,getFields, postCacEntry, getAllPostCac, updateStatus, updateAllField, getAllCac, deleteField,getAllTax,postTax, allowHost} from "../controllers/formController.js";
import { baseValidator,postCacValidation, updateStatusValidation,taxvalidator} from "../validation/formValidator.js";
import { findField } from "../controllers/formController.js";
import { getAdminDetails } from "../middlewares/Checkuser.js";
import { isAuthenticated } from "../middlewares/Checkuser.js";
import { isIdValid } from "../utils/idValidityChecker.js";

const formrouter = express.Router();
formrouter.route("/pre").post(baseValidator, postField) 
formrouter.route("/pre").get(isAuthenticated, getFields) 
formrouter.route("/pre/:id").get(isAuthenticated, isIdValid, findField)
formrouter.route("/prestatusupdate/:id").post(getAdminDetails, isIdValid, updateStatusValidation, updateStatus)
formrouter.route("/preupdate").post(getAdminDetails, updateAllField)
formrouter.route("/post").post(postCacValidation, postCacEntry)
formrouter.route("/post").get(isAuthenticated, getAllPostCac)
formrouter.route("/getall").get(isAuthenticated, getAllCac)
formrouter.route("/predelete").post(getAdminDetails,deleteField)
formrouter.route("/tax").post(taxvalidator,postTax)
formrouter.route("/tax").get(isAuthenticated,getAllTax)
formrouter.route("").get(allowHost)

export default formrouter