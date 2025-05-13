import { sequelize } from '../connect.js';
import createUserModel from './user.js';

const User = createUserModel(sequelize);

export { User };