import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';

const Camera = sequelize.define('camera', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coordinates: {
    type: Sequelize.STRING
  }
});

export default Camera;
