import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";

const UjToken=db.define(
    "ujtoken",
    {
        token: {
            type: DataTypes.STRING(255),
            unique: true,
        },
        felhasznalo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Felhasználó,
                key: "id"
            },
            onDelete: "CASCADE",
            hooks: true  
        }

    },
    {
        tableName: "ujtoken",
        timestamps: false,
    }
);

UjToken.belongsTo(Felhasználó,{ foreignKey: "felhasznalo_id", onDelete:"Cascade", hooks:true  });


export default UjToken;