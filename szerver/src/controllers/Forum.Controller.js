import jwt from 'jsonwebtoken';
import Poszt from "../models/Poszt.Modell.js";
import Felhasználó from "../models/Felhasználó.Modell.js";
import Komment from '../models/Komment.Modell.js';
import KedvencKomment from '../models/KommentKedvelések.Modell.js';
import KedvencPoszt from '../models/PosztKedvelések.js';
import Kedveltposzt from '../models/Kedvelések.Poszt.Modell.js';
import Kedveltkomment from '../models/Kedvelések.Komment.Modell.js';

export default{
    // Új cikk létrehozása
    CikkPut:async function (req, res) {
        const token = req.headers.authorization?.split(' ')[1];
        try {
            // Token dekódolása
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            
            // Felhasználó keresése az adatbázisban
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            };
            if(!req.body.szoveg &&!req.body.cim){
                return res.status(400).json({ error: true, message: "Minden mező kötelező!" });
            };

            // Új poszt létrehozása
            const poszt = await Poszt.create({
                user_id:felhasználó.id,
                cim:req.body.cim||"",
                body:req.body.szoveg||null,
                kep:null,
                video:null
            });
            await poszt.reload();
            await KedvencPoszt.create({
                poszt_id:poszt.id,
                kedveles:0,
                Megosztas:0
            });
            return res.status(201).json({
                error: false,
                message: "Poszt sikeresen hozzáadva!",  
            });
        } catch (error) {
            // Hibakezelés
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({
                    error: true,
                    message: "Lejárt a token!"
                });
            } else if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({
                    error: true,
                    message: "Érvénytelen token!"
                });
            } else {
                console.error("Hiba történt:", error);
                return res.status(500).json({
                    error: true,
                    message: "Szerver hiba!"
                });
            };
        };
    },
    // Posztok lekérése
    PosztGet:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        try{
            // Token dekódolása
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            
             // Posztok lekérése az adatbázisból
            const forumposzt=await Poszt.findAll({order:[['createdAt','DESC']],include:[{model:Felhasználó,attributes:['felhasznalonev','kep']},{model:KedvencPoszt,attributes:['kedveles']}]});
            const felhasználó = await Felhasználó.findByPk(dekódolt.id); 
            const posztokAdatok = await Promise.all(forumposzt.map(async function(message){
                const { count } = await Komment.findAndCountAll({ where: { poszt_id: message.id } });

                const vaneolyan=await Kedveltposzt.findOne({
                    where: {
                        poszt_id: message.id,
                        felhasznalo_id: felhasználó.id
                    }
                });
                
                return {
                    id: message.id,
                    cim: message.cim,
                    szoveg: message.body,
                    elkuldve: message.createdAt,
                    felhasznalo: message.felhasználó.felhasznalonev,
                    fkep: message.felhasználó.kep,
                    kedveles: message.kedvencposzt?.kedveles || 0,
                    kommentek: count,
                    kedvelte:vaneolyan!==null
                };
            }));
            return res.status(200).json(posztokAdatok);
        }catch(err){
            console.error(err);
            return res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        };     
    },
    // Posztok lekérése felhasználónév alapján
    PosztIdGet:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const felhasznalonev=req.params.felhasznalonev;
        try{
            // Token dekódolása
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            
            // Felhasználó keresése az adatbázisban
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            if(!felhasználó){
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }

            // Keresett felhasználó lekérése
            const keresettFelhasznalo = await Felhasználó.findOne({
                where: { felhasznalonev },
                attributes: ['id', 'felhasznalonev', 'kep']
            });
            if (!keresettFelhasznalo) {
                return res.status(404).json({ error: true, message: "A megadott felhasználónév nem létezik!" });
            }

            // Posztok lekérése az adott felhasználónév alapján
            const forumposzt=await Poszt.findAll( {where: { user_id: keresettFelhasznalo.id },order:[['createdAt','DESC']],include:[{model:Felhasználó,attributes:['felhasznalonev','kep']},{model:KedvencPoszt,attributes:['kedveles']}]});
            const posztokAdatok = await Promise.all(forumposzt.map(async (message) => {
                const { count } = await Komment.findAndCountAll({ where: { poszt_id: message.id } });
                const vaneolyan=await Kedveltposzt.findOne({
                    where: {
                        poszt_id: message.id,
                        felhasznalo_id: felhasználó.id
                    }
                });
                return {
                    id: message.id,
                    cim: message.cim,
                    szoveg: message.body,
                    elkuldve: message.createdAt,
                    felhasznalo: message.felhasználó.felhasznalonev,
                    fkep: message.felhasználó.kep,
                    kedveles: message.kedvencposzt?.kedveles || 0,
                    kommentek: count,
                    kedvelte:vaneolyan!==null
                };
            }));
            return res.status(200).json(posztokAdatok);
        }catch(err){
            //Hibakezelés
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "Adatbázis hiba történt!"
            });
        };     
    },
    // Új komment hozzáadása egy poszthoz
    PosztKommentPut:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const posztid=req.body.posztid;
        try {
            // Token dekódolása
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            
            // Felhasználó keresése az adatbázisban
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            };

            // Poszt keresése az adott id alapján
            const poszt = await Poszt.findByPk(posztid);
            if(!poszt){
                return res.status(404).json({ error: true, message: "A poszt nem található!" });
            };

            // Komment hozzáadás
            if(!req.body.szoveg){
                return res.status(400).json({ error: true, message: "Minden mező kötelező!" });
            };
            const posztkomment=await Komment.create({
                szint:0,
                poszt_id:poszt.id,
                user_id:felhasználó.id,
                komment:req.body.szoveg,
                kommentszulo_id:null
            });

            await posztkomment.reload();
            await KedvencKomment.create({
                komment_id:posztkomment.id,
                kedveles:0,
                Megosztas:0
            })
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
    // Új komment hozzáadása egy másik kommenthez
    KommentKommentPut:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        const kommentid=req.body.kommentid;
        try {
            // Token dekódolása
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);

            // Felhasználó keresése az adatbázisban
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            };

            // Komment keresése az adott id alapján
            const kommentk= await Komment.findByPk(kommentid);
            if(!kommentk){
                return res.status(404).json({ error: true, message: "A komment nem található!" });
            };
            // Komment hozzáadás
            const előzőkomment=await Komment.findByPk(kommentid);
            const újszint= előzőkomment !==null ? előzőkomment.szint+1 : 0;
            const Kommentkomment=await Komment.create({
                szint:újszint,
                poszt_id:előzőkomment.poszt_id,
                user_id:felhasználó.id,
                komment:req.body.szoveg,
                kommentszulo_id:kommentid
            });
            await Kommentkomment.reload();
            await KedvencKomment.create({
                komment_id:Kommentkomment.id,
                kedveles:0,
                Megosztas:0
            })
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
    //Kommentek lekérdezése
    KommentGet:async function (req, res){
        const token = req.headers.authorization?.split(' ')[1];
        try {
            const posztid=req.params.id;
            const pkomment=await Poszt.findByPk(posztid);
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            if(!pkomment){
                return res.status(404).json({ error: true, message: "A poszt nem található!" });
            }
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }

            const kommentAdatok = await Promise.all(
                (await Komment.findAll({
                    where: { poszt_id: posztid },
                    order: [['createdAt', 'ASC']],
                    include: [
                        { model: Felhasználó, attributes: ['felhasznalonev', 'kep'] },
                        { model: KedvencKomment, attributes: ['kedveles', 'Megosztas'] }
                    ]
                })).map(async (komment) => {
                    const { count } = await Komment.findAndCountAll({ where: { kommentszulo_id: komment.id } });
                        const vaneolyan=await Kedveltkomment.findOne({
                            where: {
                                komment_id: komment.id,
                                felhasznalo_id: felhasználó.id
                            }
                        });
                    return {
                        id: komment.id,
                        szoveg: komment.komment,
                        elkuldve: komment.createdAt,
                        felhasznalo: komment.felhasználó.felhasznalonev,
                        fkep: komment.felhasználó.kep,
                        szint: komment.szint,
                        kommentszulo: komment.kommentszulo_id,
                        kedveles: komment.kedvenckomment?.kedveles || 0,
                        megosztas: komment.kedvenckomment?.Megosztas || 0,
                        alkommentek: count,
                        kedvelte:vaneolyan!==null
                    };
                })
            );
    
            return res.status(200).json(kommentAdatok);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        }
    },
    //Poszt Fríssítése
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
                return res.status(404).json({ error: true, message: "A komment nem található!" });
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
    //Komment fríssítése
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
    //Poszt törlése
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
    //Komment törlée
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
    //Poszt kedvelése
    kedvelésPosztPatch:async function (req, res){
        const id=req.params.id;
        const komment=await KedvencPoszt.findByPk(id);
        const token = req.headers.authorization?.split(' ')[1];
        if(!komment){
            return res.status(404).json({ error: true, message: "A  poszt nem található!" });
        }
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(dekódolt)
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            //console.log(felhasználó)
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const vaneolyan=await Kedveltposzt.findOne({
                where: {
                    poszt_id: id,
                    felhasznalo_id: felhasználó.id
                }
            });
            if(vaneolyan){
                return res.status(400).json({ error: true, message: "Már kedvelte ezt a posztot!" });
            }
            const újKevdelés=komment.kedveles+1;

            await KedvencPoszt.update(
                {kedveles:újKevdelés},
                {where:{poszt_id:id}}
            );
            await Kedveltposzt.create({
                poszt_id:id, 
                felhasznalo_id:felhasználó.id
        });
            return res.status(200).json({
                error: false,
                message: "A poszt kedvelése megtörtént!",
            });
            


        } catch (error) {
            console.error("Hiba történt:", error);
            return res.status(500).json({ error: true, message: "Szerver hiba!" });
        }
    },
    //Komment kedvelése
    kedvelésKommentPatch:async function (req, res){
        const id=req.params.id;
        const komment=await KedvencKomment.findByPk(id);
        const token = req.headers.authorization?.split(' ')[1];
        if(!komment){
            return res.status(404).json({ error: true, message: "A komment nem található!" });
        }
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(dekódolt)
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            //console.log(felhasználó)
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            const vaneolyan=await Kedveltkomment.findOne({
                where: {
                    komment_id: id,
                    felhasznalo_id: felhasználó.id
                }
            });
            if(vaneolyan){
                return res.status(400).json({ error: true, message: "Már kedvelte ezt a kommentet!" });
            }
            const újKevdelés=komment.kedveles+1;

            await KedvencKomment.update(
                {kedveles:újKevdelés},
                {where:{komment_id:id}}
            );
            await Kedveltkomment.create({
                komment_id:id,  
                felhasznalo_id: felhasználó.id
            });
            return res.status(200).json({
                error: false,
                message: "A Komment kedvelése megtörtént!",
            });

        } catch (error) {
            console.error("Hiba történt:", error);
            return res.status(500).json({ error: true, message: "Szerver hiba!" });
        }
    },
    //Poszt kikedvelése
    mégsekedvelésPosztPatch:async function (req, res){
        const id=req.params.id;
        const komment=await KedvencPoszt.findByPk(id);
        const token = req.headers.authorization?.split(' ')[1];
        if(!komment){
            return res.status(404).json({ error: true, message: "A  poszt nem található!" });
        }
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(dekódolt)
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            //console.log(felhasználó)
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            await Kedveltposzt.destroy({
                where: {
                    poszt_id: id,
                    felhasznalo_id: felhasználó.id
                }
            });
            const újKevdelés=komment.kedveles-1;

            await KedvencPoszt.update(
                {kedveles:újKevdelés},
                {where:{poszt_id:id}}
            );
            return res.status(200).json({
                error: false,
                message: "A poszt kikedvelése megtörtént!",
            });

        } catch (error) {
            console.error("Hiba történt:", error);
            return res.status(500).json({ error: true, message: "Szerver hiba!" });
        }
    },
    //Komment kikedvelése
    mégsekedvelésKommentPatch:async function (req, res){
        const id=req.params.id;
        const komment=await KedvencKomment.findByPk(id);
        const token = req.headers.authorization?.split(' ')[1];
        if(!komment){
            return res.status(404).json({ error: true, message: "A komment nem található!" });
        }
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(dekódolt)
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            //console.log(felhasználó)
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            await Kedveltkomment.destroy({
                where: {
                    komment_id: id,
                    felhasznalo_id: felhasználó.id
                }
            });
            const újKevdelés=komment.kedveles-1;

            await KedvencKomment.update(
                {kedveles:újKevdelés},
                {where:{komment_id:id}}
            );
            return res.status(200).json({
                error: false,
                message: "A Komment kikedvelése megtörtént!",
            });

        } catch (error) {
            console.error("Hiba történt:", error);
            return res.status(500).json({ error: true, message: "Szerver hiba!" });
        }
    },
};