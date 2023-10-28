import { Vehicle } from "../../../models/index.js";
import { responseHelper } from "../../../utils/index.js";
import { getVehicleById } from "../../../services/database/vehicle.service.js";
export default async (req, res) => {
  try {
    const vehicle = await getVehicleById(req.params.id);
    if (!vehicle) {
      res.status(404).json(responseHelper("failure", "Vehicle not found"));
    } else {
      res.json(responseHelper("success", "", vehicle));
    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /vehicles/{vehicleId}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vehicle details
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
