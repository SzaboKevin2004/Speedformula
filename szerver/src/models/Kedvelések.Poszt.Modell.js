import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";
import Poszt from "./Poszt.Modell.js";

const Kedveltposzt= db.define("posztkedveltek",
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
        }
    },
    poszt_id: {
        type: DataTypes.INTEGER,
        references: {
                model: Poszt,
                key: "id"
            }
        }
    },
    {
        tableName: "posztkedveltek",
        timestamps: false
    }
);

Kedveltposzt.belongsTo(Felhasználó, { foreignKey: "felhasznalo_id", targetKey: "id" });
Felhasználó.hasMany(Kedveltposzt, { foreignKey: "felhasznalo_id", onDelete:"Cascade", hooks:true })
Kedveltposzt.belongsTo(Poszt, { foreignKey: "poszt_id", targetKey: "id" });
Poszt.hasMany(Kedveltposzt, { foreignKey: "poszt_id", onDelete:"Cascade", hooks:true })


export default Kedveltposzt;