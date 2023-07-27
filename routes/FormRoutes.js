import express from "express";
import { postField ,getFields, postCacEntry, getAllPostCac, updateStatus, updateAllField} from "../controllers/formController.js";
import { Basevalidator,postCacValidation, updateStatusValidation, validateNewUser } from "../validation/formValidator.js";
import { findField } from "../controllers/formController.js";
import { getAdminDetails } from "../controllers/middlewares/Checkuser.js";
import { Deleteusers, GetAllUsers, GetUserProfile, LogInUser, createNewUser } from "../controllers/userController.js";
import { IsAuthenticated } from "../controllers/middlewares/Checkuser.js";

const formrouter = express.Router();
formrouter.route("/pre").post(Basevalidator,postField) 
formrouter.route("/pre").get(IsAuthenticated,getFields) 
formrouter.route("/pre/:id").get(IsAuthenticated,findField)
formrouter.route("/prestatusupdate/:id").post(getAdminDetails,updateStatusValidation,updateStatus)
formrouter.route("/preupdate").post(getAdminDetails,updateAllField)
formrouter.route("/post").post(postCacValidation,postCacEntry)
formrouter.route("/post").get(IsAuthenticated,getAllPostCac)
formrouter.route("/user/new").post(getAdminDetails,validateNewUser,createNewUser)
formrouter.route("/user/signin").post(LogInUser)
formrouter.route("/user/profile").get(IsAuthenticated,GetUserProfile)
formrouter.route("/user/all").get(getAdminDetails,GetAllUsers)
formrouter.route("/user/delete/:id").post(getAdminDetails,Deleteusers)

export default formrouter