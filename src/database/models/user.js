import { DataTypes } from "sequelize";

const User = (sequelize) => {
  return sequelize.define("User", {
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
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activeAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    blockedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nuLogged: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    loggedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nuRefreshed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    refreshedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "Users",
    timestamps: true,
    paranoid: true,
  });
};

export default User;