import { Router } from "express";
import RegisztracioController from "../Controllers/Regisztracio.Controller.js";
import LoginController from "../Controllers/Login.Controller.js";
import LogoutController from "../Controllers/Logout.Controller.js";

const BejelentkezésRouter = Router();

BejelentkezésRouter.post("/register", RegisztracioController.RegisztracioPostController);
BejelentkezésRouter.post("/login", LoginController.LoginPostController);
BejelentkezésRouter.post("/logout", LogoutController.LogoutPostController);

export default BejelentkezésRouter;
