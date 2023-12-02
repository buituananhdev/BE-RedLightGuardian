import { Router } from 'express';
import { auth } from "../middlewares/index.js";
import { createCamera, getAllCameras, getCameraById, updateCameraById, deleteCameraById, updateCoordinatesCamera } from '../controllers/camera/index.js'

const router = Router();

// POST
router.post('', auth, createCamera);

// GET
router.get('', auth, getAllCameras);
router.get('/:id', getCameraById);

// PUT
router.put('/:id', auth, updateCameraById);

// PATCH
router.patch('/:id', auth, updateCoordinatesCamera);
// DELETE
router.delete('/:id', auth, deleteCameraById);


export default router