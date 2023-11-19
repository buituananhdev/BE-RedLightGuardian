import { Router } from "express";
import { getAllViolations, createViolation, getViolationById, deleteViolationById, updateViolationById } from "../controllers/violation/index.js";
import upload from '../middlewares/upload.middleware.js';
import { auth } from "../middlewares/index.js";

const router = Router();

//POST
router.post('', upload.single('file'), createViolation);

// GET
router.get('', auth, getAllViolations);
router.get('/:id', auth, getViolationById);

// PUT
router.put('/:id', auth, updateViolationById)

// DELETE
router.delete('/:id', auth, deleteViolationById)
export default router;