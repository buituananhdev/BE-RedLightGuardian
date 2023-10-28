import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default User;
