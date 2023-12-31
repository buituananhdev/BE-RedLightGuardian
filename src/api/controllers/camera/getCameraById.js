import { Camera } from '../../../models/index.js';
import { responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const cameraId = parseInt(req.params.id);
    const camera = await Camera.findByPk(cameraId);
    if (!camera) {
      res.status(404).json(responseHelper(2,'Camera not found'));
    } else {
      res.json(camera);
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /cameras/{cameraId}:
 *   get:
 *     summary: Get a camera by ID
 *     tags: [Camera]
 *     parameters:
 *       - in: path
 *         name: cameraId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the camera
 *     responses:
 *       200:
 *         description: Camera details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Camera'
 *       404:
 *         description: Camera not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */