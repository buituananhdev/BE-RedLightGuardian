import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/index.js';
import storages from './storages.js';
import vehicles from './vehicles.js';
import users from './users.js';
import cameras from './cameras.js';
import owners from './owners.js';
import auth from './auth.js';
import violations from './violations.js'
const router = Router();
swaggerConfig.components = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};
const specDoc = swaggerJsdoc(swaggerConfig);
router.use(specs, serve);
router.get(specs, setup(specDoc));

router.use('/auth', auth);
router.use('/storages', storages);
router.use('/vehicles', vehicles);
router.use('/users', users);
router.use('/cameras', cameras);
router.use('/owners', owners);
router.use('/violations', violations);

export default router;