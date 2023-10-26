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
 * /vehicle:
 *    post:
 *      summary: Create a new vehicle
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                vehiclename:
 *                  type: string
 *                  description: The vehiclename of the vehicle.
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the vehicle.
 *                password:
 *                  type: string
 *                  format: password
 *                  description: The password for the vehicle account.
 *              required:
 *                - vehiclename
 *                - email
 *                - password
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