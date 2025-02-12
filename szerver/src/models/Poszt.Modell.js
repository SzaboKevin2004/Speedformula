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
    user_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Felhasználó,
            key: "id"
        },
        onDelete: "CASCADE"
    }
 }, 
 {
    tableName: "poszt",
    createdAt:true,
    updatedAt:false
})

Poszt.belongsTo(Felhasználó, {foreignKey: 'user_id'});
Felhasználó.hasMany(Poszt, { foreignKey: "user_id", onDelete: "CASCADE" });



//created_at is kéne
//like szám, komment szám

export default Poszt;