import Sequelize from "sequelize";
import sequelize from "../config/database.config.js";
import Vehicle from "./vehicle.js";
import Camera from "./camera.js";

const Violation = sequelize.define("violation", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  type: Sequelize.ENUM("Run a red light"),
  deadline: Sequelize.DATE,
  status: Sequelize.ENUM("paid fine", "unpaid fine", "overdue"),
  vehicleID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cameraID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Violation.belongsTo(Vehicle, { foreignKey: "vehicleID", onDelete: "CASCADE" });
Violation.belongsTo(Camera, { foreignKey: "cameraID", onDelete: "CASCADE" });

export default Violation;
