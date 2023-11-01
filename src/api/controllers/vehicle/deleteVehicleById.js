import { Vehicle } from "../../../models/index.js";
import { responseHelper } from "../../../utils/index.js";
import { deleteVehicleById } from "../../../services/database/vehicle.service.js";
export default async (req, res) => {
  try {
    const flag = await deleteVehicleById(req.params.id);
    if (!flag) {
      res.status(404).json(responseHelper(2, "Vehicle not found"));
    } else {
      res.json(responseHelper("1", "Delete vehicle successful!"));
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /vehicles/{vehicleId}:
 *    delete:
 *      summary: Delete vehicle by ID
 *      parameters:
 *        - in: path
 *          name: vehicleId
 *          required: true
 *          description: ID of the vehicle to delete
 *          schema:
 *            type: integer
 *      tags:
 *        - Vehicle
 *      responses:
 *        "200":
 *          description: Vehicle deleted successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: A success message indicating the vehicle has been deleted.
 *        "404":
 *          description: Vehicle not found.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
