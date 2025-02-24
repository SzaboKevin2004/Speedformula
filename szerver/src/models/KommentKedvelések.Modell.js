import { DataTypes } from "sequelize";
import db from "../db.js";
import Komment from "./Komment.Modell.js";

const KedvencKomment=db.define(
    "kedvenckomment",
    {
    komment_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Komment,
            key: "id"
        },
        primaryKey: true,
        autoIncrement: true,
        onDelete:"CASCADE"
    },
    kedveles:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    Megosztas:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
 },
 {
    tableName: "kedvenckomment",
    timestamps: false,
 }
);

Komment.hasOne(KedvencKomment, {foreignKey: 'komment_id', onDelete: 'CASCADE'  });
KedvencKomment.belongsTo(Komment, {foreignKey: 'komment_id',onDelete: 'CASCADE'  });



export default KedvencKomment;