import { Router } from 'express';

import { login, logout, getMyInfor } from '../controllers/auth/index.js'

const router = Router();

router.post('/login', login);
router.post('/revoke_token', logout);
router.get('/get_my_infor', getMyInfor);
export default router