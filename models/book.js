import {db} from '../configs/db.js';
import {DataTypes, Sequelize} from "sequelize";

export const Book = db.define(
    "Book",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        published_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.FLOAT
        },
    },
    {
        tableName: "books",
        indexes: [{ unique: true, fields: ["id"] }],
        timestamps: false,
    }
);