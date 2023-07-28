import express from "express";
import { validateNewUser } from "../validation/formValidator.js";
import { getAdminDetails } from "../middlewares/Checkuser.js";
import { deleteUsers, getAllUsers, getUserProfile, logInUser, createNewUser} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/Checkuser.js";

const authRoutes = express.Router();

authRoutes.route("/new").post(validateNewUser, createNewUser)
authRoutes.route("/signin").post(logInUser)
authRoutes.route("/profile").get(isAuthenticated, getUserProfile)
authRoutes.route("/all").get(getAdminDetails, getAllUsers)
authRoutes.route("/delete/:id").post(getAdminDetails, deleteUsers)

export default authRoutes;