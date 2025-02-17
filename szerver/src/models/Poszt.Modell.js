import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";


const Poszt  = db.define("poszt",
     
    {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    cim:{
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    milyenposzt:{
        type: DataTypes.INTEGER,
        /*references:{
            model: Milyenposzt,
            key: "id"
        }*/
    },
    user_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Felhasználó,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    kep:{
        type: DataTypes.STRING,
    },
 }, 
 {
    tableName: "poszt",
    createdAt:true,
    updatedAt:false
})

//Poszt.belongsTo(Felhasználó, {foreignKey: 'user_id'});
//Felhasználó.hasMany(Poszt, { foreignKey: "user_id", onDelete: "CASCADE" });



//created_at is kéne
//like szám, komment szám

export default Poszt;