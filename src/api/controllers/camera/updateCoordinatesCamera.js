import { responseHelper } from '../../../utils/index.js';
import { updateCoordinatesCamera } from '../../../services/database/camera.service.js';

export default async (req, res) => {
  try {
    const cameraId = req.params.id;
    const { newCoordinates } = req.body;
    const flag = await updateCoordinatesCamera(cameraId, newCoordinates);
    if (flag) {
      res.status(200).json(responseHelper(1, 'Update camera coordinates successful!'));
    } else {
      res.status(404).json(responseHelper(2, 'Camera not found!'))
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /cameras/{cameraId}:
 *   patch:
 *     summary: Update a camera by ID
 *     tags:
 *       - Camera
 *     parameters:
 *       - in: path
 *         name: cameraId
 *         required: true
 *         description: ID of the camera
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Camera updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
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
