import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";
import ForumTipus from "./KommentVagyPosztModell.js";

const Komment = db.define("komment",
     
    {
    szülő_type:{
        type: DataTypes.INTEGER,
        references:{
            model: ForumTipus,
            key: "id"
        }
    },
    szülő_id:{
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
        onDelete: "CASCADE" 
    }
 }, 
 {
    tableName: "komment",
    createdAt:true,
    updatedAt:false
});


Komment.belongsTo(Felhasználó, { foreignKey: "user_id"});
Felhasználó.hasMany(Komment, { foreignKey: "user_id", onDelete: "CASCADE" });

export default Komment;