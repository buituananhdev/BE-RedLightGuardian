import Sequelize from "sequelize";
import sequelize from "../config/database.config.js";
import Vehicle from "./vehicle.js";
import Camera from "./camera.js";

const Violation = sequelize.define("violation", {
  id: {
    type: Sequelize.STRING(30),
    primaryKey: true,
  },
  type: {
    type: Sequelize.ENUM("Run a red light"),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  deadline: Sequelize.DATE,
  status: {
    type: Sequelize.ENUM("paid fine", "unpaid fine", "overdue", "cancel"),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  vehicleID: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  cameraID: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING(50),
    allowNull: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
});

Violation.belongsTo(Vehicle, { foreignKey: "vehicleID", onDelete: "CASCADE" });
Violation.belongsTo(Camera, { foreignKey: "cameraID", onDelete: "CASCADE" });

export default Violation;
