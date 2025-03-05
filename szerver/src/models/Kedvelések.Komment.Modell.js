import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";
import Komment from "./Komment.Modell.js";

const Kedveltkomment= db.define("kommentkedveltek",
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    felhasznalo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Felhasználó,
            key: "id"
        },
        onDelete:"Cascade", hooks:true
    },
    komment_id: {
        type: DataTypes.INTEGER,
        references: {
                model: Komment,
                key: "id"
            },
            onDelete:"Cascade", hooks:true
        }
    },
    {
        tableName: "kommentkedveltek",
        timestamps: false
    }
);

Kedveltkomment.belongsTo(Felhasználó, { foreignKey: "felhasznalo_id", targetKey: "id" });
Felhasználó.hasMany(Kedveltkomment, { foreignKey: "felhasznalo_id", onDelete:"Cascade", hooks:true })
Kedveltkomment.belongsTo(Komment, { foreignKey: "komment_id", targetKey: "id" });
Komment.hasMany(Kedveltkomment, { foreignKey: "komment_id", onDelete:"Cascade", hooks:true })


export default Kedveltkomment;