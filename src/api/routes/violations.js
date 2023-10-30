import { Router } from "express";
import { getAllViolations, createViolation, getViolationById, deleteViolationById, updateViolationById } from "../controllers/violation/index.js";
import upload from '../middlewares/upload.middleware.js';

const router = Router();

//POST
router.post('', upload.single('file'), createViolation);

// GET
router.get('', getAllViolations);
router.get('/:id', getViolationById);

// PUT
router.put('/:id', updateViolationById)

// DELETE
router.delete('/:id', deleteViolationById)
export default router;