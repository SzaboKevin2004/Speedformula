import Felhasználó from "../models/Felhasználó.Modell.js";
import Szerep from "../models/Szerep.Modell.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from'multer';
import path  from 'path';

import dotenv from 'dotenv';
 // Profilkép
 if (req.body.kep !== undefined && req.body.kep !== null && req.body.kep.trim() !== "")
    {
        const tárhely=multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "szerver/src/pfp");
            },
            filename: (req, file, cb) => {
                cb(null,file.originalname);
            }
        })
        const upload= multer({storage:tárhely}).single('kep');
        await upload(req,res,(err)=>{
            if(err){
                console.log(err);
                return res.status(500).json({error: true, message: "Hiba a kép feltöltésénél!"});
            }
            valtozas.kep=req.file.path;
        })
    }


dotenv.config({ path:"C:/Users/david/Documents/szerver/src/.env"});

const ADMIN_PASSWORD = "Admin123";
/*const Midleware = async (req, res, next) => {
    const midleHeader=req.header('Authorization');
    if(!midleHeader){
        return res.status(401).json({error: true, message: "Nem található ellenőrző JWT token!"});
    }
    const token =midleHeader.replace('Bearer ', '');
    try {
        const dekódolt=jwt.verify(token, process.env.JWT_SECRET);
        const fh=await Felhasználó.findByPk(dekódolt.id);
        if(!fh){
            return res.status(401).json({error: true, message: "Érvénytelen JWT token!"});
        }
        req.user=fh;
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).json({error: true, message: "Lejárt a token!"});
        }else if(error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({error: true, message: "Érvénytelen a token!"});
        }else{
            return res.status(500).json({ error: true, message: "Szerver hiba!"});
        }
    }
}*/
export default {
    //Regisztráció
    RegisztracioPostController: async (req, res) => {
        try {
            console.log(req.body);

            if (!req.body.felhasznalonev || !req.body.email || !req.body.password || !req.body.confirm_password) {
                    return res.status(400).json({ error: true, message: "Minden mező kitöltése kötelező!" });
            }
            const létezőfelhasznalonev = await Felhasználó.findOne({where:{felhasznalonev:req.body.felhasznalonev}});
            if(létezőfelhasznalonev){
            res.status(409).json({
                error: true,
                message:"A felhasznalonév már foglalt!"
            });
            return;
            }
            const létezőEmail= await Felhasználó.findOne({where:{email:req.body.email}});
            if(létezőEmail){
                res.status(409).json({
                    error: true,
                    message:"Az email cím már foglalt!"
                });
            return;
            }else{
                if(!isEmail(req.body.email)){
                    res.status(400).json({
                        error: true,
                        message:"Érvénytelen email cím!"
                    });
                return;
            }
            if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(req.body.password)) {
                return res.status(400).json({ error: true, message: "A jelszónak minimum 8 karakternek kell lennie, és tartalmaznia kell egy nagy betűt és számot!" });
            }
            if (req.body.password !== req.body.confirm_password) {
                return res.status(400).json({ error: true, message: "A jelszavak nem egyeznek!" });
            }
            const pass= req.body.password.length;
            console.log(pass);
            let titkosPassword;
            try {
                titkosPassword = await bcrypt.hash(req.body.password, 10);
                 
            
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: true, message: "Jelszó feldolgozási hiba!" });
            }
            let szerepNeve = "felhasználó";
            if (req.body.password === ADMIN_PASSWORD && req.body.password === req.body.confirm_password) {
                szerepNeve = "admin";
            }

            
            const szerep = await Szerep.findOne({ where: { szerep_neve: szerepNeve } });
            if (!szerep) {
                console.error(`A '${szerepNeve}' szerep nem található!`);
                return res.status(500).json({ error: true, message: `Hiba történt a regisztráció során (a '${szerepNeve}' szerep nem található). Ellenőrizd az adatbázist és a modellek szinkronizációját!` });
            } 
            const kepEleres = [
                "szerver/src/pfp/pfp_black.png",//
                "szerver/src/pfp/pfp_blue.png",//
                "szerver/src/pfp/pfp_brown.png",//
                "szerver/src/pfp/pfp_cyan.png",//
                "szerver/src/pfp/pfp_dark-cyan.png",//
                "szerver/src/pfp/pfp_dark-brown.png",//
                "szerver/src/pfp/pfp_green.png",//
                "szerver/src/pfp/pfp_dark-green.png",//
                "szerver/src/pfp/pfp_dark-blue.png",//
                "szerver/src/pfp/pfp_pink.png",//
                "szerver/src/pfp/pfp_dark-pink.png",//
                "szerver/src/pfp/pfp_magenta.png",//
                "szerver/src/pfp/pfp_dark-magenta.png",//
                "szerver/src/pfp/pfp_yellow.png",//
                "szerver/src/pfp/pfp_dark-yellow.png",//
                "szerver/src/pfp/pfp_orange.png",//
                "szerver/src/pfp/pfp_dark-orange.png",
                "szerver/src/pfp/pfp_purple.png",//
                "szerver/src/pfp/pfp_dark-purple.png",//
                "szerver/src/pfp/pfp_red.png",//
                "szerver/src/pfp/pfp_dark-red.png",//
              ];
            
            const randomKep = kepEleres[Math.floor(Math.random() * kepEleres.length)];    
            const felhasználó = Felhasználó.build(
                {
                    felhasznalonev: req.body.felhasznalonev,
                    email: req.body.email,
                    password: titkosPassword,
                    passwordHosszusag:pass,
                    szerep_id: szerep.id,
                    tema_id:1,
                    kep:kepEleres[randomKep],
                    magamrol:""

                }
            );
            felhasználó.save();  
            res.json({ error: false, message: "Sikeres regisztráció!", felhasználó_id: felhasználó.id  });
        }
        }catch (err) {
        console.error("Profil létrehozása sikertelen!", err);
            res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        }
    },
    //Bejelentkezés
    LoginPostController: async (req, res) =>{  
        try{
        const{felhasznalonev,email}=req.body;
            if (!req.body.password){
                return res.status(400).json({
                    error: true,
                    message: "Jelszó megadása kötelező!"
                });
            }
            if(!req.body.felhasznalonev&& !req.body.email){
                return res.status(400).json({
                    error:true,
                    message:"Felhasználónév/email megadása kötelező!"
                })
            }
            
            let felhasználó
            if (req.body.felhasznalonev){
                felhasználó = await Felhasználó.findOne({where:{felhasznalonev}});
            }else{
                felhasználó = await Felhasználó.findOne({where:{email}});
            }
            if (!felhasználó){
                return res.status(401).json({
                    error: true,
                    message: "Nem található ilyen felhasznalónév/email!"
                });
            }
            //console.log("Beírt jelszó:", req.body.password);
            //console.log("Adatbázisban tárolt jelszó hash:", felhasználó.password);
            const jó=await bcrypt.compare(req.body.password, felhasználó.password);
            if(!jó){
                return res.status(401).json({
                    error: true,
                    message: "Hibás jelszó!"
                });
            }  
            console.log(process.env.JWT_SECRET);
            const token=jwt.sign({ id: felhasználó.id,felhasznalonev:felhasználó.felhasznalonev},process.env.JWT_SECRET, { expiresIn: '12h' });
            //const reftoken=jwt.sign({ id: felhasználó.id,felhasznalonev:felhasználó.felhasznalonev},process.env.JWT_SECRET, { expiresIn: '7d' });
            
          
            console.log(token);
            //console.log(reftoken);
            res.status(200).json({
                success: true,
                token,
                username:felhasználó.felhasznalonev,
                pfp:felhasználó.kep,
                tema:felhasználó.tema_id,
                message: "Sikeres bejelentkezés!"
            });
        }catch(error){
            console.error("Bejelentkezés sikertelen!", error);
            return res.status(500).json({
                error: true,
                message: "Bejelentkezés sikertelen!"
            });
        }
        
    },
    //Kijelentkezés
    LogoutPostController: (req, res) =>{
        res.status(200).json({
            success: true,
            message: "Sikeres kijelentkezés!"
        });
    },
    //Profil lekérés
    ProfilGetController: async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        try{
            const dekódolt=jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó= await Felhasználó.findOne({
                where: { id: dekódolt.id },
                include:[{
                    model: Szerep,
                    attributes: ['szerep_neve']
              }],
              //attributes:{exclude:['password']}
            })
            if(!felhasználó){
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            
            if(felhasználó.password){
                felhasználó.password='*'.repeat(felhasználó.passwordHosszusag);
            }
            return res.status(200).json({ error: false, message: "Sikeres profil lekérés!", felhasználó });

        }catch (error) {
                    if(error instanceof jwt.TokenExpiredError){
                        return res.status(401).json({error: true, message: "Lejárt a token!"});
                    }else if(error instanceof jwt.JsonWebTokenError){
                        return res.status(401).json({error: true, message: "Érvénytelen a token!"});
                    }else{
                        return res.status(500).json({ error: true, message: "Szerver hiba!"});
                    }
                }
},
//Más prfoil lekérése
MásikProfilGetControler: async(req,res)=>{
    const{id}=req.params;
    const token = req.headers.authorization?.split(' ')[1];
        try{
            const dekódolt=jwt.verify(token, process.env.JWT_SECRET);
            const másikfelhasználó= await Felhasználó.findOne({
                where: {id},
                include:[{
                    model: Szerep,
                    attributes: ['szerep_neve']
              }],
              attributes:{exclude:['password']}
            })
            if(!másikfelhasználó){
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
            res.status(200).json({ error: false, message: "Sikeres profil lekérés!", másikfelhasználó });

        }catch (error) {
                    if(error instanceof jwt.TokenExpiredError){
                        return res.status(401).json({error: true, message: "Lejárt a token!"});
                    }else if(error instanceof jwt.JsonWebTokenError){
                        return res.status(401).json({error: true, message: "Érvénytelen a token!"});
                    }else{
                        return res.status(500).json({ error: true, message: "Szerver hiba!"});
                    }
                }
},
    //Profil módosítás
    ProfilePatchController: async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        try {
            const dekódolt = jwt.verify(token, process.env.JWT_SECRET);
            const felhasználó = await Felhasználó.findByPk(dekódolt.id);
            
            if (!felhasználó) {
                return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
    
            // Csak nem üres mezők feldolgozása
            const változás = {};
    
            // Felhasználónév
            if (req.body.felhasznalonev !== undefined && req.body.felhasznalonev.trim() !== "") {
                változás.felhasznalonev = req.body.felhasznalonev.trim();
            }
    
            // Email
            if (req.body.email !== undefined && req.body.email.trim() !== "") {
                const email = req.body.email.trim();
                if (!isEmail(email)) {
                    return res.status(400).json({ error: true, message: "Érvénytelen email cím!" });
                }
                const létezőEmail = await Felhasználó.findOne({ where: { email } });
                if (létezőEmail && létezőEmail.id !== felhasználó.id) {
                    return res.status(409).json({ error: true, message: "Az email cím már foglalt!" });
                }
                változás.email = email;
            }
    
            // Jelszó
            if (req.body.password !== undefined && req.body.password.trim() !== "") {
                const password = req.body.password.trim();
                if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
                    return res.status(400).json({ 
                        error: true, 
                        message: "A jelszónak minimum 8 karakternek kell lennie, és tartalmaznia kell egy nagybetűt és egy számot!" 
                    });
                }
                változás.passwordHosszusag = req.body.password.length;
                console.log(passwordHosszusag);
                változás.password = await bcrypt.hash(password, 10);
                let szerepNeve = "felhasználó";
                if (password === ADMIN_PASSWORD) {
                    szerepNeve = "admin";
                }
                const szerep = await Szerep.findOne({ where: { szerep_neve: szerepNeve } });
                if (!szerep) {
                    console.error(`A '${szerepNeve}' szerep nem található!`);
                    return res.status(500).json({ error: true, message: `Hiba történt a regisztráció során (a '${szerepNeve}' szerep nem található). Ellenőrizd az adatbázist és a modellek szinkronizációját!` });
                }
                változás.szerep_id = szerep.id;
            }
            // Téma
            if (req.body.tema_id !== undefined && req.body.tema_id !== null) {
                változás.tema_id = req.body.tema_id;
            }
    
            // Profilkép
            if (req.file){
                 await new Promise((resolve, reject) => {
                    upload(req,res,(err)=>{
                        if(err){
                            reject(err);
                        } else{
                            resolve();
                        }
                    })
                 });
                 valtozas.kep=req.file.path;   
            }
            //magamról
            if(req.body.magamrol !== undefined && req.body.magamrol.trim()!== "")
                {
                    változás.magamrol = req.body.magamrol.trim();
                }
            // Frissítés végrehajtása
            await felhasználó.update(változás);
            
            return res.status(200).json({
                error: false,
                message: "Profil sikeresen módosítva!",
                felhasználó_id: felhasználó.id
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
    //Profil törlés
    ProfilDeleteController: async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        try {
            const dekódolt=jwt.verify(token, process.env.JWT_SECRET);
            Felhasználó.findByPk(dekódolt.id)
            .then(async(felhasználó)=>{
                if(!felhasználó){
                  return  res.status(404).json({ error: true, message: "Felhasználó nem található!" });
             }else       
                {
                const törlés=await Felhasználó.destroy({ where: { id: dekódolt.id } });
            
                if(törlés===0){
                    res.status(404).json({ error: true, message: "Felhasználó nem található!" });
                }else{
                    res.status(200).json({
                    error: false,
                    message: "Profil sikeresen törölve!"
                    });
                };   
                }   
            }).catch((err)=>{
                console.error( err);
                res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
            });
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                return res.status(401).json({error: true, message: "Lejárt a token!"});
            }else if(error instanceof jwt.JsonWebTokenError){
                return res.status(401).json({error: true, message: "Érvénytelen a token!"});
            }else{
                return res.status(500).json({ error: true, message: "Szerver hiba!"});
            }
        }
    },
}

