import { DataTypes } from "sequelize";
import db from "../db.js";
import Poszt from "./Poszt.Modell.js";

const KedvencPoszt=db.define(
    "kedvencposzt",
    {
    poszt_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Poszt,
            key: "id"
        },
        primaryKey: true,
        autoIncrement: true
    },
    kedveles:{
        type: DataTypes.INTEGER
    },
    Megosztas:{
        type: DataTypes.INTEGER
    }
},{
    tableName: "kedvencposzt",
    timestamps: false
}
)


Poszt.belongsTo(KedvencPoszt, {foreignKey: 'poszt_id'});


export  default KedvencPoszt;