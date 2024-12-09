import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define('User', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    pfp: { 
        type: DataTypes.INTEGER, 
        defaultValue: () => Math.floor(Math.random() * 23) + 1, 
    },theme: { 
        type: DataTypes.INTEGER,
        defaultValue: () => Math.floor(Math.random() * 5) + 1, 
    }
}, {
    tableName: 'users',
    timestamps: true,
});

export default User;

