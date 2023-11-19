import { Owner, Vehicle } from "../../models/index.js";
import { pagingHelper } from "../../utils/index.js";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { getOwnerByCitizenIdentification } from "./owner.service.js";
const getAllVehicle = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;
  let whereClause = {};

  let searchConditions = [];
  if (req.query.key_word) {
    searchConditions.push({
      [Op.or]: [
        { vehicleName: { [Op.like]: `%${req.query.key_word}%` } },
        { color: { [Op.like]: `%${req.query.key_word}%` } },
        { brand: { [Op.like]: `%${req.query.key_word}%` } },
      ],
    });
  }

  if (req.query.licensePlate) {
    whereClause.licensePlate = req.query.licensePlate;
  }
  if (req.query.ownerID) {
    whereClause.ownerID = req.query.ownerID;
  }

  if (searchConditions.length > 0) {
    whereClause[Op.or] = searchConditions;
  }

  const vehicles = await Vehicle.findAll({
    where: whereClause,
    limit: pageSize,
    offset: offset,
  });
  const totalVehicles = await Vehicle.count({ where: whereClause });
  const mappedVehicles = await Promise.all(
    vehicles.map(async (vehicle) => {
      const owner = await Owner.findByPk(vehicle.ownerID);
      return {
        id: vehicle.id,
        vehicleName: vehicle.vehicleName,
        licensePlate: vehicle.licensePlate,
        vehicleType: vehicle.vehicleType,
        color: vehicle.color,
        brand: vehicle.brand,
        imageUrl: vehicle.imageUrl,
        owner: owner,
      };
    })
  );

  const meta = pagingHelper(page, pageSize, totalVehicles);
  return { vehicles: mappedVehicles, meta: meta };
};

const createVehicle = async (vehicleData) => {
  if(await isListenPlateExists(vehicleData.licensePlate)) {
    return null;
  }
  const owner = await getOwnerByCitizenIdentification(vehicleData.citizenIdentification)
  const vehicle = {
    id: uuidv4(),
    vehicleName: vehicleData.vehicleName,
    licensePlate: vehicleData.licensePlate,
    ownerID: owner.id,
    vehicleType: vehicleData.vehicleType,
    engineCapacity: vehicleData.engineCapacity,
    color: vehicleData.color,
    frameNumber: vehicleData.frameNumber,
    engineNumber: vehicleData.engineNumber,
    brand: vehicleData.brand,
    imageUrl: vehicleData.imageUrl
  }
  const newVehicle = await Vehicle.create(vehicle);
  return newVehicle;
};

const getVehicleById = async (vehicleId) => {
  const vehicle = await Vehicle.findByPk(vehicleId);
  return vehicle;
};

const getVehicleIdBylicensePlate = async (licensePlate) => {
  const vehicle = await Vehicle.findOne({ where: { licensePlate: licensePlate } });
  if(!vehicle) {
    return null;
  }
  return vehicle.id;
};

const updateVehicleById = async (vehicleId, updatedData) => {
  const vehicle = await Vehicle.findByPk(vehicleId);
  if (vehicle) {
    await vehicle.update(updatedData);
    return true;
  }
  return false;
};

const deleteVehicleById = async (vehicleId) => {
  const vehicle = await Vehicle.findByPk(vehicleId);
  if (vehicle) {
    await vehicle.destroy();
    return true;
  }
  return false;
};

const isListenPlateExists = async (licensePlate) => {
  const exists = await Vehicle.findOne({
    where: {
      licensePlate: licensePlate
    },
  });
  return exists !== null;
}

export {
  getAllVehicle,
  createVehicle,
  getVehicleById,
  getVehicleIdBylicensePlate,
  updateVehicleById,
  deleteVehicleById,
};
