import { Router } from "express";
import { getAllViolations, createViolation, getViolationById, deleteViolationById, updateViolationById, updateStatusViolation } from "../controllers/violation/index.js";
import upload from '../middlewares/upload.middleware.js';
import { auth } from "../middlewares/index.js";

const router = Router();

//POST
router.post('', upload.single('file'), createViolation);

// GET
router.get('', getAllViolations);
router.get('/:id', getViolationById);

// PUT
router.put('/:id', updateViolationById)
router.patch('/:id', updateStatusViolation)

// DELETE
router.delete('/:id', deleteViolationById)
export default router;