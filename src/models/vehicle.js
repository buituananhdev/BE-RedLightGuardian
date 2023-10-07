import Sequelize from "sequelize";
import sequelize from "../config/database.config.js";
import Owner from "./owner.js";
const Vehicle = sequelize.define("vehicle", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  vehicleName: Sequelize.STRING,
  licensePlate: Sequelize.STRING,
  ownerID: Sequelize.STRING,
  vehicleType: Sequelize.ENUM("car", "motorcycle"),
  manufacturer: Sequelize.STRING,
  engineCapacity: Sequelize.FLOAT,
  color: Sequelize.STRING,
  frameNumber: Sequelize.STRING,
  engineNumber: Sequelize.STRING,
  brand: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
});

Vehicle.belongsTo(Owner, { foreignKey: "ownerID" });

export default Vehicle;
