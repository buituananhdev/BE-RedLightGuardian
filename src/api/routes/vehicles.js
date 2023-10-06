import { Router } from 'express';

import { createVehicleController, getAllVehiclesController, getVehicleByIdController, updateVehicleByIdController, deleteVehicleByIdController } from '../controllers/vehicle/index.js'

const router = Router();

// POST
router.post('', createVehicleController);

// GET
router.get('', getAllVehiclesController);
router.get('/:id', getVehicleByIdController);

// PUT
router.put('/:id', updateVehicleByIdController)

// DELETE
router.delete('/:id', deleteVehicleByIdController)


export default router