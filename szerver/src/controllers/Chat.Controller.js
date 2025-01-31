import Chat from "../models/Chat.Modell.js";
import Felhasználó from "../models/Felhasználó.Modell.js";
import Szerep from "../models/Szerep.Modell.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path:"C:/Users/david/Documents/szerver/src/.env"});
export default{
    ChatPut:async(req,res)=>{
        const token = req.headers.authorization?.split(' ')[1];
        try {
            const dekódolt=jwt.verify(token, process.env.JWT_SECRET);
            console.log(dekódolt.id);
            Felhasználó.findByPk(dekódolt.id).then(async(felhasználó)=>{
                if(!felhasználó){
                    return res.status(404).json({ error: true, message: "Felhasználó nem található!" });
                    }else       
                {
                    if(!req.body.uzenet){
                        return res.status(400).json({ error: true, message: "Üzenet megadása kötelező!" });
                    }
                    console.log(req.body.uzenet);
                    const chat=Chat.build(
                        {
                            felhasznalo_id:dekódolt.id,
                            uzenet:req.body.uzenet
                        }
                    );
                    await chat.save();
                    res.status(201).json({ error: false, message: "Üzenet sikeresen elküldve!" });
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
    ChatGet:async(req,res)=>{
          Chat.findAll({order:[['createdAt','ASC']]}).then((chat)=>{
            res.status(200).json(chat);
          }).catch((err)=>{
            console.error(err);
            res.status(500).json({ 
                error: true, 
                message: "Adatbázis hiba történt!" });
          });
                
    },
    ChatIdDelete:async(req,res)=>{
        return req.status(501).json({
            error:true,
            message:"A Chat kérésének lekéréséhez még nincs implementálva!"
        });
    },
    ChatDeleteAll:async(req,res)=>{
        try{
            await Chat.destroy({where: {}});
            res.status(200).json({
                error: false,
                message: "Összes üzenet sikeresen törölve!"
            });
        }catch(err){
            console.error(err);
            res.status(500).json({ 
                error: true, 
                message: "Adatbázis hiba történt!" });

        }
                
    },
}