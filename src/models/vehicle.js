import Sequelize from "sequelize";
import sequelize from "../config/database.config.js";
import Owner from "./owner.js";

const Vehicle = sequelize.define("vehicle", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  vehicleName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  licensePlate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ownerID: Sequelize.STRING,
  vehicleType: Sequelize.ENUM("car", "motorcycle"),
  engineCapacity: Sequelize.FLOAT,
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  frameNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  engineNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Vehicle.belongsTo(Owner, { foreignKey: "ownerID", onDelete: "CASCADE" });

export default Vehicle;
