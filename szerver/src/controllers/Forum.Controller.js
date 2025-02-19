import jwt from 'jsonwebtoken';
import Poszt from "../models/Poszt.Modell.js";
import Felhasználó from "../models/Felhasználó.Modell.js";
import Komment from '../models/Komment.Modell.js';
import { where } from 'sequelize';
import { Where } from 'sequelize/lib/utils';

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
                kep:null,
                video:null
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
            if(!req.body.kep && !req.body.video){
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
    PosztGet:async function (req, res){
        try{
            const forumposzt=await Poszt.findAll({order:[['createdAt','ASC']],include:[{model:Felhasználó,attributes:['felhasznalonev','kep']}]});
            const formazottPoszt=forumposzt.map(message=>({
                id:message.id,
                cim:message.cim,
                szoveg:message.body,
                kep:message.kep,
                video:message.video,
                elkuldve:message.createdAt,
                felhasznalo:message.felhasználó.felhasznalonev,
                fkep:message.felhasználó.kep

            }))
            return res.status(200).json(formazottPoszt);
        }catch(err){
            console.error(err);
            return res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        };     
    },
    PosztKommentPut:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const posztid=req.body.posztid;
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const poszt = await Poszt.findByPk(posztid);
            if(!poszt){
                return res.status(404).json({ error: true, message: "A poszt nem található!" });
            }
            if(!req.body.szoveg){
                return res.status(400).json({ error: true, message: "Minden mező kötelező!" });
            }
            const Posztkomment=await Komment.build({
                szint:0,
                poszt_id:posztid,
                user_id:felhasználó.id,
                komment:req.body.szoveg,
                kommentszulo_id:null
            });
            await Posztkomment.save();
            return res.status(201).json({
                error: false,
                message: "Komment sikeresen hozzáadva!",
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
    KommentKommentPut:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const kommentid=req.body.kommentid;
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const kommentk= await Komment.findByPk(kommentid);
            if(!kommentk){
                return res.status(404).json({ error: true, message: "A komment nem található!" });
            }
            const előzőkomment=await Komment.findByPk(kommentid);
            const újszint= előzőkomment !==null ? előzőkomment.szint+1 : 0;
            const Kommentkomment=await Komment.build({
                szint:újszint,
                poszt_id:előzőkomment.poszt_id,
                user_id:felhasználó.id,
                komment:req.body.szoveg,
                kommentszulo_id:kommentid
            });
            await Kommentkomment.save();
            return res.status(201).json({
                error: false,
                message: "Komment sikeresen hozzáadva!",
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
    KommentGet:async function (req, res){
        try {
            const posztid=req.body.posztid;
            const pkomment=await Poszt.findByPk(posztid)
            if(!pkomment){
                return res.status(404).json({ error: true, message: "A poszt nem található!" });
            }
            const formazottKomment=await Komment.findAll({
                where:{poszt_id:posztid},
                order:[['createdAt','ASC']],
                include:[{model:Felhasználó,attributes:['felhasznalonev','kep']}]
            });
            const kommentek=formazottKomment.map(komment=>({
                id:komment.id,
                szoveg:komment.komment,
                elkuldve:komment.createdAt,
                felhasznalo:komment.felhasználó.felhasznalonev,
                fkep:komment.felhasználó.kep,
                szint:komment.szint,
                kommentszulo:komment.kommentszulo_id
            }))
            return res.status(200).json(kommentek);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        }
    },
    PosztPatch:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const posztid=req.body.posztid;
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const posztk= await Poszt.findByPk(posztid);
            if(!posztk){
                return res.status(404).json({ error: true, message: "A poszt nem található!" });
            }
            const változás = {};
            if(req.body.cim!==undefined && req.body.cim.trim()!==""){
                változás.cim=req.body.cim.trim();
            }
            if(req.body.body!==undefined && req.body.body.trim()!==""){
                változás.body=req.body.body.trim();
            }
            if(req.body.kep!==undefined && req.body.kep.trim()!==""){
                változás.kep=req.body.kep.trim();
            }
            if(req.body.video!==undefined && req.body.video.trim()!==""){
                változás.video=req.body.video.trim();
            }

            await Poszt.update(változás,{where:{id:posztid}});
            return res.status(200).json({
                error: false,
                message: "Poszt sikeresen módosítva!",
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
    KommentPatch:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const kommentid=req.body.kommentid;
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const kommentk= await Komment.findByPk(kommentid);
            if(!kommentk){
                return res.status(404).json({ error: true, message: "A komment nem található!" });
            }
            const változás = {};
            if(req.body.cim!==undefined && req.body.cim.trim()!==""){
                változás.cim=req.body.cim.trim();
            }
            if(req.body.szoveg!==undefined && req.body.szoveg.trim()!==""){
                változás.szoveg=req.body.szoveg.trim();
            }
            await Komment.update(változás,{where:{id:kommentid}});
            return res.status(200).json({
                error: false,
                message: "Komment sikeresen módosítva!",
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
    PosztDelete:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const posztid=req.body.posztid;
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const posztk= await Poszt.findByPk(posztid);
            if(!posztk){
                return res.status(404).json({ error: true, message: "A poszt nem található!" });
            }
            if((felhasználó.id=== posztk.user_id)||(felhasználó.szerep_id===1)){
                await Komment.destroy({ where:{poszt_id:posztid}}); 
                await posztk.destroy();
                return res.status(200).json({
                    error: false,
                    message: "Poszt sikeresen törölve!",
                });
            }
           
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
    KommentDelete:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const kommentid=req.body.kommentid;
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const kommentk= await Komment.findByPk(kommentid);
            if(!kommentk){
                return res.status(404).json({ error: true, message: "A komment nem található!" });
            }
            if((felhasználó.id=== kommentk.user_id)||(felhasználó.szerep_id===1)){
                await kommentk.destroy();
                return res.status(200).json({
                    error: false,
                    message: "Komment sikeresen törölve!",
                });
            }
           
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
};