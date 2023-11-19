import { Router } from 'express';
import { auth } from "../middlewares/index.js";
import { createOwner, getAllOwners, getOwnerById, updateOwnerById, deleteOwnerById } from '../controllers/owner/index.js'

const router = Router();

// POST
router.post('', auth, createOwner);

// GET
router.get('', auth, getAllOwners);
router.get('/:id', auth, getOwnerById);

// PUT
router.put('/:id', auth, updateOwnerById)

// DELETE
router.delete('/:id', auth, deleteOwnerById)


export default router