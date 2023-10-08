import { Vehicle } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const updatedVehicleData = req.body;
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      res.status(404).json(errorHelper('00002', req, 'Vehicle not found'));
    } else {
      await vehicle.update(updatedVehicleData);
      res.json(vehicle);
    }
  } catch (error) {
    res.status(500).json(errorHelper('00004', req, error.message));
  }
};

/**
 * @swagger
 * /vehicles/{vehicleId}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         description: ID of the vehicle
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
 *         description: Vehicle updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
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