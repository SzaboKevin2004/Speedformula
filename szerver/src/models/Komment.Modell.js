import { DataTypes } from "sequelize";
import db from "../db.js";
import Felhasználó from "./Felhasználó.Modell.js";
import Poszt from "./Poszt.Modell.js";


const Komment = db.define(
    "komment",{ 
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        poszt_id:{
            type: DataTypes.INTEGER,
            references:{
                model: Poszt,
                key:"id"
            },
            onDelete: "CASCADE",
            hooks: true
        },
        szint:{
            type: DataTypes.INTEGER,
        },
        kommentszulo_id:{
            type:DataTypes.INTEGER
        },
    
        komment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id:{
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
    tableName: "komment",
    createdAt:true,
    updatedAt:false
});


Komment.belongsTo(Felhasználó, { foreignKey: "user_id"});
Felhasználó.hasMany(Komment, { foreignKey: "user_id",onDelete: "CASCADE",hooks:true });

Komment.belongsTo(Poszt, { foreignKey: "poszt_id"});
Poszt.hasMany(Komment, { foreignKey: "poszt_id",onDelete: "CASCADE",hooks: true });

export default Komment;