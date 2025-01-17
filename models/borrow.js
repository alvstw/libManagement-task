import {db} from '../configs/db.js';
import {DataTypes, Deferrable} from "sequelize";
import {User} from "./user.js";
import {Book} from "./book.js";

export const Borrow = db.define(
    "Borrow",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Book,
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        borrow_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        return_date: {
            type: DataTypes.DATE,
        }
    },
    {
        tableName: "borrows",
        indexes: [{ unique: true, fields: ["id"] }],
        timestamps: false,
    }
);