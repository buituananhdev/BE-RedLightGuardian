import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Violation } from '../../../models/index.js';
import { responseHelper } from '../../../utils/index.js';
import { createViolation } from '../../../services/database/violation.service.js';
export default async (req, res) => {
  try {
    const violation = await createViolation(req.body);
    res.status(201).json(responseHelper('success', '', violation))
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /violation:
 *    post:
 *      summary: Create a new violation
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                type:
 *                  type: string
 *                  description: The type of the violation.
 *                deadline:
 *                  type: integer
 *                  description: The deadline timestamp of the violation (in milliseconds).
 *                status:
 *                  type: string
 *                  description: The status of the violation ("paid fine", "unpaid fine", "overdue").
 *                vehicleID:
 *                  type: string
 *                  description: The ID of the associated vehicle.
 *                time:
 *                  type: integer
 *                  description: The timestamp of the violation occurrence (in milliseconds).
 *                cameraID:
 *                  type: string
 *                  description: The ID of the camera capturing the violation.
 *                imageUrl:
 *                  type: string
 *                  description: The URL of the violation image.
 *              required:
 *                - type
 *                - deadline
 *                - status
 *                - vehicleID
 *                - time
 *                - cameraID
 *                - imageUrl
 *      tags:
 *        - Violation
 *      responses:
 *        "201":
 *          description: Violation created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Violation'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
