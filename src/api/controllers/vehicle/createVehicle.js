import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Vehicle } from '../../../models/index.js';
import { errorHelper, responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const newVehicleData = req.body;
    newVehicleData.id = uuidv4();
    const vehicle = await Vehicle.create(newVehicleData);
    res.status(201).json(responseHelper('success', '', vehicle))
  } catch (error) {
    res.status(500).json(errorHelper('00001', req, error.message));
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
