/*import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";
const Token=db.define(
    "token",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        felhasználó_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Felhasználó,
                key: "id"
            }
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        felhasználó_id: {
            type: DataTypes.INTEGER,
            
        }
    },
    {
        tableName: "token",
        timestamps: false
    }
);
Felhasználó.hasMany(Token, { foreignKey: "felhasználó_id" });
Token.belongsTo(Felhasználó, { foreignKey: "felhasználó_id" });

export default Token;*/