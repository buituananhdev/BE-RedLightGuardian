import Sequelize from 'sequelize';
import sequelize from '../config/database.js';
import Owner from './owner.js';
const Vehicle = sequelize.define('vehicle', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  vehicleName: Sequelize.STRING,
  licensePlate: Sequelize.STRING,
  ownerID: Sequelize.STRING,
  vehicleType: Sequelize.ENUM('car', 'moto'),
  manufacturer: Sequelize.STRING,
  engineCapacity: Sequelize.FLOAT,
  color: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
});

Vehicle.belongsTo(Owner, { foreignKey: 'ownerID' });

export default Vehicle;
