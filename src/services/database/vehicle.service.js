import Vehicle from '../../models/vehicle.js';

// Hàm tạo mới một vehicle
const createVehicle = async (vehicleData) => {
  try {
    const newVehicle = await Vehicle.create(vehicleData);
    return newVehicle;
  } catch (error) {
    throw error;
  }
};

// Hàm lấy thông tin vehicle bằng ID
const getVehicleById = async (vehicleId) => {
  try {
    const vehicle = await Vehicle.findByPk(vehicleId);
    return vehicle;
  } catch (error) {
    throw error;
  }
};

// Hàm cập nhật thông tin vehicle bằng ID
const updateVehicleById = async (vehicleId, updatedData) => {
  try {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (vehicle) {
      await vehicle.update(updatedData);
      return vehicle;
    } else {
      throw new Error('Vehicle not found');
    }
  } catch (error) {
    throw error;
  }
};

// Hàm xóa vehicle bằng ID
const deleteVehicleById = async (vehicleId) => {
  try {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (vehicle) {
      await vehicle.destroy();
      return 'Vehicle deleted successfully';
    } else {
      throw new Error('Vehicle not found');
    }
  } catch (error) {
    throw error;
  }
};

export { createVehicle, getVehicleById, updateVehicleById, deleteVehicleById };
