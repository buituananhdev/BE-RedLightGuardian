import { Camera } from '../../../models/index.js';
import { responseHelper, errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const cameraId = parseInt(req.params.id);
    const camera = await Camera.findByPk(cameraId);

    if (!camera) {
      res.status(404).json(errorHelper('00002', req, 'Camera not found'));
    } else {
      await camera.destroy();
      res.json(responseHelper('success', 'Camera deleted successfully'));
    }
  } catch (error) {
    res.status(500).json(errorHelper('00005', req, error.message));
  }
};

/**
 * @swagger
 * /cameras/{cameraId}:
 *   delete:
 *     summary: Delete a camera by ID
 *     tags: [Camera]
 *     parameters:
 *       - in: path
 *         name: cameraId
 *         required: true
 *         description: ID of the camera
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Camera deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
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