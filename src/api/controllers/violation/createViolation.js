import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Violation } from '../../../models/index.js';
import { errorHelper, responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const newViolationData = req.body;
    newViolationData.id = uuidv4();
    const violation = await Violation.create(newViolationData);
    res.status(201).json(responseHelper('success', '', violation))
  } catch (error) {
    res.status(500).json(errorHelper('00001', req, error.message));
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
 *                violationname:
 *                  type: string
 *                  description: The violationname of the violation.
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the violation.
 *                password:
 *                  type: string
 *                  format: password
 *                  description: The password for the violation account.
 *              required:
 *                - violationname
 *                - email
 *                - password
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