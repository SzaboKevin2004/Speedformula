
import { Router } from "express";
import RegisztracioController from "../Controllers/Regisztracio.Controller.js";
import LoginController from "../Controllers/Login.Controller.js";
import LogoutController from "../Controllers/Logout.Controller.js";
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const BejelentkezésRouter = Router();


BejelentkezésRouter.post("/register", RegisztracioController.RegisztracioPostController);
BejelentkezésRouter.post("/login", LoginController.LoginPostController);


BejelentkezésRouter.post("/logout", authMiddleware, LogoutController.LogoutPostController);

// BejelentkezésRouter.get("/profile", authMiddleware, ProfileController.getProfile);

export default BejelentkezésRouter;
