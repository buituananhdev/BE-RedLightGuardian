import { Router } from 'express';

import { login, logout } from '../controllers/auth/index.js'

const router = Router();

router.post('/login', login);
router.post('/revoke_token', logout);
export default router