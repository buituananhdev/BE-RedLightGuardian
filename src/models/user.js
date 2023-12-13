import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(50), // Set a specific length, adjust as needed
    allowNull: false,
    unique: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  email: {
    type: Sequelize.STRING(50), // Set a specific length, adjust as needed
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  password: {
    type: Sequelize.STRING(200), // Set a specific length, adjust as needed
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

export default User;
