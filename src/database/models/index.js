import { Sequelize } from "sequelize";
import { sequelize } from "../connect.js";
import User from "./user.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize);

export default db;