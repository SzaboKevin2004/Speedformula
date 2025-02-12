import { DataTypes } from "sequelize";
import db from "../db.js";

const ForumTipus=db.define(
    "forumtipus",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipus_neve: {
            type: DataTypes.STRING(50),
        },
    },
    {
        tableName: "forumtipus",
        timestamps: false
    }
 
);

export default ForumTipus;