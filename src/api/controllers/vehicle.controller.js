import express from 'express';
import {
  createVehicle,
  getVehicleById,
  updateVehicleById,
  deleteVehicleById,
} from '../../services/database/vehicle.service.js';

const vehicleRouter = express.Router();

// Route để tạo một người dùng mới
vehicleRouter.post('', async (req, res) => {
  try {
    const newVehicle = req.body; // Lấy dữ liệu người dùng từ yêu cầu
    const vehicle = await createVehicle(newVehicle);
    res.status(201).json(vehicle); // Trả về người dùng đã tạo
  } catch (error) {
    res.status(500).json({ error: 'Could not create vehicle' });
  }
});

// Route để lấy thông tin người dùng bằng ID
vehicleRouter.get('/:vehicleId', async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const vehicle = await getVehicleById(vehicleId);
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
    } else {
      res.json(vehicle);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not get vehicle' });
  }
});

// Route để cập nhật thông tin người dùng bằng ID
vehicleRouter.put('/:vehicleId', async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const updatedVehicleData = req.body;
    const vehicle = await updateVehicleById(vehicleId, updatedVehicleData);
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
    } else {
      res.json(vehicle);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update vehicle' });
  }
});

// Route để xóa người dùng bằng ID
vehicleRouter.delete('/:vehicleId', async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const result = await deleteVehicleById(vehicleId);
    if (result) {
      res.json({ message: 'Vehicle deleted' });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete vehicle' });
  }
});

export default vehicleRouter;
