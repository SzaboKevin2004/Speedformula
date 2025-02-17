/*import { DataTypes } from "sequelize";
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
        }
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

KedvencKomment.belongsTo(Komment, {foreignKey: 'komment_id'});



export default KedvencKomment;*/