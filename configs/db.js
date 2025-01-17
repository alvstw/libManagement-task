import {Sequelize} from "sequelize";

export const db= new Sequelize('postgres://postgres:localsecretpassword@localhost:5432/lib_management')
export default db;