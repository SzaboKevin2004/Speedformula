/*import { DataTypes } from "sequelize";
import db from "../db.js";


const komment = db.define("komment",
     
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
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
    },
    poszt_id:{
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: "poszt",
            key: "id"
        },
        allowNull: false
    }
 }, 
 {
    tableName: "komment",
    timestamps:true
});*/



export default komment;