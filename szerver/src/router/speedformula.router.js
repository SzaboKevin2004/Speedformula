import { Router } from "express";
import UserKezelésController from "../controllers/UserKezelés.Controller.js";
import ApikController from "../controllers/Apik.Controller.js";
import ChatController from "../controllers/Chat.Controller.js";
import VisszajelzesController from "../controllers/Visszajelzes.Controller.js";
import EloController from "../controllers/Elo.Controller.js";
import ForumController from "../controllers/Forum.Controller.js";

const router = Router();

router.post("/regist",UserKezelésController.RegisztracioPostController);
router.post("/login",UserKezelésController.LoginPostController);
router.post("/logout",UserKezelésController.LogoutPostController);



router.get("/hirek", ApikController.HírekGetController);
router.get("/csapatok", ApikController.CsapatokGetController);
router.get("/versenyzok", ApikController.VersenyzőkGetController);


router.get("/profil", UserKezelésController.ProfilGetController);
router.get("/profil/:id", UserKezelésController.MásikProfilGetControler);
router.patch("/profil", UserKezelésController.ProfilePatchController);
router.delete("/profil", UserKezelésController.ProfilDeleteController);

router.get("/elo",EloController.EloGet);
router.post("/chat", ChatController.ChatPost);
router.get("/chat", ChatController.ChatGet);
router.delete("/chat/:id",ChatController.ChatIdDelete);
router.delete("/chat", ChatController.ChatDeleteAll);

router.post("/visszajelzes", VisszajelzesController.VisszajelzesPostController);

router.put("/forum", ForumController.PosztPut);

export default router;