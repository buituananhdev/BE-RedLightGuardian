import { Router } from 'express';

import { createCamera, getAllCameras, getCameraById, updateCameraById, deleteCameraById, updateCoordinatesCamera } from '../controllers/camera/index.js'

const router = Router();

// POST
router.post('', createCamera);

// GET
router.get('', getAllCameras);
router.get('/:id', getCameraById);

// PUT
router.put('/:id', updateCameraById);

// PATCH
router.patch('/:id', updateCoordinatesCamera);
// DELETE
router.delete('/:id', deleteCameraById);


export default router