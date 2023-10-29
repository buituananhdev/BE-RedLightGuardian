import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';
import User from './user.js';
const Token = sequelize.define('token', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  access_token: Sequelize.STRING,
  refresh_token: Sequelize.STRING,
  userId: Sequelize.STRING,
  expiresIn: Sequelize.DATE,
});

Token.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
export default Token;
