import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";

const Chat=db.define(
    "chat",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        felhasznalo_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Felhasználó,
                key: "id"
            }
        },
        uzenet:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: "chat",
        createdAt:true,
        updatedAt:false
    }
);

Felhasználó.hasMany(Chat, { foreignKey: "felhasznalo_id" });
Chat.belongsTo(Felhasználó, { foreignKey: "felhasznalo_id"});


export default Chat;