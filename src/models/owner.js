// owner.js

import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';

const Owner = sequelize.define('owner', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  citizen_identification: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: Sequelize.STRING,
});

export default Owner;
