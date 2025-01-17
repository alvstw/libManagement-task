import {db} from '../configs/db.js';
import {DataTypes, Model} from "sequelize";

// class User extends Model {
// }

export const User = db.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registered_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: "users",
        indexes: [
            { unique: true, fields: ["id"] },
            { unique: true, fields: ["email"] },
        ],
        timestamps: false,
    }
);
