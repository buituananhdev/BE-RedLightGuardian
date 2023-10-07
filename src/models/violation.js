import Sequelize from 'sequelize';
import sequelize from '../config/database.config.js';
import Vehicle from './vehicle.js';
import Camera from './camera.js'

const Violation = sequelize.define('violation', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  vehicleID: Sequelize.STRING,
  time: Sequelize.BIGINT,
  cameraID: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
});

Violation.belongsTo(Vehicle, { foreignKey: 'vehicleID' });
Violation.belongsTo(Camera, { foreignKey: 'cameraID' });

export default Violation;
