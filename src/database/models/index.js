import { sequelize } from '../connect.js';
import createUserModel from './user.js';
import createTenantModel from './tenant.js';

const User = createUserModel(sequelize);
const Tenant = createTenantModel(sequelize);

export { User, Tenant };