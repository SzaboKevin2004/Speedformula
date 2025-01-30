import { DataTypes } from "sequelize";
import db from "../db.js";


const Szerep= db.define(
    "szerep",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            
        },
        szerep_neve: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        tableName: "szerep",
       timestamps: false
    }
);
export default Szerep;

