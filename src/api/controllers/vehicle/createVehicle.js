import { responseHelper } from '../../../utils/index.js';
import { createVehicle } from '../../../services/database/vehicle.service.js';
export default async (req, res) => {
  try {
    const vehicle = await createVehicle(req.body);
    if(!vehicle) {
      res.status(400).json(responseHelper(2, 'Listen plate already exists!', vehicle))
    }
    res.status(201).json(responseHelper(1, '', vehicle))
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /vehicles:
 *    post:
 *      summary: Create a new vehicle
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                vehicleName:
 *                  type: string
 *                  description: The name of the vehicle.
 *                licensePlate:
 *                  type: string
 *                  description: The license plate of the vehicle.
 *                engineCapacity:
 *                  type: number
 *                  description: The engine capacity of the vehicle (floating-point value).
 *                color:
 *                  type: string
 *                  description: The color of the vehicle.
 *                frameNumber:
 *                  type: string
 *                  description: The frame number of the vehicle.
 *                engineNumber:
 *                  type: string
 *                  description: The engine number of the vehicle.
 *                brand:
 *                  type: string
 *                  description: The brand of the vehicle.
 *                imageUrl:
 *                  type: string
 *                  description: The URL of the vehicle image.
 *              required:
 *                - vehicleName
 *                - licensePlate
 *                - engineCapacity
 *                - color
 *                - frameNumber
 *                - engineNumber
 *                - brand
 *                - imageUrl
 *      tags:
 *        - Vehicle
 *      responses:
 *        "201":
 *          description: Vehicle created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Vehicle'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
