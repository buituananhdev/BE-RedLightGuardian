import { Router } from 'express';

import { createVehicle, getAllVehicles, getVehicleById, updateVehicleById, deleteVehicleById } from '../controllers/vehicle/index.js'

const router = Router();

// POST
router.post('', createVehicle);

// GET
router.get('', getAllVehicles);
router.get('/:id', getVehicleById);

// PUT
router.put('/:id', updateVehicleById)

// DELETE
router.delete('/:id', deleteVehicleById)


export default router