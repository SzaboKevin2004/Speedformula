import jwt from 'jsonwebtoken';
import Poszt from "../models/Poszt.Modell.js";
import Felhasználó from "../models/Felhasználó.Modell.js";

export default{
    CikkPut:async function (req, res) {
        const token = req.headers.authorization?.split(' ')[1];
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            if(!req.body.szoveg){
                return res.status(400).json({ error: true, message: "Minden mező kötelező!" });
            }
            const poszt = await Poszt.build({
                user_id:felhasználó.id,
                cim:req.body.cim||"",
                body:req.body.szoveg||null,
                kep:"",
                video:""
            })
            poszt.save();
            return res.status(201).json({
                error: false,
                message: "Poszt sikeresen hozzáadva!",
            }); 
        } catch (error) {
            // Hibakezelés
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ error: true, message: "Lejárt a token!" });
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ error: true, message: "Érvénytelen token!" });
            } else {
                console.error("Hiba történt:", error);
                return res.status(500).json({ error: true, message: "Szerver hiba!" });
            }
        }
    },
    KepesPut:async function (req, res) {
        const token = req.headers.authorization?.split(' ')[1];
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            if(!req.body.kep||!req.body.video){
                return res.status(400).json({ error: true, message: "Minden mező kötelező!" });
            }
            const poszt = await Poszt.build({
                user_id:felhasználó.id,
                cim:req.body.cim||"",
                body:null,
                kep:req.body.kep||null,
                video:req.body.video||null
            })
            poszt.save();
            return res.status(201).json({
                error: false,
                message: "Poszt sikeresen hozzáadva!",
            }); 
        } catch (error) {
            // Hibakezelés
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ error: true, message: "Lejárt a token!" });
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ error: true, message: "Érvénytelen token!" });
            } else {
                console.error("Hiba történt:", error);
                return res.status(500).json({ error: true, message: "Szerver hiba!" });
            }
        }
    },
    KommentPut:async function (req, res){ 
        return res.status(501);
    },
    PosztGet:async function (req, res){
        try{
            const forumposzt=await Poszt.findAll({order:[['createdAt','ASC']],include:[{model:Felhasználó,attributes:['felhasznalonev','kep']}]});
            const formazottChat=chat.map(message=>({
                id:message.id,
                cim:message.cim,
                szoveg:message.body,
                kep:message.kep,
                video:message.video,
                elkuldve:message.createdAt,
                felhasznalo:message.felhasználó.felhasznalonev,
                kep:message.felhasználó.kep

            }))
            return res.status(200).json(formazottChat);
        }catch(err){
            console.error(err);
            return res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        };     
    },
    PosztPatch:async function (req, res){
        return res.status(501);
    },
    KommentPatch:async function (req, res){
        return res.status(501);
    },
    PosztDelete:async function (req, res){
        return res.status(501);
    },
    KommentDelete:async function (req, res){
        return res.status(501);
    },
    KedvelesPatch:async function (req, res){
        return res.status(501);
    }
};