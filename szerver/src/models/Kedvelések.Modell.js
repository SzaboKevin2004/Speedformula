import { DataTypes } from "sequelize";
import db from "../db.js";
import ForumTipus from "./KommentVagyPosztModell.js";

const Kedvelesek=db.define(
    "kedvelesek",{
        szulo_type:{
            type: DataTypes.INTEGER,
            references:{
                model: ForumTipus,
                key: "id"
            }
        },
        szulo_id:{
            type:DataTypes.INTEGER,
        },
        kedveles:{
            type:DataTypes.INTEGER
        },
        megosztas:{
            type:DataTypes.INTEGER
        }
    },{
        tableName: "kedvelesek",
        timestamps: false
    }
);

Kedvelesek.belongsTo(ForumTipus, { foreignKey: "szulo_type" });
ForumTipus.hasMany(Kedvelesek, { foreignKey: "szulo_type", as: "kedvelesek" });

export default Kedvelesek;