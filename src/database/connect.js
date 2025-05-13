import "dotenv/config";
import { Sequelize } from "sequelize";

const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  dialect: "mysql",
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao conectar no banco de dados:", error);
  }
};

export { sequelize, connectToDatabase };