import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';

const Camera = sequelize.define('camera', {
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
  location: {
    type: Sequelize.STRING(50),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  coordinates: {
    type: Sequelize.STRING(500),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
});

export default Camera;
