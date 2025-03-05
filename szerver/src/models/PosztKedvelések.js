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
        autoIncrement: true,
        onDelete: "CASCADE"
    },
    kedveles:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    tableName: "kedvencposzt",
    timestamps: false
}
)

Poszt.hasOne(KedvencPoszt, {foreignKey: 'poszt_id', onDelete: 'CASCADE'  });
KedvencPoszt.belongsTo(Poszt, {foreignKey: 'poszt_id', onDelete: 'CASCADE'  });


export  default KedvencPoszt;