import Felhasználó from "../models/Felhasználó.Modell.js";
import Szerep from "../models/Szerep.Modell.js";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';


dotenv.config({ path:"C:\Users\david\Documents\szerver\src\.env"});

const ADMIN_PASSWORD = "Admin123";
const Midleware = async (req, res, next) => {
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
}
export default {
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
                message:"A felhasznalonev már foglalt!"
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
        

            
            const felhasználó = Felhasználó.build(
                {
                    felhasznalonev: req.body.felhasznalonev,
                    email: req.body.email,
                    password: titkosPassword,
                    szerep_id: szerep.id,
                    téma_id:1,
                    kép:req.body.kép
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
                    message: "Nem található ilyen felhasznalonev/email!"
                });
            }

            

            console.log("Beírt jelszó:", req.body.password);
            console.log("Adatbázisban tárolt jelszó hash:", felhasználó.password);
            const jó=await bcrypt.compare(req.body.password, felhasználó.password);
              if(!jó){
                return res.status(401).json({
                    error: true,
                    message: "Hibás jelszó!"
                });
              }  
              console.log(process.env.JWT_SECRET);
            const token=jwt.sign({ id: felhasználó.id,felhasznalonev:felhasználó.felhasznalonev},process.env.JWT_SECRET, { expiresIn: '6h' });
            //await Token.create({ token, felhasználó_id: felhasználó.id });
           // const token1=Token.build({ token:token, felhasználó_id: felhasználó.id });
            res.status(200).json({
                success: true,
                token,
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
    LogoutPostController: (req, res) =>{
        res.status(200).json({
            success: true,
            message: "Sikeres kijelentkezés!"
        });
    },
    ProfilGetController:[Midleware, async (req, res) => {
      try{
        res.status(200).json({
            error: false,
            user: req.user,
            message: "Profil sikeresen lekérdezve!"
        });
      }catch(err){
        console.error("Profil lekérdezés sikertelen!", err);
        res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
      }
}],
    ProfilePatchController:[Midleware, async (req, res) => {
        const felhasználóId=req.user.id;
        Felhasználó.findByPk(felhasználóId).then(async(felhasználó)=>{
            if(!felhasználó){
                res.status(404).json({ error: true, message: "Felhasználó nem található!" });
                return;
            }else{
                if(req.body.felhasznalonev!==undefined){
                    felhasználó.felhasznalonev=req.body.felhasznalonev;
                }
                if(req.body.email!==undefined){
                    felhasználó.email=req.body.email;
                }
                try{
                    if (req.body.password !== undefined) {
                        if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(req.body.password)) {
                           return res.status(400).json({ error: true, message: "A jelszónak minimum 8 karakternek kell lennie, és tartalmaznia kell egy nagy betűt és számot!" });
                       }
                       felhasználó.password = await bcrypt.hash(req.body.password, 10);
                   }
                }catch(err){
                    console.error("Adatfelvétel hiba!", err);
                    res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
                }
                
                if(req.body.téma_id!==undefined){
                    felhasználó.téma_id=req.body.téma_id;
                }
                if(req.body.kép!==undefined){
                    felhasználó.kép=req.body.kép;
                }

                felhasználó.save().then(()=>{
                    res.status(200).json({
                        error: false,
                        message: "Profil sikeresen módosítva!",
                        felhasználó_id: felhasználó.id
                    });
                }).catch(err=>{
                    console.error("Felhasználó módosítása sikertelen!", err);
                    res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
                });
            }   
        }).catch((err)=>{
            console.error( err);
            res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        });
}],
    ProfilDeleteController:[Midleware, async (req, res) => {
        try{
            const felhasználóId=req.user.id;

            const törlés=await Felhasználó.destroy({ where: { id: felhasználóId } });
            
            if(törlés===0){
                res.status(404).json({ error: true, message: "Felhasználó nem található!" });
            }
             res.status(200).json({
                error: false,
                message: "Profil sikeresen törölve!"
            });
        }catch{
            console.error("Felhasználó törlés sikertelen!", err);
            res.status(500).json({ error: true, message: "Adatbázis hiba történt!" });
        }
        
    }]

};
