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
router.post("/ujToken", UserKezelésController.ujtokenGeneralasPost);
router.post("/logout",UserKezelésController.LogoutPostController);



router.get("/hirek", ApikController.HírekGetController);
router.get("/csapatok", ApikController.CsapatokGetController);
router.get("/versenyzok", ApikController.VersenyzőkGetController);


router.get("/profil", UserKezelésController.ProfilGetController);
router.get("/profil/:felhasznalonev", UserKezelésController.MásikProfilGetControler);
router.patch("/profil", UserKezelésController.ProfilePatchController);
router.patch("/profil/profilkep", UserKezelésController.ProfilképPatchController);
router.delete("/profil", UserKezelésController.ProfilDeleteController);
router.delete("/profil/:felhasznalonev", UserKezelésController.ProfilIdDeleteController);


router.get("/elo",EloController.EloGet);
router.post("/chat", ChatController.ChatPost);
router.get("/chat", ChatController.ChatGet);
router.delete("/chat/:id",ChatController.ChatIdDelete);
router.delete("/chat", ChatController.ChatDeleteAll);


router.post("/visszajelzes", VisszajelzesController.VisszajelzesPostController);


router.put("/forum/cikk", ForumController.CikkPut);
router.get("/forum", ForumController.PosztGet);
router.get("/forum/:felhasznalonev", ForumController.PosztIdGet);
router.put("/forum/komment/poszt", ForumController.PosztKommentPut);
router.put("/forum/komment/komment", ForumController.KommentKommentPut);
router.get("/forum/komment/:id", ForumController.KommentGet);
router.delete("/forum/kommenttorles", ForumController.KommentDelete);
router.delete("/forum/poszttorles", ForumController.PosztDelete);
router.patch("/forum/posztkedveles/:id", ForumController.kedvelésPosztPatch);
router.patch("/forum/kommentkedveles/:id", ForumController.kedvelésKommentPatch);
router.patch("/forum/posztkikedveles/:id", ForumController.mégsekedvelésPosztPatch);
router.patch("/forum/kommentkikedveles/:id", ForumController.mégsekedvelésKommentPatch);


export default router;