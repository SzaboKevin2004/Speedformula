import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";
import Poszt from "./Poszt.Modell.js";


const Komment = db.define(
    "komment",{
        poszt_id:{
            type:DataTypes.INTEGER,
            references:{
                model: Poszt,
                key:"poszt_id"
            }
        },
        szulo_id:{
            type:DataTypes.INTEGER,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        komment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: Felhasználó,
                key: "id"
            }, 
        }
    }, 
 {
    tableName: "komment",
    createdAt:true,
    updatedAt:false
});


Komment.belongsTo(Felhasználó, { foreignKey: "felhasználó_id"});
Felhasználó.hasMany(Komment, { foreignKey: "felhasználó_id" });

Komment.belongsTo(Poszt, { foreignKey: "id"});


export default Komment;