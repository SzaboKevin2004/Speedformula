/*import { DataTypes } from "sequelize";
import db from "../db.js";



const poszt  = db.define("poszt",
     
    {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
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
            model: "felhasználó",
            key: "id"
        },
        allowNull: false
    }
 }, 
 {
    tableName: "poszt",
    timestamps:true
});

//created_at is kéne
//like szám, komment szám

export default poszt;*/