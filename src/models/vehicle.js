import Sequelize from "sequelize";
import sequelize from "../config/database.config.js";
import Owner from "./owner.js";

const Vehicle = sequelize.define("vehicle", {
  id: {
    type: Sequelize.STRING(30),
    primaryKey: true,
  },
  vehicleName: {
    type: Sequelize.STRING(100),
    allowNull: false,
    charset: 'utf8mb4', // Thêm hỗ trợ UTF-8
    collate: 'utf8mb4_unicode_ci', // Thêm hỗ trợ kiểu ký tự
  },
  licensePlate: {
    type: Sequelize.STRING(100),
    unique: true
  },
  ownerID: {
    type: Sequelize.STRING(30),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  vehicleType: Sequelize.ENUM("car", "motorcycle"),
  engineCapacity: Sequelize.FLOAT,
  color: {
    type: Sequelize.STRING(100),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  frameNumber: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  engineNumber: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING(100),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  imageUrl: {
    type: Sequelize.STRING(500),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
});

Vehicle.belongsTo(Owner, { foreignKey: "ownerID", onDelete: "CASCADE" });

export default Vehicle;
