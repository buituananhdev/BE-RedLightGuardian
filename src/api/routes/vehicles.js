import { Router } from 'express';
import { auth } from "../middlewares/index.js";
import { createVehicle, getAllVehicles, getVehicleById, updateVehicleById, deleteVehicleById } from '../controllers/vehicle/index.js'

const router = Router();

// POST
router.post('', auth, createVehicle);

// GET
router.get('', auth, getAllVehicles);
router.get('/:id', auth, getVehicleById);

// PUT
router.put('/:id', auth, updateVehicleById)

// DELETE
router.delete('/:id', auth, deleteVehicleById)


export default router