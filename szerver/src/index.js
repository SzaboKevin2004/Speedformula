import app from "./app.js";
import db from "./db.js";
import Szerep from "./models/Szerep.Modell.js";
import Felhasználó from "./models/Felhasználó.Modell.js";
import Poszt from "./models/Poszt.Modell.js";
import Komment from "./models/Komment.Modell.js";
import Chat from "./models/Chat.Modell.js";
import KedvencPoszt from "./models/PosztKedvelések.js";
import KedvencKomment from "./models/KommentKedvelések.Modell.js";

db.authenticate()
    .then(()=>{
      console.log("Sikeres bejelentkezés a MySql-ben");
      db.modelManager.addModel(Szerep);
      db.modelManager.addModel(Felhasználó);
      db.modelManager.addModel(Poszt);
      db.modelManager.addModel(KedvencPoszt);
      db.modelManager.addModel(Komment);
      db.modelManager.addModel(Chat);
      db.modelManager.addModel(KedvencKomment);
      db.sync({
        //force: true //Kényszerítjük , hogy a modellek alapján az adatbázisban megjelenjenek a táblák. minden indításkor teljesen felülírja az adatbázisban lévő táblát.
      
        //alter: true, //A modellek alapján a már meglévő táblák módosításra kerülnek.
      })
      .then(()=>{
        console.log("A modellek szinkronízációja sikeres!");
        app.listen(3000, () => {
        console.log("Webszerver elindult a http://localhost:3000/ URL-en!");
        }); 
      })
      .catch((err)=>{
        console.log("A modellek szinkronízációja sikertelen!");
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log("Hiba a bejelentkezés során!");
      console.log(err);
    });