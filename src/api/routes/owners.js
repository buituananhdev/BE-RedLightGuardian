import { Router } from 'express';

import { createOwner, getAllOwners, getOwnerById, updateOwnerById, deleteOwnerById } from '../controllers/owner/index.js'

const router = Router();

// POST
router.post('', createOwner);

// GET
router.get('', getAllOwners);
router.get('/:id', getOwnerById);

// PUT
router.put('/:id', updateOwnerById)

// DELETE
router.delete('/:id', deleteOwnerById)


export default router