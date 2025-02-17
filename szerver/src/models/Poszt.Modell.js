/*import { DataTypes } from "sequelize";
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
    user_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Felhasználó,
            key: "id"
        },
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    kep:{
        type: DataTypes.STRING,
    },
    video:{
        type:DataTypes.STRING
    }
 }, 
 {
    tableName: "poszt",
    createdAt:true,
    updatedAt:false
})

Poszt.belongsTo(Felhasználó, {foreignKey: 'id'});
Felhasználó.hasMany(Poszt, { foreignKey: "id"});

export default Poszt;*/