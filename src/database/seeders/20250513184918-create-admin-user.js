'use strict';
import crypto from 'crypto';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Users', [
    {
      guid: crypto.randomUUID(),
      name: 'Admin',
      email: 'admin@admin.com',
      password: '12345678',
      activeAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}