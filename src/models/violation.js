import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';
import Vehicle from './vehicle.js';

const Violation = sequelize.define('violation', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  vehicleID: Sequelize.STRING,
  time: Sequelize.BIGINT,
  imageUrl: Sequelize.STRING,
});

Violation.belongsTo(Vehicle, { foreignKey: 'vehicleID' });

export default Violation;
