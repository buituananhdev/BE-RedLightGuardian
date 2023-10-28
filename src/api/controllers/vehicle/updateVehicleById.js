import Vehicle from "../../../models/vehicle.js";
import { responseHelper } from "../../../utils/index.js";
import { updateVehicleById } from "../../../services/database/vehicle.service.js";
export default async (req, res) => {
  try {
    const flag = await updateVehicleById(req.params.id, req.body);

    if (!flag) {
      res.status(404).json(responseHelper("failure", "Vehicle not found"));
    } else {
      res.json(responseHelper("success", "Vehicle updated successful"));
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
