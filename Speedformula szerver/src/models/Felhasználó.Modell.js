import { DataTypes } from "sequelize";
import db from "../db.js";
import Szerep from "./Szerep.Modell.js";
import Token from "./Token.Modell.js";

const Felhasználó =  db.define(
    "felhasználó",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        felhasználónév: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        szerep_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Szerep,
                key:"id",
            },
        },
        téma_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        kép:{
            type: DataTypes.BLOB,
        }
    },
    {
        tableName: "felhasználó",
        timestamps: false
    }
);

Szerep.hasMany(Felhasználó, { foreignKey: "szerep_id" });
Felhasználó.belongsTo(Szerep, { foreignKey: "szerep_id" });
Felhasználó.hasMany(Token, { foreignKey: 'felhasználó_id', onDelete: 'CASCADE' }); 
Token.belongsTo(Felhasználó, { foreignKey: 'felhasználó_id' });

export default Felhasználó;