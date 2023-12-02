import { Router } from "express";
import { auth } from "../middlewares/index.js";
import { getAllUsers, createUser, getUserById, deleteUserById, updateUserById, changeUserPassword } from "../controllers/user/index.js";

const router = Router();

//POST
router.post('', createUser);

// GET
router.get('', auth, getAllUsers);
router.get('/:id', auth, getUserById);

// PUT
router.put('/:id', auth, updateUserById)

// PATCH
router.patch('/change_password', auth, changeUserPassword)

// DELETE
router.delete('/:id', auth, deleteUserById)
export default router;