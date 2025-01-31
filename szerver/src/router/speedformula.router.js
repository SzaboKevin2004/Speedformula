import { Router } from "express";
import UserKezelésController from "../controllers/UserKezelés.Controller.js";
import ApikController from "../controllers/Apik.Controller.js";
import ChatController from "../controllers/Chat.Controller.js";

const router = Router();

router.post("/regist",UserKezelésController.RegisztracioPostController);
router.post("/login",UserKezelésController.LoginPostController);
router.post("/logout",UserKezelésController.LogoutPostController);



router.get("/hirek", ApikController.HírekGetController);
router.get("/csapatok", ApikController.CsapatokGetController);
router.get("/versenyzok", ApikController.VersenyzőkGetController);


router.get("/profil", UserKezelésController.ProfilGetController);
router.patch("/profil", UserKezelésController.ProfilePatchController);
router.delete("/profil", UserKezelésController.ProfilDeleteController);

router.put("/chat", ChatController.ChatPut);
router.get("/chat", ChatController.ChatGet);
router.delete("/chat", ChatController.ChatDeleteAll);

export default router;