'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    activeAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    blockedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    nuLogged: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    loggedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    nuRefreshed: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    refreshedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Users');
}