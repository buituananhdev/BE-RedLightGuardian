import { v4 as uuidv4 } from 'uuid';
import { Owner } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const newOwnerData = req.body;
    newOwnerData.id = uuidv4();
    const owner = await Owner.create(newOwnerData);
    res.status(201).json(responseHelper('success', 'Create user successfully', owner))
  } catch (error) {
    res.status(500).json(errorHelper('00001', req, error.message));
  }
};
/**
 * @swagger
 * /owner:
 *    post:
 *      summary: Create a new owner
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the owner.
 *                citizen_identification:
 *                  type: string
 *                  description: The citizen identification of the owner.
 *                address:
 *                  type: string
 *                  description: The address of the owner.
 *                email:
 *                  type: string
 *                  description: The email address of the owner.
 *                password:
 *                  type: string
 *                  description: The password for the owner account.
 *              required:
 *                - name
 *                - citizen_identification
 *                - address
 *                - email
 *                - password
 *      tags:
 *        - Owner
 *      responses:
 *        "201":
 *          description: Owner created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Owner'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
