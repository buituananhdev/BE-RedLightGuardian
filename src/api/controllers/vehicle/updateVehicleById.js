import Vehicle from '../../../models/vehicle.js';
import { errorHelper, responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);
    const updatedVehicleData = req.body;
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      res.status(404).json(errorHelper('00002', req, 'Vehicle not found'));
    } else {
      await vehicle.update(updatedVehicleData);
      res.json(responseHelper('success', 'Vehicle updated successful', vehicle))

    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};
/**
 * @swagger
 * /vehicles/{vehicleId}:
 *    put:
 *      summary: Update vehicle information by ID
 *      parameters:
 *        - in: path
 *          name: vehicleId
 *          schema:
 *            type: string
 *          required: true
 *          description: Vehicle ID
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vehicle'
 *      tags:
 *        - Vehicle
 *      responses:
 *        "200":
 *          description: Vehicle information updated successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Vehicle'
 *        "404":
 *          description: Vehicle not found.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */