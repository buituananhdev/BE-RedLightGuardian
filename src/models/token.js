import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';
const Token = sequelize.define('token', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  access_token: Sequelize.STRING,
  refresh_token: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  expiresAt: Sequelize.DATE,
});

export default Token;
