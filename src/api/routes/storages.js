import { Router } from 'express';
import { uploadFile } from '../controllers/storage/index.js';
import upload from '../middlewares/upload.middleware.js';

const router = Router();

// POST
router.post('/upload', upload.single('file'), uploadFile);

export default router