import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';

const Owner = sequelize.define('owner', {
  id: {
    type: Sequelize.STRING(30),
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  citizen_identification: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  address: {
    type: Sequelize.STRING(100),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
});

export default Owner;