'use strict';
import crypto from 'crypto';

const {
  NODE_ENV
} = process.env;

export async function up(queryInterface, Sequelize) {
  const tenants = [
    {
      guid: crypto.randomUUID(),
      name: 'Default Tenant',
      domain: 'default.local',
      database: 'tenant_default_db',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  if (NODE_ENV === "development") {
    for (let i = 0; i < 50; i++) {
      tenants.push({
        guid: crypto.randomUUID(),
        name: `Default Tenant v${i}`,
        domain: `default.v${i}`,
        database: `tenant_default_v${i}_db`,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: (i < 25) ? null : new Date(),
      });
    }
  }

  await queryInterface.bulkInsert('Tenants', tenants, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Tenants', null, {});
}