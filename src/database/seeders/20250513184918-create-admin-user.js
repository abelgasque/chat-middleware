'use strict';
import crypto from 'crypto';

const {
  NODE_ENV
} = process.env;

export async function up(queryInterface, Sequelize) {
  const password = '12345678';
  const users = [
    {
      guid: crypto.randomUUID(),
      name: 'Admin',
      email: 'admin@admin.com',
      password: password,
      activeAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  if (NODE_ENV === "development") {
    for (let i = 0; i < 50; i++) {
      users.push({
        guid: crypto.randomUUID(),
        name: 'Dev',
        email: `dev_${i}@test.com`,
        password: password,
        activeAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: (i < 25) ? null : new Date(),
      });
    }
  }

  await queryInterface.bulkInsert('Users', users, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}