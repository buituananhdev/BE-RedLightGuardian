import { Router } from "express";
import { getAllViolations, createViolation, getViolationById, deleteViolationById, updateViolationById } from "../controllers/violation/index.js";

const router = Router();

//POST
router.post('', createViolation);

// GET
router.get('', getAllViolations);
router.get('/:id', getViolationById);

// PUT
router.put('/:id', updateViolationById)

// DELETE
router.delete('/:id', deleteViolationById)
export default router;