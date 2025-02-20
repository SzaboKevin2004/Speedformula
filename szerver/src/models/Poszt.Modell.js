import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";


const Poszt  = db.define("poszt",
     
    {
    id: {
        type: DataTypes.INTEGER,
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
        onDelete: "CASCADE", 
        hooks: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kep:{
        type: DataTypes.STRING,
        allowNull: true
    },
    video:{
        type:DataTypes.STRING,
        allowNull: true
    }
 }, 
 {
    tableName: "poszt",
    createdAt:true,
    updatedAt:false
})

Poszt.belongsTo(Felhasználó, {foreignKey: "user_id"});
Felhasználó.hasMany(Poszt, { foreignKey: "user_id",onDelete: "CASCADE", hooks: true  });

export default Poszt;