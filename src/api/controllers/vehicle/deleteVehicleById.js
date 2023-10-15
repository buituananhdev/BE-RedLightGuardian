import { Vehicle } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      res.status(404).json(errorHelper('00002', req, 'Vehicle not found'));
    } else {
      await vehicle.destroy();
      res.json({ message: 'Vehicle deleted successfully' });
    }
  } catch (error) {
    res.status(500).json(errorHelper('00005', req, error.message));
  }
};

/**
 * @swagger
 * /vehicles/{vehicleId}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       404:
 *         description: Vehicle not found
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