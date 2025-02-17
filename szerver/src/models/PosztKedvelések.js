/*import { DataTypes } from "sequelize";
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
        }
    },
    kedveles:{
        type: DataTypes.INTEGER
    },
    Megosztas:{
        type: DataTypes.INTEGER
    }
},{
    tableName: "kedvencposzt",
    createdAt: true,
    updatedAt: false
}
)


KedvencPoszt.belongsTo(Poszt, {foreignKey: 'id'});


export  default KedvencPoszt;*/