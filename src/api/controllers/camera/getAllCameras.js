import { Camera } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const cameras = await Camera.findAll();
    res.json(responseHelper('success', '', cameras));
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * @swagger
 * /cameras:
 *   get:
 *     summary: Get all cameras
 *     tags: [Camera]
 *     responses:
 *       200:
 *         description: List of cameras.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Camera'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */