'use strict';
import crypto from 'crypto';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Tenants', [
    {
      guid: crypto.randomUUID(),
        name: 'Default Tenant',
        domain: 'default.local',
        database: 'tenant_default_db',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Tenants', null, {});
}