import { DataTypes } from "sequelize";
import db from "../db.js";


const Token = db.define("token", {
    
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    felhasználó_id: {
        type: DataTypes.INTEGER,
       
    }
},
{
    tableName: "token",
    timestamps: true
});


export default Token;