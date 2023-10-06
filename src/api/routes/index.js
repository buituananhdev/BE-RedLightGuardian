import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/index.js';
import storages from './storages.js';
import vehicles from './vehicles.js';
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use('/storages', storages);
router.use('/vehicles', vehicles);

export default router;