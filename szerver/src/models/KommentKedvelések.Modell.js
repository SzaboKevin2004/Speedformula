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
        type: DataTypes.INTEGER
    },
    Megosztas:{
        type: DataTypes.INTEGER
    }
 },
 {
    tableName: "kedvenckomment",
    timestamps: false,
 }
);

Komment.belongsTo(KedvencKomment, {foreignKey: 'komment_id',onDelete: 'CASCADE'  });



export default KedvencKomment;